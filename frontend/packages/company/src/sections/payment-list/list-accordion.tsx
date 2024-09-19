import React from 'react'
import { useBoolean } from '@/hooks/use-boolean'

import {
  List,
  ListItem,
  Accordion,
  ListItemText,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

interface ListAccordionProps {
  name: string
  items: string[]
}

export default function ListAccordion({ name, items }: ListAccordionProps) {
  const { value: expanded, toggle } = useBoolean(false)

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    if (isExpanded) {
      toggle()
    } else {
      toggle()
    }
  }
  return (
    <Accordion expanded={expanded} onChange={handleChange}>
      <AccordionSummary aria-controls="panel1-content" id="panel1-header">
        {name}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )
}
