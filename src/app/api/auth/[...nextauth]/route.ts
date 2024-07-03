import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/../lib/prisma';
import { comparePassword } from '@/lib/utils';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = await prisma.company.findFirst({
          where: {
            email: credentials?.email,
          },
        });

        if (!user) {
          return null;
        }

        const isMatch = await comparePassword(
          credentials?.password!,
          user.password
        );

        if (!isMatch) {
          console.log(`Credentials not valid for user: ${user.email}`);
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    newUser: '/auth/signup',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = account.id;
      }

      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.id as string;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
