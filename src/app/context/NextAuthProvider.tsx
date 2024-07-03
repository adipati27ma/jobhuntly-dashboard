'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import React, { FC } from 'react';

interface NextAuthProviderProps {
  session?: Session;
  children: React.ReactNode;
}

const NextAuthProvider: FC<NextAuthProviderProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default NextAuthProvider;
