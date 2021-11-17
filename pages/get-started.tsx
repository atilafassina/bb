import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { GithubLogin } from '@components/github-login'
import { DefaultLayout } from '@layouts/default'
import { useSession } from 'next-auth/react'
// import { Loading } from '@components/loading'
// import { Header } from '@components/header'

const GetStarted = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/authenticated')
    }
  }, [status, session, router])

  return (
    <article className="w-full py-40 grid place-items-center">
      <GithubLogin />
    </article>
  )
}

export default GetStarted
