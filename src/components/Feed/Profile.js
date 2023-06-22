"use client";

import { captilize } from "@utils/captilize";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiHighlight, BiTrash } from "react-icons/bi";

const Profile = ({ posts, handlerDelete, handlerEdit }) => {
  const { data: session } = useSession();

  return (
    <div className="min-w-0 relative  max-w-md px-3 py-3 min-h-0 border-2 shadow-lg border-sky-300/60 rounded-md m-2 bg-red-200/75 opacity-80">
      <div className="flex text-center justify-center">
        <div>
          <Image
            src={posts?.creator?.image}
            alt="user"
            width={40}
            height={40}
            className="rounded-full border-2 border-red-300 opacity-100"
          />
        </div>
        <div>
          <h2 className="font-mono font-bold mr-4">
            {captilize(posts?.creator?.username)}
          </h2>
          <span className="ml-2">{posts?.creator?.email}</span>
        </div>
        {session?.user.id === posts.creator._id && (
          <div className="items-end">
            <div className="flex absolute top-2 right-1 ">
              <BiHighlight
                onClick={() => handlerEdit(posts?._id)}
                className="text-green-600 font-bold cursor-pointer text-xl"
              />
              <BiTrash
                onClick={() => handlerDelete(posts?._id)}
                className="text-red-600 ml-2 font-bold cursor-pointer text-xl"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center">
        <hr className="w-2/3 mt-2 bg-gray-800 border-1" />
      </div>
      <div className="mt-2 ">
        <p className="text-gray-600">{posts?.post}</p>
        <p className="text-start text-blue-500">{posts?.tag}</p>
      </div>
    </div>
  );
};

export default Profile;
