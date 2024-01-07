import { NextAuthOptions, getServerSession, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";



export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        MetaAddress: { label: "MetaAddress", placeholder: "0x" },
        Password: { label: "password", type: "password" },
      },
      async authorize(credentials: Record<"MetaAddress" | "Password", string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
        if (!credentials?.MetaAddress || !credentials?.Password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { MetaAddress: credentials?.MetaAddress },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.Password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id,
          username: existingUser.username || "",
          email: existingUser.email,
          MetaAddress: existingUser.MetaAddress || "",
          image: existingUser.image || null,
        } ;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          MetaAddress: user.MetaAddress,
          image: user.image,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          eddress: token.eddress,
          id: token.id,
        },
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
