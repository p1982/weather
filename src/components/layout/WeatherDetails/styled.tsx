import { styled } from '@mui/material/styles'
import { Card, CardContent, List, Typography } from '@mui/material'

export const StyledList = styled(List)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(2),
  padding: 0,
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}))

export const StyledCard = styled(Card)({
  width: '100%',
  margin: '0 auto',
})

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  textAlign: 'center',
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}))

export const StyledCardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  width: '100%',
}))

export const StyledWeatherIcon = styled('img')({
  width: 100,
  height: 100,
  objectFit: 'contain',
})

export const StyledCardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(0.5),
}))

export const StyledCardText = styled(Typography)({
  margin: 0,
})