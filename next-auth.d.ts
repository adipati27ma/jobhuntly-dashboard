import NextAuth, { DefaultSession } from 'next-auth';

/* 
  docs: declaration for additional properties
  in intfc. Session on next-auth module
*/
declare module 'next-auth' {
  interface Session {
    user: { id: string } & DefaultSession['user'];
  }
}
