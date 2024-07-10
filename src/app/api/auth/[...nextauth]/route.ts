import NextAuth, { NextAuthOptions, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/../lib/prisma';
import { comparePassword } from '@/lib/utils';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    /**
     * docs: yg ada disini adalah bentuk obj yg akan di return
     * di useSession() pada client side
     */
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' },
        id: {
          type: 'text',
        },
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
          user?.password!
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
    signOut: '/auth/signout',
    newUser: '/auth/signup',
  },
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.id = user?.id;
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
