interface IQrPayment {
  employeeId: string
  qrId: string
}

interface IQrUuid {
  validationId: string
}

export type { IQrUuid, IQrPayment }
