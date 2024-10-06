// import type { IPaymentGroup, IPaymentResponse } from '@/types/payment'

// export function grouping(payments: IPaymentResponse[]) {
//   const group = new Map<string, IPaymentGroup>()

//   payments.forEach((payment) => {
//     if (!group.has(payment.paymentId)) {
//       group.set(payment.paymentId, {
//         id: payment.paymentId,
//         companyId: payment.companyId,
//         companyName: payment.companyName,
//         employeeCode: payment.employeeCode,
//         createdAt: payment.createdAt,
//         totalPrice: 0,
//         menus: [],
//       })
//     }
//     const curr = group.get(payment.paymentId)
//     if (curr) {
//       curr.menus.push({ name: payment.menuName, price: payment.menuPrice })
//       curr.totalPrice += payment.menuPrice
//     }
//   })

//   return Array.from(group.values())
// }
