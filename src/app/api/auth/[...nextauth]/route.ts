import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // --- Provedor de Autenticação com Credenciais (Email/Senha) ---
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@bubblechat.com" },
        password: {  label: "Password", type: "password", placeholder: "admin" }
      },
      async authorize(credentials) {
        // Para este exemplo, usamos um usuário "hardcoded" como nos seus documentos.
        // Em um projeto real, aqui você faria a consulta a um banco de dados.
        if (credentials?.email === "admin@bubblechat.com" && credentials?.password === "admin") {
          // Retorna os dados do usuário se a autorização for bem-sucedida
          return { id: "1", name: "Super Admin", email: "admin@bubblechat.com" };
        }
        // Retorna nulo se as credenciais forem inválidas, o que causa um erro de login.
        return null;
      }
    })
  ],
  // O secret é lido das variáveis de ambiente
  secret: process.env.NEXTAUTH_SECRET,

  // Callbacks para controlar o que acontece durante o fluxo de autenticação
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

  // Redireciona o usuário para o dashboard após um login bem-sucedido.
  // Se o login falhar, ele será redirecionado para a página de erro (configurada abaixo).
  pages: {
    signIn: '/', // A página de login é a página inicial
    signOut: '/',
    error: '/auth/error', // Rota para exibir erros de autenticação (ex: senha incorreta)
    verifyRequest: '/', 
    newUser: '/' 
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
