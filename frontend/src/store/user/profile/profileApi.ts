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
      transformResponse: (response: any) => {
        return {
          user: response.data.user,
          token: response.data.token,
        };
      }
    }),
    registerProfile: builder.mutation<{ user: Profile; token: string }, any>({
       query: (userData) => ({
         url: '/auth/register',
         method: 'POST',
         body: userData,
       }),
       transformResponse: (response: any) => {
         return {
           user: response.data.user,
           token: response.data.token,
         };
       }
    }),
    phoneLogin: builder.mutation<{ success: boolean; message: string }, { phone: string }>({
      query: (data) => ({
        url: '/auth/phone-login',
        method: 'POST',
        body: data,
      })
    }),
    phoneVerify: builder.mutation<{ user: Profile; token: string }, { phone: string; otp?: string; idToken?: string }>({
      query: (data) => ({
        url: '/auth/phone-verify',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => {
        return {
          user: response.data.user,
          token: response.data.token,
        };
      }
    }),
    socialLogin: builder.mutation<{ user: Profile; token: string }, { provider: string; token: string; email?: string; name?: string }>({
      query: (data) => ({
        url: '/auth/social-login',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => {
        return {
          user: response.data.user,
          token: response.data.token,
        };
      }
    }),
    forgotPassword: builder.mutation<{ success: boolean; message: string }, { identifier: string }>({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      })
    }),
    verifyOtp: builder.mutation<{ success: boolean; token: string }, { identifier: string; otp: string }>({
      query: (data) => ({
        url: '/auth/verify-otp',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: any) => {
        return {
          success: response.success,
          token: response.data.token,
        };
      }
    }),
    resetPassword: builder.mutation<{ success: boolean; message: string }, { token: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      })
    }),
    changePassword: builder.mutation<{ success: boolean; message: string }, { currentPassword: string; newPassword: string }>({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: () => ({ success: true, message: 'পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে।' })
    }),
    emailRegisterInit: builder.mutation<{ success: boolean; message: string }, { email: string }>({
      query: (data) => ({
        url: '/auth/email-register-init',
        method: 'POST',
        body: data,
      })
    }),
    emailRegisterVerify: builder.mutation<{ success: boolean; message: string }, { email: string; otp: string }>({
      query: (data) => ({
        url: '/auth/email-register-verify',
        method: 'POST',
        body: data,
      })
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
  useChangePasswordMutation,
  usePhoneLoginMutation,
  usePhoneVerifyMutation,
  useSocialLoginMutation,
  useEmailRegisterInitMutation,
  useEmailRegisterVerifyMutation,
} = profileApi;
