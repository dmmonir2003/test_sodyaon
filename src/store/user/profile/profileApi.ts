import { baseApi } from '../../baseApi';
import { Profile } from './profileTypes';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<Profile, string>({
      query: (userId) => ({ url: `/user/${userId}` }),
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation<Profile, Partial<Profile> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['User']
    })
  })
});

export const { useGetUserProfileQuery, useUpdateUserProfileMutation } = profileApi;
