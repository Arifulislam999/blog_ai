import Loader from "@components/Loader/Loader";
import Link from "next/link";
import React from "react";

const UpdateForm = ({ type, post, setPost, updateing, handleSubmit }) => {
  return (
    <div>
      <section>
        <h1>
          <span className="text-2xl sm:text-3xl font-bold  h-ai my-4">
            {type} Post
          </span>
        </h1>
        <p className="text-xl font-semibold text-gray-600 my-5 text-justify px-4">
          {type} and share amazing document with the world,and let your
          imagination run wild with any AI-power platform.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-10 w-full max-w-2xl flex flex-col gap-4"
        >
          <label>
            <span className="font-semibold  text-base text-gray-700">
              Your AI Post
            </span>
          </label>
          <textarea
            value={post?.post}
            onChange={(e) => setPost({ ...post, post: e.target.value })}
            className="font-mono bg-sky-100 text-gray-600 px-3 py-2 rounded-sm"
            placeholder="Write Your Post here..."
            required
          />

          {/* second layer. */}
          <label>
            <span className="font-semibold  text-base text-gray-700">
              Tag{" "}
              <span className="text-gray-500">
                (#product, #webdevelopment, #idea)
              </span>
            </span>
          </label>
          <input
            value={post?.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            className="font-mono bg-sky-100 text-gray-600 px-3 py-2 rounded-sm"
            placeholder="#tag"
            required
          />
          <div className="flex justify-end">
            <Link href="/">
              <span className="text-gray-500 mt-1  mr-2 cursor-pointer hover:text-gray-700">
                Cancel
              </span>
            </Link>
            <button
              className=" border-2 border-sky-200 bg-gray-400 text-white rounded-full px-3 py-0.5 outline-none hover:bg-gray-500 transition-all delay-150 hover:border-sky-300"
              type="submit"
              disabled={updateing}
            >
              {updateing ? (
                <div className="flex">
                  Updateing... <Loader />
                </div>
              ) : (
                `${type}`
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdateForm;
