import ExcelJS from 'exceljs'
import paths from '@/configs/paths'
import { useTranslate } from '@/locales'
import { useRef, useState } from 'react'
import MemberCreateList from '@/sections/member-create/member-create-list'
import MemberCreateHeader from '@/sections/member-create/member-create-header'

import { Card, Stack, Button, Typography } from '@mui/material'

import { Iconify, Container, Breadcrumbs, ExcelUpload, ScrollContainer } from '@e201/ui'

interface IEmployeeCreate {
  employeeNo?: string
  employeeName?: string
}

export default function EmployeeCreate() {
  const { t } = useTranslate('member')

  const [employees, setEmployees] = useState<IEmployeeCreate[]>([])

  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [selectedRows, setSelectedRows] = useState<number[]>([])

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
        const employeeNo = row.getCell(indexOfEmpNo).value as string
        const employeeName = row.getCell(indexOfName).value as string
        newRows.push({ employeeName, employeeNo })
      }
      setEmployees((prev) => [...prev, ...newRows])
    }

    if (file) {
      reader.readAsArrayBuffer(file)
    }
  }

  const addRow = () => {
    setEmployees((prev) => [...prev, { employeeName: undefined, employeeNo: undefined }])
  }

  const deleteRow = (idx: number) => {
    setEmployees((prev) => prev.filter((_, i) => idx !== i))
  }

  const editRow = (idx: number, no?: string, name?: string) => {
    setEmployees((prev) => {
      prev[idx].employeeNo = no
      prev[idx].employeeName = name
      return prev
    })
  }

  return (
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
        action={<Button color="secondary">{t('button.create')}</Button>}
      />

      {/* <Collapse in={selectedRows.length > 0}>
        <Stack
          width={1}
          height={57}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          px={2}
          py={1}
          zIndex={1}
        >
          <Typography variant="subtitle1">
            {selectedRows.length}
            {t('selected')}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title={t('create_account')} arrow disableInteractive>
              <IconButton color="success">
                <Iconify icon="ri:user-add-line" />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('delete')} arrow disableInteractive>
              <IconButton color="error" onClick={handleDeleteSelectedRows}>
                <Iconify icon="solar:trash-bin-minimalistic-2-linear" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
      </Collapse> */}

      <Card>
        <Stack>
          <MemberCreateHeader check={false} onCheck={() => {}} />
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
          </ScrollContainer>
        </Stack>

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
                theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
              color: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[400],
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
  )
}
