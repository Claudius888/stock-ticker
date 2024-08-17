'use server';

import { NextRequest, NextResponse } from 'next/server';
// export const dynamic = 'force-dynamic';
import yahooFinance from 'yahoo-finance2';

// type QuoteType = typeof import('yahoo-finance2/dist/esm/src/modules/quote.d.ts')

export async function getQuote({ ticker }: { ticker: string }) {
  //   const body = await req.json();
  // const searchParams = req.nextUrl.searchParams.get('ticker');
  console.log('I was here...', ticker);
    if (ticker) {
      const posts = await yahooFinance.quote(ticker);
    //   return NextResponse.json({data: posts as keyof posts});
    return posts as typeof posts
    } else {
      return NextResponse.json({ error: 'Something went wrong ❣️' });
    }
}

export async function getTrendingSymbols({ count = 5 }: { count?: number }) {
    const queryOptions = { count: count, lang: 'en-US' };
    const result = await yahooFinance.trendingSymbols('US', queryOptions);
    return result as typeof result
}

export async function getSearchDetails(params:string) {
    const result = await yahooFinance.search(params)
    return result
}