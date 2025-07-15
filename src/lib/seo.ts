import { Metadata } from 'next'

interface SEOData {
  title: string
  description: string
  image?: string
  date: string
  tags?: string[]
  type: 'project' | 'writing'
  slug: string
  author?: string
  readTime?: string
  status?: string
  githubUrl?: string
  liveUrl?: string
}

const SITE_CONFIG = {
  name: 'Ardana Nugraha',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ardananugraha.dev',
  description: 'Full-stack developer and software engineer',
  author: 'Ardana Nugraha',
  twitter: '@ardananugraha', // Replace with actual Twitter handle
}

export function generateSEOMetadata(data: SEOData): Metadata {
  const {
    title,
    description,
    image,
    date,
    tags = [],
    type,
    slug,
    author = SITE_CONFIG.author,
    readTime,
    status,
    githubUrl,
    liveUrl
  } = data

  const url = `${SITE_CONFIG.url}/${type === 'project' ? 'projects' : 'writings'}/${slug}`
  const pageTitle = type === 'project' ? `${title} | Projects` : title
  
  // Enhanced description with additional context
  let enhancedDescription = description
  if (type === 'project' && status) {
    enhancedDescription += ` | Status: ${status.replace('-', ' ')}`
  }
  if (readTime) {
    enhancedDescription += ` | ${readTime} read`
  }
  if (tags.length > 0) {
    enhancedDescription += ` | Technologies: ${tags.slice(0, 3).join(', ')}`
  }

  // Generate structured keywords
  const baseKeywords = [
    SITE_CONFIG.author,
    type === 'project' ? 'project' : 'blog',
    type === 'project' ? 'portfolio' : 'article',
    'software development',
    'programming'
  ]
  const allKeywords = [...baseKeywords, ...tags].join(', ')

  const metadata: Metadata = {
    title: pageTitle,
    description: enhancedDescription,
    keywords: allKeywords,
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_CONFIG.name,
    
    // Open Graph
    openGraph: {
      title: pageTitle,
      description: description, // Use original description for social sharing
      url,
      siteName: SITE_CONFIG.name,
      type: 'article',
      publishedTime: date,
      authors: [author],
      tags,
      ...(image && {
        images: [
          {
            url: image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`,
            width: 1200,
            height: 630,
            alt: title,
            type: 'image/jpeg',
          },
        ],
      }),
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      creator: SITE_CONFIG.twitter,
      site: SITE_CONFIG.twitter,
      ...(image && {
        images: [image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`],
      }),
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Additional project-specific metadata
    ...(type === 'project' && {
      other: {
        ...(githubUrl && { 'project:github': githubUrl }),
        ...(liveUrl && { 'project:demo': liveUrl }),
        ...(status && { 'project:status': status }),
      },
    }),
  }

  return metadata
}

// Generate JSON-LD structured data
export function generateStructuredData(data: SEOData) {
  const {
    title,
    description,
    image,
    date,
    tags = [],
    type,
    slug,
    author = SITE_CONFIG.author,
    readTime,
  } = data

  const url = `${SITE_CONFIG.url}/${type === 'project' ? 'projects' : 'writings'}/${slug}`

  if (type === 'writing') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: title,
      description,
      image: image ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`) : undefined,
      datePublished: date,
      dateModified: date,
      author: {
        '@type': 'Person',
        name: author,
        url: SITE_CONFIG.url,
      },
      publisher: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.url,
      },
      url,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url,
      },
      keywords: tags.join(', '),
      ...(readTime && {
        timeRequired: readTime,
      }),
    }
  } else {
    return {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
      description,
      image: image ? (image.startsWith('http') ? image : `${SITE_CONFIG.url}${image}`) : undefined,
      dateCreated: date,
      creator: {
        '@type': 'Person',
        name: author,
        url: SITE_CONFIG.url,
      },
      url,
      keywords: tags.join(', '),
    }
  }
}