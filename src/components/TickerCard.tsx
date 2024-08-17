'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useGetQuote } from '@/app/server/getQuote';
import { useSearchParams } from 'next/navigation';
import yahooFinance from 'yahoo-finance2';
import { getQuote } from '@/app/server/action';

type quoteType = Partial<Awaited<ReturnType<typeof getQuote>>>

export function TickerCard({ticker}: {ticker: string}) {
//   const searchParams = useSearchParams();
//   const search = searchParams.get('ticker');
// useGetQuote({ ticker: 'AAPL' });

  const { data, isPending, error } = useQuery({
    queryKey: ['quote'],
    queryFn: async() => {
        const res = await getQuote({ticker: 'AAPL'})
        console.log(res)
        return res
    },
  });

  useEffect(() => {
    console.log("isPending", isPending,"Data", data, "Error", error)
  }, [data, isPending, error])

  if (isPending) return <div>Loading....</div>;

  if(error) return <div>{JSON.stringify(error)}</div>

  if (data) {
    const {
      regularMarketPrice,
      regularMarketTime,
      displayName,
      symbol,
      bid,
      ask,
    } = data;

    return (
      <Card className='max-w-[5rem]'>
        <CardHeader>
          <CardTitle>{displayName}</CardTitle>
          <CardDescription>{symbol}</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-row'>
          <p>bid: {bid}</p>
          <p>ask: {ask}</p>
        </CardContent>
      </Card>
    );
  }
}
