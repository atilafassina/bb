import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next'
import type { Locale } from '@utils/useI18n'
import Link from 'next/link'
import { QuestionMarkCircleIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import { useI18n } from '@utils/useI18n'
import { Weather } from '@components/weather'

const Home = ({
  realFeel,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { locale } = useRouter()
  const pageLocale = locale as Locale
  const { translate: t } = useI18n(pageLocale, false)
  return (
    <>
      {realFeel && <Weather temperature={realFeel} />}
      <article className="grid sm:grid-cols-2 sm:h-full">
        <header className="sm:h-full grid place-items-center bg-purple-600">
          <h1 className="text-black text-5xl sm:text-8xl text-center py-5 font-mono">
            {t('smash')}
          </h1>
          {locale === 'en' ? (
            <Link href="/" locale="pt">
              <a>Portuguese</a>
            </Link>
          ) : (
            <Link href="/" locale="en">
              <a>English</a>
            </Link>
          )}
        </header>
        <div className="sm:h-full grid place-items-center py-20 px-5 ">
          <div>
            <p className="text-purple-500 text-2xl sm:text-4xl lg:text-5xl text-center">
              map your work’s net
            </p>
            <Link href="/about">
              <a className="text-gray-400 hover:text-gray-200 transition block text-center py-5 lg:py-8 hover:no-underline font-sans">
                Read about it{' '}
                <QuestionMarkCircleIcon className="animate-bounce inline w-6" />
              </a>
            </Link>
            <div className="py-8 w-full grid place-items-center sm:text-3xl">
              <Link href="/get-started">
                <a className="block px-6 py-3 border-2 border-purple-300 rounded-md text-purple-300 animate-pulse font-mono !no-underline hover:bg-purple-300 hover:text-black focus:bg-purple-300 focus:text-black">
                  get started
                </a>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const realFeel = parseInt(ctx.req.cookies['realFeel'], 10)

  return {
    props: {
      realFeel: Number.isNaN(realFeel) ? null : realFeel,
    },
  }
}

export default Home
