'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { cache, useState } from 'react';
import { getQueryClient } from './getQueryClient';

// const cacheQueryClient = cache(() => getQueryClient())
export default function Providers({ children }) {
  // const [queryClient] = useState(() => new QueryClient());
  const queryClient = getQueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
