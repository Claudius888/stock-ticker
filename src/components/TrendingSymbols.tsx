'use client';
import { getTrendingSymbols } from '@/app/server/action';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Badge } from './ui/badge';

export function TrendingSymbols() {
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
      <>
        <h1>Trending Symbols</h1>
        {quotes.map((item) => {
          return (
            <Badge key={`item-${item.symbol}`}>
              <p>{item.symbol}</p>
            </Badge>
          );
        })}
      </>
    );
  }
}
