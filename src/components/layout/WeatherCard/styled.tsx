'use client'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledCard = styled(Card)({
  width: '100%',
  maxWidth: 400,
  margin: '0 auto',
})

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
  padding: theme.spacing(3),
  '&:last-child': {
    paddingBottom: theme.spacing(3),
  },
}))

export const StyledCardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}))

export const StyledCardTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))

export const StyledCardText = styled(Typography)(() => ({
  margin: 0,
}))

export const StyledEmpty = styled(Typography)(({ theme }) => ({
  width: '100%',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  padding: theme.spacing(4, 0),
}))

export const StyledWeatherIcon = styled('img')(({ theme }) => ({
  width: 96,
  height: 96,
  objectFit: 'contain',
  alignSelf: 'center',
  marginBottom: theme.spacing(1),
}))

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}))

export const StyledHeaderBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
}))
