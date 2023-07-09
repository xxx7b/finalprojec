import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      secret: '65269M7iIuj6k%xq9*3LFqh!OAYW',
      pages: {
        signIn: "/login",
        error:'/login'
      },
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize (credentials) {
        const { name, email, password, usertype } = credentials;
        console.log("These are the credentials:", name, email, password, usertype);
        
        try {
          const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({
              name,
              email,
              password,
            }),
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.ok) {
            const user = await response.json();
            console.log("This is the user in auth", user);
            
            if (user) {
              return {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  usertype: user.userype,
                  expp:user.exp,
              };
            }
          }
          else {
            console.error('Error fetching user:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }

        return null;
      },
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async jwt({ token, trigger, session, user }) {
      if (trigger === "update" && session) {
        return { ...token, ...session?.user };
      }
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
