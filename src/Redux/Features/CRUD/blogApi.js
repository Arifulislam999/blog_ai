import { apiSlice } from "../API/apiSlice";

export const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: () => "/api/post",
      providesTags: [
        "add-post",
        "update-data",
        "get-post",
        "update-single-user",
      ],
    }),
    blogPost: builder.mutation({
      query: (data) => ({
        url: "/api/post/new",
        method: "POST",
        body: data,
        headers: { "Content-type": "application/json" },
      }),
      invalidatesTags: ["add-post"],
    }),
    getUser: builder.query({
      query: (id) => `/api/user/${id}`,
      invalidatesTags: ["get-post"],
      providesTags: ["delete-post", "update-data"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/update/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-post"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update-data"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/api/update/${id}`,
      }),
      invalidatesTags: ["update-single-user"],
    }),
  }),
});
export const {
  useGetPostQuery,
  useBlogPostMutation,
  useGetUserQuery,
  useDeletePostMutation,
  useUpdateBlogMutation,
  useGetSingleUserQuery,
} = blogApi;
