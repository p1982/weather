'use client'
import { Box, IconButton, List, ListItem, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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

export const StyledFavoriteItem = styled(ListItem)(({ theme }) => ({
  position: 'relative',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  cursor: 'pointer',
  transition: theme.transitions.create(['border-color', 'box-shadow']),
  '&:hover': {
    borderColor: theme.palette.primary.main,
    boxShadow: theme.shadows[2],
  },
}))

export const StyledFavoriteButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}))

export const StyledCardText = styled(Typography)(() => ({
  margin: 0,
}))

export const StyledEmptyList = styled(Typography)(({ theme }) => ({
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

export const StyledCardHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  width: '100%',
}))

export const StyledCardTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}))
