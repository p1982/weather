'use client'

import { styled } from '@mui/material/styles'

export const StyledPageContainer = styled('div')(({ theme }) => ({
  maxWidth: 1440,
  margin: '0 auto',
  padding: theme.spacing(4, 2),
  width: '100%',
}))
