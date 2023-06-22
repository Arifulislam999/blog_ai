import Post from "@models/post";
import { connectedDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectedDB();
    const post = await Post.findById(params.id).populate("creator");

    if (!params) return new Response("Post not found.", { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Fetch not to post data", { status: 500 });
  }
};
export const PATCH = async (request, { params }) => {
  const { post, tag } = await request.json();
  try {
    await connectedDB();
    const existingPost = await Post.findById(params.id);
    if (!existingPost)
      return new Response(JSON.stringify(post), { status: 200 });

    existingPost.post = post;
    existingPost.tag = tag;
    await existingPost.save();
    return new Response("Successfully updated the Prompts", { status: 200 });
  } catch (error) {
    return new Response("Update not to post data", { status: 500 });
  }
};
export const DELETE = async (request, { params }) => {
  try {
    await connectedDB();
    await Post.findByIdAndRemove(params?.id);
    return new Response("Post Delete Successfully", { status: 200 });
  } catch (error) {
    return new Response("Not Delete Post", { status: 500 });
  }
};
