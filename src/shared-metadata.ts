import envConfig from '@/config'

export const baseOpenGraph = {
  type: 'website',
  siteName: 'Shopee Clone',
  images: [
    {
      url: `${envConfig.NEXT_PUBLIC_URL}/banner.png`
    }
  ]
}
