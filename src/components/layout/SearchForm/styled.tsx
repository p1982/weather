'use client'

import { Box, Link, styled } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
  padding: theme.spacing(2, 0),
}))

export const StyledForm = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
}))

export const StyledBox = styled(Box)(() => ({
  width: '100%',
}))

export const StyledDividerWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}))

export const StyledLinkPolicy = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  textDecorationColor: theme.palette.primary.main,
}))
