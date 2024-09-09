import ListManager from '@/sections/payment-list/list-manager'
// import ListCompany from '@/sections/payment-list/list-company'

// export default function PaymentListView({ role }: { role: string }) {
//   return (
//     <>
//       {role === 'manager' && <ListManager />}
//       {role === 'company' && <ListCompany />}
//     </>
//   )
// }

export default function PaymentListView() {
  return <ListManager />
}
