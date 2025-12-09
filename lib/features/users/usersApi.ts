import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserOTP, NewUser } from '@/types/userData';

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
    endpoints: (build) => ({
        addUser: build.mutation<void, NewUser>({
            query: (newUser) => ({
                url: '/signup',
                method: "POST",
                headers: {"content-type": "application/json"},
                body: newUser
            }),
        }),
        verifyUser: build.mutation<void, UserOTP>({
            query: (userOTP) => ({
                url: '/verify-email',
                method: "POST",
                headers: {"content-type": "application/json"},
                body: userOTP
            }),
        }),
    }),
});


export const { useAddUserMutation, useVerifyUserMutation } = usersApi;