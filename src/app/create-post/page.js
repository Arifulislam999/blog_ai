"use client";
import { useBlogPostMutation } from "@Redux/Features/CRUD/blogApi";
import Form from "@components/Feed/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreatePost = () => {
  const [blogPost] = useBlogPostMutation();
  const { data: session } = useSession();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    post: "",
    tag: "",
  });
  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      blogPost({
        post: post.post,
        userId: session?.user.id,
        tag: post.tag,
      });
    } catch (error) {
      console.log("Submit Error ", error?.message);
    } finally {
      router.push("/");
      setSubmitting(false);
    }
  };
  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPost}
      />
    </div>
  );
};

export default CreatePost;
