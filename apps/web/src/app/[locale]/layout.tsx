import { env, flags } from '@tszhong0411/env'
import { NextIntlClientProvider } from '@tszhong0411/i18n/client'
import { i18n } from '@tszhong0411/i18n/config'
import { getMessages, getTranslations, setRequestLocale } from '@tszhong0411/i18n/server'
import { cn } from '@tszhong0411/utils'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

import '@/styles/globals.css'
import Analytics from '@/components/analytics'
import Hello from '@/components/hello'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import SignInDialog from '@/components/sign-in-dialog'
import { SITE_KEYWORDS, SITE_NAME, SITE_URL } from '@/lib/constants'

import Providers from '../providers'
import ReactScan from '../react-scan'

type LayoutProps = {
  children: React.ReactNode
  params: Promise<{
    locale: string
  }>
}

export const generateStaticParams = (): Array<{ locale: string }> => {
  return i18n.locales.map((locale) => ({ locale }))
}

export const generateMetadata = async (props: LayoutProps): Promise<Metadata> => {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('site-title'),
      template: `%s | ${t('site-title')}`
    },
    description: t('site-description'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    manifest: '/favicon/site.webmanifest',
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: t('site-description'),
      site: '@tszhong0411',
      siteId: '1152256803746377730',
      creator: '@tszhong0411',
      creatorId: '1152256803746377730',
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: t('site-description')
        }
      ]
    },
    keywords: SITE_KEYWORDS,
    creator: 'tszhong0411',
    openGraph: {
      url: SITE_URL,
      type: 'website',
      title: t('site-title'),
      siteName: t('site-title'),
      description: t('site-description'),
      locale,
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: t('site-description'),
          type: 'image/png'
        }
      ]
    },
    icons: {
      icon: '/favicon/favicon.svg',
      shortcut: '/favicon/favicon.svg',
      apple: [
        {
          url: '/favicon/apple-touch-icon.png',
          sizes: '180x180',
          type: 'image/png'
        }
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          url: '/favicon/favicon-16x16.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          url: '/favicon/favicon-32x32.png'
        }
      ]
    }
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

const CalSans = localFont({
  src: '../../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-title'
})

const Layout = async (props: LayoutProps) => {
  const { children } = props
  const { locale } = await props.params
  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html
      lang={locale}
      className={cn(GeistSans.variable, GeistMono.variable, CalSans.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body className='relative'>
        <NuqsAdapter>
          <Providers>
            <NextIntlClientProvider messages={messages}>
              <Hello />
              <Header />
              <main id='skip-nav' className='mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8'>
                {children}
              </main>

              <Footer />
              {flags.analytics ? <Analytics /> : null}
              <SignInDialog />
              <Image
                width={1512}
                height={550}
                className='absolute left-1/2 top-0 -z-10 -translate-x-1/2'
                src='/images/gradient-background-top.png'
                alt=''
                role='presentation'
                priority
              />
              <Image
                width={1512}
                height={447}
                className='absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2'
                src='/images/gradient-background-bottom.png'
                alt=''
                role='presentation'
                priority
              />
            </NextIntlClientProvider>
          </Providers>
        </NuqsAdapter>
        <SpeedInsights />
        {env.REACT_SCAN_MONITOR_API_KEY ? (
          <ReactScan apiKey={env.REACT_SCAN_MONITOR_API_KEY} />
        ) : null}
      </body>
    </html>
  )
}

export default Layout
