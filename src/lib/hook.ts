import { getQuote } from '@/app/server/action';
import { useQuotesList, useQuoteStore } from '@/store/store';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

export const useTickerCardData = () => {
  const { quotes, prevQuoteCount } = useQuoteStore();
  const { updateQuotesList } = useQuotesList();

  const {
    data,
    isPending,
    error,
    mutate: server_getquote,
  } = useMutation({
    mutationKey: ['quote', quotes],
    mutationFn: async () => {
      const res = await getQuote({ ticker: quotes });
      console.log(res);
      return res;
    },
  });

  useEffect(() => {
    if (quotes.length > 0) {
      if (quotes.length >= prevQuoteCount) server_getquote();
    }
  }, [quotes]);

  useEffect(() => {
    if (error) {
        console.log("ERROR OCCURED",error)
    } else if(data && data.length > 0) {
      updateQuotesList(data);
    }
  }, [data, error]);

  return { error, isPending };
};
