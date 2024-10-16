import { isNumeric } from '@e201/utils'
import { useParams } from 'react-router-dom'

export default function useParamId() {
  const { id } = useParams<{ id: string }>()

  if (id === null || id === undefined) {
    return null
  }
  if (!isNumeric(id)) {
    return null
  }
  return parseInt(id)
}
