import { classes } from './classes'
import { StyledToaster } from './styled'
import { Iconify } from '../iconify/iconify'

export function Toaster() {
  return (
    <StyledToaster
      closeButton
      visibleToasts={3}
      duration={1500}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: classes.toast,
          icon: classes.icon,

          content: classes.content,
          title: classes.title,
          description: classes.description,

          actionButton: classes.actionButton,
          cancelButton: classes.cancelButton,
          closeButton: classes.closeButton,

          default: classes.default,
          info: classes.info,
          error: classes.error,
          success: classes.success,
          warning: classes.warning,
        },
      }}
      icons={{
        loading: <span />,
        info: <Iconify width={25} icon="solar:info-circle-bold" />,
        success: <Iconify width={25} icon="solar:check-circle-bold" />,
        warning: <Iconify width={25} icon="solar:danger-triangle-bold" />,
        error: <Iconify width={25} icon="solar:danger-bold" />,
      }}
    />
  )
}
