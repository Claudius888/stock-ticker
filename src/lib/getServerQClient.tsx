import { QueryClient } from '@tanstack/query-core'
import { cache } from 'react'

export const getServerQueryClient = cache(() => new QueryClient())