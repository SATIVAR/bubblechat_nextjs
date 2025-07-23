
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@bubblechat.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
            return null;
        }

        const user = await prisma.user.findUnique({
            where: { email: credentials.email }
        });

        if (!user) {
            return null;
        }
        
        // No caso do Super Admin, a senha não é hashada, comparamos diretamente com a variável de ambiente
        const isAdmin = user.email === process.env.ADMIN_EMAIL;
        const passwordMatches = isAdmin 
            ? credentials.password === process.env.ADMIN_PASSWORD
            : await compare(credentials.password, user.password!);


        if (passwordMatches) {
            return {
                id: user.id,
                email: user.email,
                name: user.name,
            };
        }
        
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/', 
    signOut: '/',
    error: '/', 
  },
};
