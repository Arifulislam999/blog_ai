import User from "@models/user";
import { connectedDB } from "@utils/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectedDB();
        //check if a user already exists
        const userExists = await User.findOne({ email: profile.email });

        //check if a user not exists.
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", " ").toLowerCase(),
            image:
              profile.picture ||
              "https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=600",
          });
        }
        return true;
      } catch (error) {
        console.log("Error :", error.message);
        return false;
      }
    },
  },
});
export { handler as GET, handler as POST };
