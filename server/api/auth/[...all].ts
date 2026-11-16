import { toWebRequest } from 'h3'
import { getAuth } from '../../utils/auth'

export default defineEventHandler((event) => {
  return getAuth().handler(toWebRequest(event))
})
