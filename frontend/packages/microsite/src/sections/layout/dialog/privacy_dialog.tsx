import term from '@/assets/data/term'

import { Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material'

import { Typography } from '@e201/ui'

export default function PrivacyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>개인정보처리방침</DialogTitle>
      <DialogContent>
        <Typography variant="body1" whiteSpace="pre-wrap">
          {term.personal}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}
