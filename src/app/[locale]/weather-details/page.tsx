import WeatheDetailPage from '@/components/pages/WeatherDetailPage/WeatheDetailPage'
import { Suspense } from 'react'

interface PageProps {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ city?: string }>
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <Suspense>
      <WeatheDetailPage params={params} searchParams={searchParams} />
    </Suspense>
  )
}
