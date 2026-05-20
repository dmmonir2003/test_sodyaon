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
    }),
    loginProfile: builder.mutation<{ user: Profile; token: string }, any>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      // Simple mock transformer to return a dummy user and token given any standard login
      transformResponse: (response: any, meta, arg) => {
        return {
          user: {
            id: 'mock-user-123',
            name: 'মক ইউজার',
            email: arg.email || 'mock@example.com',
            phone: arg.phone || '01XXXXXXXXX',
            role: 'customer'
          },
          token: 'mock-jwt-token-abcd-1234'
        };
      }
    }),
    registerProfile: builder.mutation<{ user: Profile; token: string }, any>({
       query: (userData) => ({
         url: '/auth/register',
         method: 'POST',
         body: userData,
       }),
       transformResponse: (response: any, meta, arg) => {
         return {
           user: {
             id: 'mock-user-123',
             name: arg.name || 'নতুন ইউজার',
             email: arg.email || 'mock@example.com',
             phone: arg.phone || '01XXXXXXXXX',
             role: 'customer'
           },
           token: 'mock-jwt-token-abcd-1234'
         };
       }
    }),
    forgotPassword: builder.mutation<{ success: boolean; message: string }, { identifier: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: () => ({ success: true, message: 'OTP পাঠানো হয়েছে (ডামি: ১২৩৪৫৬)' })
    }),
    verifyOtp: builder.mutation<{ success: boolean; token: string }, { identifier: string; otp: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any, meta, arg) => {
        if (arg.otp !== '123456') throw new Error('Invalid OTP');
        return { success: true, token: 'temp-reset-token-789' };
      }
    }),
    resetPassword: builder.mutation<{ success: boolean; message: string }, { token: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: () => ({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' })
    }),
    changePassword: builder.mutation<{ success: boolean; message: string }, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: () => ({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' })
    })
  })
});

export const { 
  useGetUserProfileQuery, 
  useUpdateUserProfileMutation,
  useLoginProfileMutation,
  useRegisterProfileMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation
} = profileApi;
