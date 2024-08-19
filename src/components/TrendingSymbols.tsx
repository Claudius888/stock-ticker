'use client';
import { getTrendingSymbols } from '@/app/server/action';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Badge } from './ui/badge';
import { useQuoteStore } from '@/store/store';

export function TrendingSymbols() {
  const {updateQuotes} = useQuoteStore()
  const { data, isPending, error } = useQuery({
    queryKey: ['trending-symbol'],
    queryFn: async () => {
      const res = await getTrendingSymbols({ count: 5 });
      console.log(res);
      return res;
    },
  });

  if (isPending) return <div>Loading....</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (data) {
    const { quotes } = data;

    return (
      <div className='flex flex-col'>
        <h1 className='text-lg text-white font-bold'>Trending Symbols</h1>
        <div className='flex flex-row gap-2'>
        {quotes.map((item) => {
          return (
            <Badge key={`item-${item.symbol}`} onClick={() => updateQuotes(item.symbol)}>
              {item.symbol}
            </Badge>
          );
        })}
        </div>
      </div>
    );
  }
}
