'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Badge } from './ui/badge';
import { useQuery } from '@tanstack/react-query';
import { getSearchDetails } from '@/app/server/action';
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { quoteYF } from '@/app/search/page';
import { useQuoteStore } from '@/store/store';
const NEWS_HEADER = [
  'Title',
  'Related Tickers',
  'Publisher',
  'Link',
  'Published ago',
];
const QUOTES_HEADER = [
  'Company',
  'Symbol',
  'Exchange',
  'Industry',
  'Sector',
  'Quote Type',
];

const NEWS = 'news';
const QUOTES = 'quotes';

function SearchQuotesBody({ item }: { item: quoteYF }) {
    const { updateQuotes } = useQuoteStore()
  const {
    isYahooFinance,
    symbol,
    quoteType,
    exchDisp,
    industry,
    sector,
    shortname
  } = item;
  return (
    <TableRow>
      <TableCell className='font-medium'>{shortname}</TableCell>
      <TableCell>{symbol}</TableCell>
      <TableCell>{exchDisp}</TableCell>
      <TableCell>{industry}</TableCell>
      <TableCell>{sector}</TableCell>
      <TableCell className='hidden md:table-cell'>{quoteType}</TableCell>
      {isYahooFinance && (
        <TableCell className='hidden md:table-cell cursor-pointer' onClick={() => symbol && updateQuotes(symbol)}>
          <div>View more</div>
        </TableCell>
      )}
    </TableRow>
  );
}

export default function SearchItems({ query }: { query: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      const res = await getSearchDetails(query);
      console.log(res);
      return res;
    },
  });

  useEffect(() => {
    console.log(
      'SEARCH ITEMS::::',
      'isPending',
      isPending,
      'Data',
      data,
      'Error',
      error
    );
  }, [data, isPending, error]);

  if (isPending) return <div>Loading....</div>;

  if (error) return <div>{JSON.stringify(error)}</div>;

  const { count, news, quotes } = data;

  const clean_quotes = quotes.filter((item) => item.isYahooFinance);
  const { updateQuotes } = useQuoteStore()

  function SearchCardBody({
    item,
  }: {
    item: (typeof news)[0];
  }) {
    const {
      thumbnail,
      providerPublishTime,
      publisher,
      title,
      relatedTickers,
      link,
    } = item;
    return (
      <TableRow>
        {thumbnail && thumbnail?.resolutions.length > 1 ? (
          <TableCell className='hidden sm:table-cell'>
            <Image
              alt='Product image'
              className='rounded-md object-contain'
              height='64'
              src={thumbnail.resolutions[1].url}
              width='64'
            />
          </TableCell>
        ) : (
          <TableCell className='' />
        )}
        <TableCell className='font-medium'>{title}</TableCell>
        <TableCell>
          {relatedTickers?.map((item, idx) => (
            <Badge variant='outline' className='cursor-pointer' key={`tickers-${item}-${idx}`} onClick={() => updateQuotes(item)}>
              {item}
            </Badge>
          ))}
        </TableCell>
        <TableCell>{publisher}</TableCell>
        <TableCell className='hidden md:table-cell'>
          <Link href={link} target='_blank'>
            View more
          </Link>
        </TableCell>
        <TableCell className='hidden md:table-cell'>
          {Math.floor(providerPublishTime.getTimezoneOffset() / 60)} hours ago
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      <Tabs defaultValue={NEWS} className='pt-3 px-2'>
        <Card x-chunk='dashboard-06-chunk-0' className='pt-3'>
          <CardContent>
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value={NEWS}>News</TabsTrigger>
              <TabsTrigger value={QUOTES}>Quotes</TabsTrigger>
            </TabsList>
            <TabsContent value={NEWS}>
              {news.length > 1 && (
                <>
                  <CardHeader>
                    <CardTitle>News</CardTitle>
                    <CardDescription>
                      Latest News about the {query}.
                    </CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className='hidden w-[100px] sm:table-cell'>
                          <span className='sr-only'>Image</span>
                        </TableHead>
                        {NEWS_HEADER.map((item) => (
                          <TableHead key={item}>{item}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {news.map((item: (typeof news)[0], idx) => {
                        return (
                          <SearchCardBody
                            item={item}
                            key={`item-${item.uuid}-${idx}`}
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </>
              )}
            </TabsContent>
            <TabsContent value={QUOTES}>
              {clean_quotes.length > 1 && (
                <>
                  <CardHeader>
                    <CardTitle>Tickers</CardTitle>
                    <CardDescription>
                      Results of {query} based Symbols
                    </CardDescription>
                  </CardHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {QUOTES_HEADER.map((item) => (
                          <TableHead key={item}>{item}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clean_quotes.map((item) => (
                        <SearchQuotesBody item={item} key={item.symbol} />
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </>
  );
}
