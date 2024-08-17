import { getQueryClient } from '@/lib/getQueryClient';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuote } from './action';
import yahooFinance from 'yahoo-finance2';

export const useGetQuote = ({ ticker }: { ticker: string }) => {
  return useQuery({
    queryKey: ['quote'],
    queryFn: async() => await getQuote({ticker: ticker}),
  });
  
};
