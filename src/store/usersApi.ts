import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPositionsRespond, IUsersRespond } from 'types/types';

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['users', 'positions'],
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
  }),
});

export const { useGetPositionsQuery, useGetUsersQuery } = usersApi;
