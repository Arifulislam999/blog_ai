"use client";
import ProfileCart from "@components/Feed/Profile";
import "../../styles/hreoSection.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  useDeletePostMutation,
  useGetUserQuery,
} from "@Redux/Features/CRUD/blogApi";

const Profile = () => {
  const [posts, setPost] = useState([]);
  const { data: session } = useSession();
  const { data: reduxPosts } = useGetUserQuery(session?.user.id, {
    refetchOnMountOrArgChange: true,
  });
  const [deletePost] = useDeletePostMutation();
  const router = useRouter();
  useEffect(() => {
    setPost(reduxPosts);
  }, [reduxPosts]);
  const handlerDelete = async (id) => {
    const hashConfirmed = confirm("Are you sure you want to delete this post?");
    if (hashConfirmed) {
      try {
        deletePost(id);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handlerEdit = (id) => {
    if (!id) {
      return alert("Post Id is not Found.");
    }
    router.replace(`/update-post?id=${id}`);
  };
  return (
    <div>
      <div>
        <h1 className="text-sky-500 text-4xl my-3 font-bold">My Profile</h1>
        <p className="text-gray-500 font-medium">
          Welcome to your personal profile page.
        </p>
      </div>
      <div className="mt-5 flex justify-center flex-wrap">
        {posts?.map((post, index) => (
          <ProfileCart
            posts={post}
            key={index}
            handlerDelete={handlerDelete}
            handlerEdit={handlerEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
