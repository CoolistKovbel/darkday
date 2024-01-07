import NextAuth from "next-auth";
import { types } from "util";

declare module "next-auth" {

    interface User {
        id: string;
        username: string;
        email: string;
        MetaAddress: string | null;
        image: string | null;
    }

    interface Session {
        user: User & {
            id: string;
            username: string;
            email: string;
            MetaAddress: string | null;
            image: string | null;
        }
        token: {
            id: string;
            username: string;
            email: string;
            MetaAddress: string | null;
            image: string | null;
        }
    }
}