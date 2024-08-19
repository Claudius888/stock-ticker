import { TickerCard } from '@/components/TickerCard';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQuote, getTrendingSymbols } from './server/action';
import { SearchBar } from '@/components/Search';
import { TrendingSymbols } from '@/components/TrendingSymbols';
import { getServerQueryClient } from '@/lib/getServerQClient';

export default async function HeroPage() {
  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['trending-symbol'],
    queryFn: async () => await getTrendingSymbols({ count: 5 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className='w-full h-full p-10 bg-blue-900'>
        <div className='flex flex-row justify-between'>
          <TrendingSymbols />
          <SearchBar />
        </div>
        <TickerCard />
      </main>
    </HydrationBoundary>
  );
}
