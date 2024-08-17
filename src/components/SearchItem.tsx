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

  function SearchCardBody({
    item,
    type,
  }: {
    item: (typeof news)[0];
    type: 'news' | 'count' | 'quotes';
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
        )
          :(
          <TableCell className='' />
        )}
        <TableCell className='font-medium'>{title}</TableCell>
        <TableCell>
          {relatedTickers?.map((item, idx) => (
            <Badge variant='outline' key={`tickers-${item}-${idx}`}>
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
          {JSON.stringify(providerPublishTime)}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card x-chunk='dashboard-06-chunk-0'>
      <CardContent>
        {news.length > 1 && (
          <>
            <CardHeader>
              <CardTitle>News</CardTitle>
              <CardDescription>Latest News about the {query}.</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='hidden w-[100px] sm:table-cell'>
                    <span className='sr-only'>Image</span>
                  </TableHead>
                  {Object.keys(news[0]).map((item) => (
                    <TableHead key={item}>{item}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {news.map((item: (typeof news)[0], idx) => {
                  return (
                    <SearchCardBody
                      item={item}
                      type='news'
                      key={`item-${item.uuid}-${idx}`}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  );
}
