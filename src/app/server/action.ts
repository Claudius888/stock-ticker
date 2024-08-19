'use server';

import { NextRequest, NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function getQuote({ ticker }: { ticker: string[] }) {
  console.log('I was here...', ticker);
  // if (ticker.length > 1) {
  // try{
    const posts = await yahooFinance.quote(ticker);
    console.log('QUERy ARRAY', posts);
    return posts
    // return NextResponse.json({  },{ status: 200 })
  // } catch(e) {
  //   return NextResponse.json({ error: e },{ status: 500 });
  // }
  // }
  // else if(ticker) {
  //   const posts = await yahooFinance.quote(ticker);
  //   return posts
  // }
}

export async function getTrendingSymbols({ count = 5 }: { count?: number }) {
  const queryOptions = { count: count, lang: 'en-US' };
  const result = await yahooFinance.trendingSymbols('US', queryOptions);
  return result as typeof result;
}

export async function getSearchDetails(params: string) {
  const result = await yahooFinance.search(params);
  return result;
}
