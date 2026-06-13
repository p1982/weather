'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

export interface CitySearchFormData {
  city: string
}

export const useSchemaCitySearch = () => {
  const { t } = useTranslation()

  return useMemo(
    () =>
      z.object({
        city: z
          .string()
          .trim()
          .min(2, { message: t('search.required') }),
      }),
    [t],
  )
}
