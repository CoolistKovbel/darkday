import { NextAuthOptions, getServerSession } from "next-auth";
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
      name: "rawrXd",
      credentials: {
        MetaAddress: { label: "MetaAddress", placeholder: "0x" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        console.log(credentials, "Crednetials login field")

        if (!credentials?.MetaAddress || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { MetaAddress: credentials?.MetaAddress},
        }); 

        
        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          userId: existingUser.userId,
          username: existingUser.username || "",
          email: existingUser.email,
          eddress: existingUser.eddress || "" ,
          image: existingUser.image,

        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {

        // console.log(profile, "jwt token callback")

      // Persist the OAuth access_token and or the user id to the token right after signin
      if (user) {
        
        return {
          ...token,
          username: user.username,
          eddress: user.eddress,
          userId: user.userId,
          image: user.image,
          id: user.id

        };
      }
      return token;
    },
    async session({ session, token }) {
        // console.log(token, "Logging from the auth session funcion")
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          eddress: token.eddress,
          userId: token.userId,
          id: token.id
        },
      };
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);