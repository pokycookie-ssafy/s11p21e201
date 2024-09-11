import { Toaster } from 'sonner'
import { darken, styled, lighten } from '@mui/material'

import { classes } from './classes'

export const StyledToaster = styled(Toaster)(({ theme }) => {
  const baseStyles = {
    toastDefault: {
      padding: theme.spacing(1, 1, 1, 1.5),
      boxShadow: theme.shadows[8],
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    toastColor: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.shadows[8],
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
    toastLoader: {
      padding: theme.spacing(0.5, 1, 0.5, 0.5),
      boxShadow: theme.shadows[8],
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
    },
  }

  return {
    width: 300,

    [`& .${classes.toast}`]: {
      gap: 12,
      width: '100%',
      minHeight: 50,
      display: 'flex',
      borderRadius: 10,
      alignItems: 'center',
    },

    [`& .${classes.content}`]: {
      gap: 0,
      flex: '1 1 auto',
    },
    [`& .${classes.title}`]: {
      fontSize: theme.typography.subtitle2.fontSize,
    },
    [`& .${classes.description}`]: {
      ...theme.typography.caption,
      opacity: 0.64,
    },

    [`& .${classes.closeButton}`]: {
      top: 0,
      right: 0,
      left: 'auto',
      color: 'currentColor',
      backgroundColor: 'transparent',
      transform: 'translate(-6px, 6px)',
      borderColor: theme.palette.grey[200],
      transition: theme.transitions.create(['background-color', 'border-color']),
      '&:hover': {
        borderColor: darken(theme.palette.grey[200], 0.1),
        backgroundColor: theme.palette.grey[100],
      },
    },

    [`& .${classes.icon}`]: {
      margin: 0,
      width: 48,
      height: 48,
      alignItems: 'center',
      borderRadius: 'inherit',
      justifyContent: 'center',
      alignSelf: 'flex-start',
    },

    [`& .${classes.default}`]: {
      ...baseStyles.toastDefault,
    },

    [`& .${classes.success}`]: {
      ...baseStyles.toastColor,
      [`& .${classes.icon}`]: {
        color: theme.palette.success.main,
        backgroundColor: lighten(theme.palette.success.main, 0.9),
      },
    },

    [`& .${classes.info}`]: {
      ...baseStyles.toastColor,
      [`& .${classes.icon}`]: {
        color: theme.palette.info.main,
        backgroundColor: lighten(theme.palette.info.main, 0.9),
      },
    },

    [`& .${classes.warning}`]: {
      ...baseStyles.toastColor,
      [`& .${classes.icon}`]: {
        color: theme.palette.warning.main,
        backgroundColor: lighten(theme.palette.warning.main, 0.9),
      },
    },

    [`& .${classes.error}`]: {
      ...baseStyles.toastColor,
      [`& .${classes.icon}`]: {
        color: theme.palette.error.main,
        backgroundColor: lighten(theme.palette.error.main, 0.9),
      },
    },
  }
})
