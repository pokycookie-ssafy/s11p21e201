import type { GridColDef, GridRowSelectionModel } from '@mui/x-data-grid'

import ExcelJS from 'exceljs'
import { toast } from 'sonner'
import { useState } from 'react'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { DialogDelete } from '@/components/dialog'
import { m, uuidv4, useBoolean } from '@e201/utils'
import MemberCreateField from '@/sections/member-create/member-create-field'

import { DataGrid } from '@mui/x-data-grid'
import { Card, Stack, Button, Tooltip, Collapse, Typography, IconButton } from '@mui/material'

import { Iconify, Container, Breadcrumbs, ExcelUpload } from '@e201/ui'

interface IEmployeeCreate {
  id: string
  employeeNo?: string
  employeeName?: string
}

export default function EmployeeCreate() {
  const { t } = useTranslate('member')

  const [employees, setEmployees] = useState<IEmployeeCreate[]>([])
  const [selected, setSelected] = useState<GridRowSelectionModel>([])

  const deleteAllConfirm = useBoolean()

  const multipleUploadHandler = (files: File[]) => {
    files.forEach(handleFileUpload)
  }

  const handleFileUpload = async (file: File) => {
    const workbook = new ExcelJS.Workbook()
    const reader = new FileReader()

    reader.onload = async () => {
      const buffer = reader.result as ArrayBuffer
      await workbook.xlsx.load(buffer)
      const worksheet = workbook.worksheets[0]

      const headerRow = worksheet.getRow(1).values
      const headers = Array.isArray(headerRow) ? headerRow : []

      let indexOfEmpNo = headers.indexOf('사번')
      let indexOfName = headers.indexOf('이름')

      if (indexOfEmpNo === -1) {
        indexOfEmpNo = 1
      }
      if (indexOfName === -1) {
        indexOfName = 2
      }

      const newRows: IEmployeeCreate[] = []
      for (let i = 2; i <= worksheet.rowCount; i++) {
        const row = worksheet.getRow(i)
        const id = uuidv4()
        const employeeNo = String(row.getCell(indexOfEmpNo).value)
        const employeeName = String(row.getCell(indexOfName).value)
        newRows.push({ employeeName, employeeNo, id })
      }
      setEmployees((prev) => [...prev, ...newRows])
    }

    if (file) {
      reader.readAsArrayBuffer(file)
    }
  }

  const addRow = () => {
    setEmployees((prev) => [
      ...prev,
      { id: uuidv4(), employeeName: undefined, employeeNo: undefined },
    ])
  }

  const deleteRow = (id: string) => {
    setEmployees((prev) => prev.filter((row) => row.id !== id))
  }

  const editRowNo = (id: string, no?: string) => {
    setEmployees((prev) => {
      const idx = prev.findIndex((row) => row.id === id)
      prev[idx].employeeNo = no
      return prev
    })
  }

  const deleteSubmitHandler = () => {
    toast.success(t('toast.delete'))
    selected.forEach((id) => deleteRow(id as string))
    deleteAllConfirm.onFalse()
  }

  const editRowName = (id: string, name?: string) => {
    setEmployees((prev) => {
      const idx = prev.findIndex((row) => row.id === id)
      prev[idx].employeeName = name
      return prev
    })
  }

  const columns: GridColDef<IEmployeeCreate>[] = [
    {
      field: 'employeeNo',
      headerName: t('field.employee_number'),
      width: 200,
      renderCell: (params) => (
        <MemberCreateField
          value={params.row.employeeNo}
          onChange={(value) => editRowNo(params.row.id, value)}
          placeholder={t('label.enter_employee_name')}
        />
      ),
    },
    {
      field: 'employeeName',
      headerName: t('field.employee_name'),
      flex: 1,
      renderCell: (params) => (
        <MemberCreateField
          value={params.row.employeeName}
          onChange={(value) => editRowName(params.row.id, value)}
          placeholder={t('label.enter_employee_no')}
        />
      ),
    },
    {
      field: 'actions',
      type: 'actions',
      resizable: false,
      getActions: (params) => [
        <Tooltip title={t('tooltip.delete')} disableInteractive>
          <IconButton color="error" onClick={() => deleteRow(params.row.id)}>
            <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
          </IconButton>
        </Tooltip>,
      ],
    },
  ]

  return (
    <>
      <Container maxWidth="md" sx={{ p: 0 }}>
        <Breadcrumbs
          title={t('breadcrumbs.create_member')}
          routes={[
            { title: t('breadcrumbs.management'), path: paths.management.member.root },
            {
              title: t('breadcrumbs.member_management'),
              path: paths.management.member.root,
            },
            { title: t('breadcrumbs.create_member') },
          ]}
          action={
            <Button color="secondary" onClick={() => console.log(employees)}>
              {t('button.create')}
            </Button>
          }
        />

        <Card>
          <Collapse in={selected.length > 0}>
            <Stack
              width={1}
              height={57}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              px={2}
              py={1}
              zIndex={1}
              bgcolor="background.paper"
              sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
            >
              <Typography variant="subtitle2">
                {m(t('label.selected'), [selected.length])}
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Tooltip title={t('tooltip.delete_all')} disableInteractive>
                  <IconButton color="error" onClick={deleteAllConfirm.onTrue}>
                    <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          </Collapse>

          <DataGrid
            rows={employees}
            columns={columns}
            rowSelectionModel={selected}
            onRowSelectionModelChange={setSelected}
            checkboxSelection
            hideFooter
            slotProps={{
              noRowsOverlay: {},
              noResultsOverlay: {},
            }}
            sx={{ height: 500 }}
          />
          {/* <MemberCreateHeader check={false} onCheck={() => {}} />
          <ScrollContainer sx={{ height: 500 }}>
            <Stack>
              {employees.map(({ employeeName, employeeNo }, i) => (
                <MemberCreateList
                  key={i}
                  employeeNo={employeeNo}
                  employeeName={employeeName}
                  onChange={(no, name) => editRow(i, no, name)}
                  onDelete={() => deleteRow(i)}
                />
              ))}
            </Stack>
          </ScrollContainer> */}

          <Stack
            spacing={1}
            p={1}
            sx={{ borderTop: (theme) => `1px solid ${theme.palette.divider}` }}
          >
            <ExcelUpload placeholder={t('label.upload_excel')} onChange={multipleUploadHandler} />

            <Button
              onClick={addRow}
              fullWidth
              sx={{
                height: 40,
                bgcolor: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[200]
                    : theme.palette.grey[700],
                color: (theme) =>
                  theme.palette.mode === 'light'
                    ? theme.palette.grey[600]
                    : theme.palette.grey[400],
                ':hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'light'
                      ? theme.palette.grey[300]
                      : theme.palette.grey[600],
                },
              }}
            >
              <Stack direction="row" alignItems="center">
                <Iconify icon="ic:round-plus" width={17} />
                <Typography variant="subtitle2">{t('button.add_member')}</Typography>
              </Stack>
            </Button>
          </Stack>
        </Card>
      </Container>
      <DialogDelete
        open={deleteAllConfirm.value}
        onClose={deleteAllConfirm.onFalse}
        onSubmit={deleteSubmitHandler}
        title={t('dialog.delete_all')}
        content={m(t('dialog.delete_all_content'), [selected.length])}
      />
    </>
  )
}
