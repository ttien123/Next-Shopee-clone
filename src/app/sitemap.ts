import productApi from '@/apis/product.api'
import envConfig from '@/config'
import { generateSlugUrl } from '@/lib/utils'
import type { MetadataRoute } from 'next'

const staticRoutes: MetadataRoute.Sitemap = [
  {
    url: '',
    changeFrequency: 'daily',
    priority: 1
  },
  {
    url: '/login',
    changeFrequency: 'yearly',
    priority: 0.5
  },
  {
    url: '/register',
    changeFrequency: 'yearly',
    priority: 0.5
  }
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const result = await productApi.getProducts({
      limit: 30,
      page: 1
  })
  const listProduct = result.data.data.products
  const localizeStaticSiteMap = staticRoutes.map(router => {
    return {
      ...router,
      url: `${envConfig.NEXT_PUBLIC_URL}${router.url}`,
      lastModified: new Date()
    }
  })

  const localizeProductSiteMap: MetadataRoute.Sitemap = listProduct.map(product => {
    return {
      url: `${envConfig.NEXT_PUBLIC_URL}/${generateSlugUrl({
        id: product._id,
        name: product.name
      })}`,
      lastModified: product.updatedAt,
      changeFrequency: 'weekly',
      priority: 0.9
    }
  })

  return [...localizeStaticSiteMap, ...localizeProductSiteMap]
}
