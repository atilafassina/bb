import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import { DefaultLayout } from '@layouts/default'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
