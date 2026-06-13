'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import FormInput from '@/components/ui/Input/Input'
import { useSchemaCitySearch, type CitySearchFormData } from '@/schemas/schema-city-search'
import useWeatherStore from '@/store/weather-store/weather-store'

import { StyledBox, StyledDividerWrapper, StyledForm, StyledContainer } from './styled'

import type { SubmitEvent } from 'react'
import { useCityStore } from '@/store'

const SearchForm = () => {
  const { t } = useTranslation()
  const schemaCitySearch = useSchemaCitySearch()
  const fetchWeatherByCity = useWeatherStore((state) => state.fetchWeatherByCity)
  const clearError = useWeatherStore((state) => state.clearError)
  const setCity = useCityStore((state) => state.setCity)

  const formProps = useForm<CitySearchFormData>({
    defaultValues: {
      city: '',
    },
    resolver: zodResolver(schemaCitySearch),
  })

  useEffect(() => {
    const subscription = formProps.watch(() => {
      if (useWeatherStore.getState().error) {
        clearError()
      }
    })

    return () => subscription.unsubscribe()
  }, [formProps, clearError])

  const onSubmit = async ({ city }: CitySearchFormData) => {
    const id = await fetchWeatherByCity(city)

    if (id) {
      setCity(id)
    }
  }

  return (
    <StyledContainer>
      <FormProvider {...formProps}>
        <StyledForm
          onSubmit={(event: SubmitEvent<HTMLFormElement>) => {
            void formProps.handleSubmit(onSubmit)(event)
          }}
        >
          <Typography variant="h2">{t('search.title')}</Typography>
          <StyledBox>
            <FormInput
              name="city"
              type="text"
              placeholder={t('search.placeholder')}
              label={t('search.label')}
              aria-label={t('search.label')}
            />
          </StyledBox>
          <StyledDividerWrapper>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('search.submit')}
            </Button>
          </StyledDividerWrapper>
        </StyledForm>
      </FormProvider>
    </StyledContainer>
  )
}

export default SearchForm
