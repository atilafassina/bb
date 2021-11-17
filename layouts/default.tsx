import type { FC } from 'react'
import Head from 'next/head'
import Footer from '@components/footer'
import { SessionProvider } from 'next-auth/react'
const DefaultLayout: FC = ({ children }) => {
  return (
    <SessionProvider>
      <Head>
        <title>Next.js Black Belt 🥋</title>
      </Head>
      <main className="double-flow">
        <div>{children}</div>
        <Footer />
      </main>
    </SessionProvider>
  )
}

export { DefaultLayout }
