import Post from "@models/post";
import { connectedDB } from "@utils/db";

export const GET = async (request, { params }) => {
  console.log(params);
  try {
    await connectedDB();
    const post = await Post.findById(params.id).populate("creator");

    if (!params) return new Response("Post not found.", { status: 404 });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Fetch not to post data", { status: 500 });
  }
};
