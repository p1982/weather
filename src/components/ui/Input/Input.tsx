'use client'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { StyledInputWrapper, StyledLabel, StyledTextField } from './styled'

const FormInput = ({
  name,
  type,
  placeholder,
  label,
}: {
  name: string
  type?: string
  placeholder?: string
  label?: string
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <StyledInputWrapper>
          <StyledLabel htmlFor={name}>{label}</StyledLabel>
          <StyledTextField
            {...field}
            id={name}
            variant="outlined"
            error={!!error}
            helperText={error?.message ?? '\u00A0'}
            placeholder={placeholder}
            fullWidth
            type={type}
          />
        </StyledInputWrapper>
      )}
    />
  )
}

export default FormInput
