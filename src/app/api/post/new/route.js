import Post from "@models/post";
import { connectedDB } from "@utils/db";

export const POST = async (req) => {
  const { userId, post, tag } = await req.json();

  try {
    await connectedDB();
    const newPost = new Post({
      creator: userId,
      post,
      tag,
    });
    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new post", { status: 500 });
  }
};
