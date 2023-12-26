import { connect } from "@/utils/config/dbConfig";
import User from "@/utils/models/userModel";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connect();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }

          // compare password

          const matchPassword = await bcryptjs.compare(password, user.password);

          if (!matchPassword) {
            return null;
          }

          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (!account.providers === "google") {
        return null;
      }

      try {
        await connect();
        const isExist = await User.findOne({ email: profile.email });
        if (isExist) {
          return isExist;
        }

        const newUser = new User({
          username: profile.name,
          email: profile.email,
          image: profile.picture,
        });

        const res = await newUser.save();

        if (res.status === 200 || res.status === 201) {
          return profile;
        }
      } catch (error) {
        console.log(error);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        await connect();
        const tokenUser = await User.findOne({ email:user.email });
        token.email = tokenUser.email;
        token.name = tokenUser.username;
        token.isAdmin = tokenUser.isAdmin;
        // token.email = user.email;
        // token.name = user.username;
        // token.isAdmin = user.isAdmin;
      }
      return token;
    },

    async session({ session }) {
      await connect();
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.email = sessionUser.email;
      session.user.name = sessionUser.username;
      session.user.isAdmin = sessionUser.isAdmin;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/singin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
