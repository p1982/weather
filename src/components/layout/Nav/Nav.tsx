'use client'

import FavoriteIcon from '@mui/icons-material/Favorite'
import HomeIcon from '@mui/icons-material/Home'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { useTranslation } from 'react-i18next'

import { defaultLocale } from '@/i18n/settings'

import { StyledBottomNavigation, StyledBottomNavigationAction } from './styled'

const Nav = () => {
  const { t } = useTranslation()
  const pathname = usePathname()
  const params = useParams()
  const locale = typeof params.locale === 'string' ? params.locale : defaultLocale

  const navigationConfig = [
    {
      label: t('nav.home'),
      icon: <HomeIcon />,
      href: '/',
    },
    {
      label: t('nav.favorites'),
      icon: <FavoriteIcon />,
      href: '/favorites',
    },
    {
      label: t('nav.nearby'),
      icon: <LocationOnIcon />,
      href: '/nearby',
    },
  ] as const

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'
  const activeHref =
    navigationConfig.find((item) => item.href === pathWithoutLocale)?.href ??
    navigationConfig[0].href

  return (
    <StyledBottomNavigation showLabels value={activeHref}>
      {navigationConfig.map((item) => (
        <Link
          key={item.href}
          href={`/${locale}${item.href === '/' ? '' : item.href}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <StyledBottomNavigationAction value={item.href} label={item.label} icon={item.icon} />
        </Link>
      ))}
    </StyledBottomNavigation>
  )
}

export default Nav
