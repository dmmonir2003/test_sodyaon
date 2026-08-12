import crypto from 'crypto';
import { MarketingSettings } from '../modules/marketingSettings/marketingSettings.model';

// Helper to secure SHA-256 hashing for Advanced Matching compliance
export const hashSHA256 = (val: string): string => {
  if (!val) return '';
  return crypto.createHash('sha256').update(val.trim().toLowerCase()).digest('hex');
};

// Safe formatting for phone numbers to match international standards (E.164 without prefix)
export const formatAndHashPhone = (phone?: string): string => {
  if (!phone) return '';
  // Clean phone number: remove any non-digit character
  const cleaned = phone.replace(/\D/g, '');
  // Facebook expects standard format, usually with country code (e.g. 8801679...)
  const normalized = cleaned.startsWith('88') ? cleaned : `880${cleaned.replace(/^0/, '')}`;
  return hashSHA256(normalized);
};

interface CAPIEventParams {
  eventName: 'Purchase' | 'AddToCart' | 'InitiateCheckout' | 'ViewContent';
  eventId: string;
  sourceUrl?: string;
  clientIp?: string;
  clientUserAgent?: string;
  userEmail?: string;
  userPhone?: string;
  value?: number;
  currency?: string;
  contents?: Array<{ id: string; quantity: number; price?: number }>;
}

/**
 * Dispatches server conversion events to Meta CAPI & TikTok Events API securely.
 */
export const trackServerEvent = async (params: CAPIEventParams) => {
  try {
    const settings = await MarketingSettings.findOne({ key: 'marketing' });
    if (!settings) {
      console.warn('[CAPI Warning] Marketing settings not initialized in database.');
      return;
    }

    const {
      metaPixelId,
      metaAccessToken,
      metaTestEventCode,
      tiktokPixelId,
      tiktokAccessToken,
      tiktokTestEventCode,
    } = settings;

    const eventTime = Math.floor(Date.now() / 1000);
    const currency = params.currency || 'BDT';
    const value = params.value || 0;

    // Standardize content structure
    const fbContents = params.contents?.map(item => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    })) || [];

    const ttContents = params.contents?.map(item => ({
      content_id: item.id,
      content_type: 'product',
      quantity: item.quantity,
      price: item.price,
    })) || [];

    // Hashed parameters for matching
    const hashedEmail = params.userEmail ? hashSHA256(params.userEmail) : '';
    const hashedPhone = params.userPhone ? formatAndHashPhone(params.userPhone) : '';

    // ==========================================
    // 1. Meta (Facebook) Conversion API (CAPI)
    // ==========================================
    if (metaPixelId && metaAccessToken) {
      const fbEventPayload = {
        data: [
          {
            event_name: params.eventName,
            event_time: eventTime,
            event_id: params.eventId,
            event_source_url: params.sourceUrl || 'https://sodayon.com/',
            action_source: 'website',
            user_data: {
              ...(hashedEmail && { em: [hashedEmail] }),
              ...(hashedPhone && { ph: [hashedPhone] }),
              ...(params.clientIp && { client_ip_address: params.clientIp }),
              ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
            },
            custom_data: {
              value: value,
              currency: currency,
              content_type: 'product',
              contents: fbContents,
            },
            ...(metaTestEventCode && { test_event_code: metaTestEventCode }),
          },
        ],
      };

      console.log(`[Meta CAPI Payload - ${params.eventName}]:`, JSON.stringify(fbEventPayload, null, 2));

      // Trigger asynchronous request without blocking server execution
      fetch(`https://graph.facebook.com/v19.0/${metaPixelId}/events?access_token=${metaAccessToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fbEventPayload),
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) {
            console.error('[Meta CAPI Error Response]:', data);
          } else {
            console.log(`[Meta CAPI Success]: Event ${params.eventName} (ID: ${params.eventId}) sent successfully.`);
          }
        })
        .catch(err => {
          console.error('[Meta CAPI Request Exception]:', err);
        });
    }

    // ==========================================
    // 2. TikTok Events API
    // ==========================================
    if (tiktokPixelId && tiktokAccessToken) {
      // Map TikTok specific Event Names
      let ttEventName: string = params.eventName;
      if (params.eventName === 'Purchase') ttEventName = 'CompletePayment';
      if (params.eventName === 'InitiateCheckout') ttEventName = 'InitiateCheckout';
      if (params.eventName === 'AddToCart') ttEventName = 'AddToCart';
      if (params.eventName === 'ViewContent') ttEventName = 'ViewContent';

      const ttEventPayload = {
        event_source: 'web',
        event_source_id: tiktokPixelId,
        data: [
          {
            event: ttEventName,
            event_time: eventTime,
            event_id: params.eventId,
            user: {
              ...(hashedEmail && { email: hashedEmail }),
              ...(hashedPhone && { phone: hashedPhone }),
              ...(params.clientIp && { ip: params.clientIp }),
              ...(params.clientUserAgent && { user_agent: params.clientUserAgent }),
            },
            properties: {
              value: value,
              currency: currency,
              contents: ttContents,
            },
            ...(tiktokTestEventCode && { test_event_code: tiktokTestEventCode }),
          },
        ],
      };

      console.log(`[TikTok Events API Payload - ${ttEventName}]:`, JSON.stringify(ttEventPayload, null, 2));

      fetch(`https://business-api.tiktok.com/open_api/v1.3/event/track/`, {
        method: 'POST',
        headers: {
          'Access-Token': tiktokAccessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ttEventPayload),
      })
        .then(async res => {
          const data: any = await res.json();
          if (!res.ok || data.code !== 0) {
            console.error('[TikTok Events API Error Response]:', data);
          } else {
            console.log(`[TikTok Events API Success]: Event ${ttEventName} (ID: ${params.eventId}) sent successfully.`);
          }
        })
        .catch(err => {
          console.error('[TikTok Events API Request Exception]:', err);
        });
    }

  } catch (error) {
    console.error('[Server Event Tracking Error Exception]:', error);
  }
};
