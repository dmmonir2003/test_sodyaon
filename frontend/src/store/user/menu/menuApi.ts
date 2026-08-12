import { baseApi } from '../../baseApi';

export interface MenuItem {
  _id: string;
  titleEn: string;
  titleBn: string;
  url: string;
  type: 'navbar' | 'footer';
  group?: string;
  sortOrder: number;
  isActive: boolean;
}

export const menuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMenuItems: builder.query<{ success: boolean; count: number; data: MenuItem[] }, void>({
      query: () => '/menus',
    }),
  }),
});

export const { useGetMenuItemsQuery } = menuApi;
