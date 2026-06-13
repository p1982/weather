'use client'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: theme.typography.body1.fontSize,
  fontWeight: theme.typography.body1.fontWeight,
  lineHeight: theme.typography.body1.lineHeight,
}))