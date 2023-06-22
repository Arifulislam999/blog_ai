import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.MONGODB_URI,
  }),
  tagTypes: [
    "add-post",
    "delete-post",
    "update-data",
    "get-post",
    "update-single-user",
  ],
  endpoints: (builder) => ({}),
});
