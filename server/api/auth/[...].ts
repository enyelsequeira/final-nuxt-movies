import GoogleProvider from "next-auth/providers/google";
// file: ~/server/api/auth/[...].ts
import GithubProvider from "next-auth/providers/github";

import { NuxtAuthHandler } from "#auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: "your-secret-here",

  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: useRuntimeConfig().GITHUB_CLIENT_ID,
      clientSecret: useRuntimeConfig().GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: useRuntimeConfig().GOOGLE_CLIENT_ID,
      clientSecret: useRuntimeConfig().GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // @ts-expect-error
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },
  },
});
