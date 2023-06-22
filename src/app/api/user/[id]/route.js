import Post from "@models/post";
import { connectedDB } from "@utils/db";

export const GET = async (request, { params }) => {
  try {
    await connectedDB();
    const posts = await Post.find({ creator: params?.id }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch a person posts.", { status: 500 });
  }
};
