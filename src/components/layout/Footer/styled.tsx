'use client'

import { styled } from '@mui/material/styles'

export const StyledFooterShell = styled('footer')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
  borderTop: `1px solid ${theme.palette.divider}`,
  flexShrink: 0,
  marginTop: 'auto',
}))

export const StyledFooterInner = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(2, 0),
  color: theme.palette.text.secondary,
}))
