import { baseApi } from '../baseApi';
import { Profile } from '../user/profile/profileTypes';

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamMembers: builder.query<any, void>({
      query: () => '/user/team',
      providesTags: ['User'],
      transformResponse: (response: any) => response.data || [],
    }),
    createTeamMember: builder.mutation<any, any>({
      query: (body) => ({
        url: '/user/team',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    updateTeamMember: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    deleteTeamMember: builder.mutation<any, string>({
      query: (id) => ({
        url: `/user/team/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useCreateTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;
