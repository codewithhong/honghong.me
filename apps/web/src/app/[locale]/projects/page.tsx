import { getLocale, getTranslations } from '@tszhong0411/i18n/server'
import { allProjects } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import type { CollectionPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import { SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

type PageProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, never>>
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const t = await getTranslations({ locale, namespace: 'projects' })
  const title = t('title')
  const description = t('description')
  const url = getLocalizedPath({ slug: '/projects', locale })

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      ...previousOpenGraph,
      url,
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

const Page = async () => {
  const t = await getTranslations()
  const title = t('projects.title')
  const description = t('projects.description')
  const locale = await getLocale()
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/projects', locale })}`

  const projects = allProjects.filter((project) => project.language === locale)

  const jsonLd: WithContext<CollectionPage> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: t('metadata.site-title'),
      url: SITE_URL
    },
    hasPart: allProjects.map((project) => ({
      '@type': 'SoftwareApplication',
      name: project.name,
      description: project.description,
      url: `${url}/${project.slug}`,
      applicationCategory: 'WebApplication'
    }))
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <ProjectCards projects={projects} />
    </>
  )
}

export default Page