import * as React from 'react'

import {
  Box,
  List,
  Stack,
  Button,
  ListItem,
  Accordion,
  TextField,
  Typography,
  ButtonGroup,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

export default function ListManager() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <Stack sx={{ gap: 3 }}>
      <Box sx={{ display: 'flex' }}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button>식당별</Button>
          <Button>사원별</Button>
        </ButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex' }}>
          <Typography variant="h5" component="h5">
            9월
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <TextField id="outlined-basic" label="시작년도" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="시작월" variant="outlined" size="small" />
          <Typography>~</Typography>
          <TextField id="outlined-basic" label="종료년도" variant="outlined" size="small" />
          <TextField id="outlined-basic" label="종료월" variant="outlined" size="small" />
        </Box>
      </Box>
      <Stack>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary aria-controls="panel1-content" id="panel1-header">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography>CM마케팅본부</Typography>
              <Typography>20,000원</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                  <Box>
                    <Typography variant="body1">2024.09.11 14:30</Typography>
                    <Typography variant="body1">고봉김밥</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Typography variant="body1">홍길동</Typography>
                    <Typography variant="body1">20,000원</Typography>
                  </Box>
                </Box>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary aria-controls="panel2-content" id="panel2-header">
            Accordion 2
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText>item2</ListItemText>
              </ListItem>
            </List>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </Stack>
  )
}
