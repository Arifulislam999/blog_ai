"use client";
import {
  useGetSingleUserQuery,
  useUpdateBlogMutation,
} from "@Redux/Features/CRUD/blogApi";
import UpdateForm from "@components/Feed/UpdateForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UpdatePost = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [updateBlog] = useUpdateBlogMutation();
  const {
    data: reduxPost,
    isSuccess,
    isLoading,
  } = useGetSingleUserQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const router = useRouter();

  const [post, setPost] = useState({
    post: "",
    tag: "",
  });
  const updatePost = async (e) => {
    e.preventDefault();

    try {
      updateBlog({ id, data: { post: post.post, tag: post.tag } });
    } catch (error) {
      console.log("Submit Error ", error?.message);
    } finally {
      router.push("/");
    }
  };
  useEffect(() => {
    setPost(reduxPost);
  }, [isSuccess]);
  return (
    <div>
      <UpdateForm
        type="Update"
        post={post}
        setPost={setPost}
        updateing={isLoading}
        handleSubmit={updatePost}
      />
    </div>
  );
};

export default UpdatePost;
