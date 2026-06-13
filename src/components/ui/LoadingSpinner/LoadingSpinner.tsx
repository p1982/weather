import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return <CircularProgress size={size} />
}

export default LoadingSpinner
