import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'your name' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'enter password',
        },
      },

      async authorize(credentials) {
        const user = {
          username: process.env.AUTH_USERNAME,
          password: process.env.AUTH_PASSWORD,
        }
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          return user
        }
        return null as any
      },
    }),
  ],
  URL: process.env.NEXT_PUBLIC_URL,
  secret: process.env.NEXT_PUBLIC_SECRET,
}
