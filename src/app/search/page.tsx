import { dehydrate, HydrationBoundary, useQuery } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { getSearchDetails } from '../server/action';
import { getQueryClient } from '@/lib/getQueryClient';
import SearchItems from '@/components/SearchItem';
import { getServerQueryClient } from '@/lib/getServerQClient';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export type quoteYF = {
  exchange?: string;
  shortname?: string;
  quoteType?: string;
  symbol?: string;
  index: string;
  score?: number;
  typeDisp?: string;
  longname?: string;
  isYahooFinance: true;
  // index: '5167b830a941ed08d275f74473d13e91',
  name?: string;
  permalink?: string;
  dispSecIndFlag?: boolean;
  exchDisp?: string;
  industry?: string;
  industryDisp?: string;
  sector?: string;
  sectorDisp?: string;
};

const Page = async ({ searchParams }: PageProps) => {
  const query = searchParams.query;

  if (Array.isArray(query) || !query) {
    return redirect('/');
  }

  const queryClient = getServerQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['search', query],
    queryFn: async () => await getSearchDetails(query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SearchItems query={query} />
    </HydrationBoundary>
  );
};

export default Page;
