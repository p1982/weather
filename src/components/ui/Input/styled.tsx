import { InputLabel, styled, TextField } from '@mui/material'

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    width: '100%',
    borderRadius: '6px',
    boxSizing: 'border-box !important',
    padding: '4px',
    color: theme.palette.text.primary,
    fontSize: theme.typography.body2.fontSize,
    fontWeight: theme.typography.body2.fontWeight,
    lineHeight: theme.typography.body2.lineHeight,
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.text.primary,
    },
    '& .MuiInputAdornment-root': {
      paddingRight: '16px',
    },
    '& .Mui-error': {
      borderColor: '2px solid #f44336 !important',
    },
    '&.Mui-error fieldset': {
      borderColor: '2px solid #f44336',
    },
  },
  '& .MuiFormHelperText-root': {
    minHeight: '2.75em',
    lineHeight: 1.4,
    margin: theme.spacing(0.5, 1.75, 0),
  },
}))

export const StyledLabel = styled(InputLabel)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: theme.typography.body2.fontWeight,
  lineHeight: theme.typography.body2.lineHeight,
  marginBottom: '8px',
}))

export const StyledInputWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: '100%',
}))
