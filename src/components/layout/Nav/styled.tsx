'use client'

import { BottomNavigation, BottomNavigationAction, styled } from '@mui/material'

export const StyledBottomNavigation = styled(BottomNavigation)(() => ({
  backgroundColor: 'transparent',
  flexShrink: 0,
}))

export const StyledBottomNavigationAction = styled(BottomNavigationAction)(() => ({
  minWidth: 'auto',
  padding: '6px 12px',
  '& .MuiBottomNavigationAction-label': {
    whiteSpace: 'nowrap',
    fontSize: '0.75rem',
  },
}))
