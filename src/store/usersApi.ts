import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPositionsRespond, ITokenRespond, IUsersRespond } from 'types/types';
import { RootState } from 'store';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const data = (getState() as RootState).usersApi.queries.getToken
        ?.data as ITokenRespond;

      if (data.token) {
        headers.set('Authorization', `Bearer ${data.token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['users', 'positions', 'token'],
  endpoints: builder => ({
    getPositions: builder.query<IPositionsRespond, void>({
      query: () => ({
        url: `positions`,
        method: 'GET',
      }),
      providesTags: ['positions'],
    }),
    getUsers: builder.query<IUsersRespond, { page: number; count: number }>({
      query: ({ page = 1, count = 6 }) => ({
        url: `users?page=${page}&count=${count}`,
        method: 'GET',
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        if (currentCache.users && newItems.users) {
          currentCache.users.push(...newItems.users);
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      // providesTags: ['users'],
    }),
    getToken: builder.query<ITokenRespond, void>({
      query: () => ({
        url: `token`,
        method: 'GET',
      }),
      providesTags: ['token'],
    }),
  }),
});

export const { useGetPositionsQuery, useGetUsersQuery, useGetTokenQuery } =
  usersApi;
