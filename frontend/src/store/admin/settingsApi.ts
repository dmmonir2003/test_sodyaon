import { baseApi } from '../baseApi';

export interface PublicMarketingSettings {
  gtmContainerId: string;
  ga4MeasurementId: string;
  metaPixelId: string;
  tiktokPixelId: string;
}

export interface PrivateMarketingSettings extends PublicMarketingSettings {
  metaAccessToken?: string;
  metaTestEventCode?: string;
  tiktokAccessToken?: string;
  tiktokTestEventCode?: string;
}

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPublicMarketingSettings: builder.query<{ success: boolean; data: PublicMarketingSettings }, void>({
      query: () => ({
        url: '/settings/marketing/public',
        method: 'GET',
      }),
      providesTags: ['Deals'], // Re-use tag to support caching
    }),
    getPrivateMarketingSettings: builder.query<{ success: boolean; data: PrivateMarketingSettings }, void>({
      query: () => ({
        url: '/settings/marketing/private',
        method: 'GET',
      }),
      providesTags: ['Deals'],
    }),
    updateMarketingSettings: builder.mutation<{ success: boolean; message: string; data: PrivateMarketingSettings }, Partial<PrivateMarketingSettings>>({
      query: (settings) => ({
        url: '/settings/marketing',
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: ['Deals'],
    }),
  }),
});

export const {
  useGetPublicMarketingSettingsQuery,
  useGetPrivateMarketingSettingsQuery,
  useUpdateMarketingSettingsMutation,
} = settingsApi;
