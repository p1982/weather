'use client'

import { ToggleButton } from '@mui/material'
import { styled } from '@mui/material/styles'

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  fontSize: '1.25rem',
  lineHeight: 1,
  minWidth: 44,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
}))
