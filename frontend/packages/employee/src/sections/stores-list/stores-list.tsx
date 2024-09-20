import * as React from 'react'
import { useStoresList } from '@/hooks/api'

import {
  Table,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableFooter,
  TableContainer,
  TablePagination,
} from '@mui/material'

import { TablePaginationActions } from './table-pagination-actions' // 분리된 파일에서 import

export function StoresList() {
  const { data: stores, isLoading, error } = useStoresList()

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - stores.length) : 0

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  if (isLoading) return <Typography variant="h5">Loading...</Typography>
  if (error) return <Typography variant="h5">Error: {error.message}</Typography>
  if (!stores || stores.length === 0) {
    return <Typography variant="h5">No stores available</Typography>
  }

  return (
    <TableContainer
      component={Paper}
      sx={(theme) => ({
        maxWidth: '600px',
        margin: '0 auto',
        width: 1,
        [theme.breakpoints.down('sm')]: { width: '90%' },
      })}
    >
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? stores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : stores
          ).map((store) => (
            <TableRow key={store.storeName}>
              <TableCell component="th" scope="row">
                {store.storeName}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {store.storeAddress}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {store.storePhone}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={stores.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions} // 분리된 파일의 TablePaginationActions 사용
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}
