'use client';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { useQuotesList, useQuoteStore } from '@/store/store';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Skeleton } from './ui/skeleton';
import { useTickerCardData } from '@/lib/hook';

// type quoteType = Partial<Awaited<ReturnType<typeof getQuote>>>;

export function TickerCard() {
  const { quotes, removeQuotes } = useQuoteStore();
  const { quoteslist, removeQuotesList } = useQuotesList();
  const { isPending, error } = useTickerCardData();

  useEffect(() => {
    console.log('isPending', isPending, 'Error', error, quoteslist.length);
  }, [isPending, error, quoteslist]);

  const handleRemove = useCallback((symbol: string, index: number) => {
    removeQuotes(symbol);
    removeQuotesList(index);
  }, []);

  const LoadingSkleton = () =>
    useMemo(() => {
      return (
        <Card className='flex flex-col space-y-3 p-4 w-min max-w-[20rem] h-min'>
          <Skeleton className='h-14 w-[250px] rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-[250px]' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </Card>
      );
    }, []);

  if (isPending && quoteslist.length === 0) {
    return (
      <div className='flex flex-col gap-2 pt-4'>
        <h2>My WatchList</h2>
        <LoadingSkleton />
      </div>
    );
  }

  if (quotes.length == 0) {
    return (
      <div className='flex flex-col gap-2 pt-4'>
        <h2>My WatchList</h2>
        <h3>Add Symbols to watch by searching</h3>
      </div>
    );
  }

  if (error) return <div>{JSON.stringify(error)}</div>;

  if (quoteslist && quoteslist.length > 0) {
    return (
      <div className='flex flex-col gap-2 pt-4'>
        <h2>My WatchList</h2>
        <div className='flex flex-row gap-2'>
          {quoteslist.map((item, index) => {
            const {
              regularMarketPrice,
              regularMarketChangePercent,
              regularMarketTime,
              displayName,
              shortname,
              symbol,
              bid,
              ask,
            } = item;
            return (
              <Card className='max-w-[20rem] h-min' key={symbol}>
                <CardHeader className='flex flex-row gap-3 justify-between'>
                  <div>
                    <CardTitle>{symbol}</CardTitle>
                    <CardDescription>
                      {displayName ?? shortname}
                    </CardDescription>
                  </div>

                  <Button
                    variant='outline'
                    size='icon'
                    onClick={() => handleRemove(symbol, index)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                </CardHeader>
                <CardContent className='flex flex-col'>
                  <div className='flex flex-row gap-2'>
                    <p>Price: {regularMarketPrice}</p>
                    <p>Change: {Number(regularMarketChangePercent).toFixed(2)} %</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {quotes.length > quoteslist.length &&
            isPending &&
            Array(quotes.length - quoteslist.length)
              .fill(0)
              .map((idx) => <LoadingSkleton key={`skleton-${idx}`} />)}
        </div>
      </div>
    );
  }
}
