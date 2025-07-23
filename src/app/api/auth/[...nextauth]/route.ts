
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is where you would check the credentials against a database
        // For this example, we'll use a hardcoded user
        if (credentials?.email === "admin@bubblechat.com" && credentials?.password === "admin") {
          return { id: "1", name: "Super Admin", email: "admin@bubblechat.com" }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    error: '/', // Redirect to homepage on error
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
