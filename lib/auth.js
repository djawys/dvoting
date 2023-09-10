import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
const bcrypt = require('bcrypt');
import { db } from '@/prisma/db';

export const authOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials, req) {
        console.log(credentials);
        const user = await db.user.findUnique({
          where: {
            cnic: credentials.cnic,
          },
        });
        console.log('aby', user);
        if (user) {
          let match = await bcrypt.compare(credentials.password, user.password);
          console.log('match', match);
          if (match) {
            return user;
          }
          return null;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.image = token.image;
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token, user }) {
      let dbUser;
      if (token.image) {
        dbUser = await db.user.findUnique({
          where: {
            id: token.image,
          },
        });
      }

      if (token.sub) {
        dbUser = await db.user.findUnique({
          where: {
            id: token.sub,
          },
        });
      }

      if (!dbUser) {
        if (user) {
          token.image = user?.id;
        }
        return token;
      }

      console.log({
        image: dbUser.id,
        name: dbUser.name,
        email: dbUser.cnic,
      });
      return {
        image: dbUser.id,
        name: dbUser.name,
        email: dbUser.cnic,
      };
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
