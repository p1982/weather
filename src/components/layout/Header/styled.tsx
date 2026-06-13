'use client'

import { styled } from '@mui/material/styles'

export const StyledHeaderShell = styled('header')(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
  flexShrink: 0,
}))

export const StyledHeaderInner = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  color: theme.palette.text.primary,
}))
