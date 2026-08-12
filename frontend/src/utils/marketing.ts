/**
 * Safely dispatches standard conversion events from the client browser pixel.
 * Automatically aligns with server-to-server tracking via shared eventIds.
 */

interface TrackProduct {
  id: string;
  name: string;
  price: number;
  category?: string;
}

/**
 * Tracks an AddToCart event on the browser pixels
 */
export const trackClientAddToCart = (product: TrackProduct, quantity: number, eventId: string) => {
  try {
    const value = Number(product.price) * Number(quantity);

    // Meta Browser Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'AddToCart', {
        content_name: product.name,
        content_ids: [product.id],
        content_type: 'product',
        value: value,
        currency: 'BDT',
      }, { eventID: eventId });
      console.log(`[Meta Browser Pixel]: AddToCart tracked (Event ID: ${eventId})`);
    }

    // TikTok Browser Pixel
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('AddToCart', {
        contents: [
          {
            content_id: product.id,
            content_name: product.name,
            content_type: 'product',
            quantity: quantity,
            price: product.price,
          }
        ],
        value: value,
        currency: 'BDT',
      }, { event_id: eventId });
      console.log(`[TikTok Browser Pixel]: AddToCart tracked (Event ID: ${eventId})`);
    }
  } catch (error) {
    console.error('[Browser AddToCart Tracking Error]:', error);
  }
};

/**
 * Tracks an InitiateCheckout event on the browser pixels
 */
export const trackClientInitiateCheckout = (items: Array<{ id: string; name: string; price: number; quantity: number }>, total: number, eventId: string) => {
  try {
    const contents = items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      item_price: item.price,
    }));

    // Meta Browser Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout', {
        content_ids: items.map(i => i.id),
        content_type: 'product',
        value: total,
        currency: 'BDT',
        contents: contents,
      }, { eventID: eventId });
      console.log(`[Meta Browser Pixel]: InitiateCheckout tracked (Event ID: ${eventId})`);
    }

    // TikTok Browser Pixel
    if (typeof window !== 'undefined' && (window as any).ttq) {
      (window as any).ttq.track('InitiateCheckout', {
        contents: items.map(item => ({
          content_id: item.id,
          content_name: item.name,
          content_type: 'product',
          quantity: item.quantity,
          price: item.price,
        })),
        value: total,
        currency: 'BDT',
      }, { event_id: eventId });
      console.log(`[TikTok Browser Pixel]: InitiateCheckout tracked (Event ID: ${eventId})`);
    }
  } catch (error) {
    console.error('[Browser InitiateCheckout Tracking Error]:', error);
  }
};
