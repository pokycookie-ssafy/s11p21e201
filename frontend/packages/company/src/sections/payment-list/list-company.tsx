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

export default function ListCompany() {
  const [expanded, setExpanded] = React.useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <Stack sx={{ gap: 3 }}>
      <Box sx={{ display: 'flex' }}>
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button>부서별</Button>
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
            Accordion 1
          </AccordionSummary>
          <AccordionDetails>
            <List>
              <ListItem>
                <ListItemText>item1</ListItemText>
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
