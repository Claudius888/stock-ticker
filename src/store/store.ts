import { quoteYF } from '@/app/search/page';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { QuoteBase } from '../lib/types/types'

interface QuoteList {
  quotes: string[];
  prevQuoteCount: number;
  updateQuotes: (quotes: string) => void;
  removeQuotes: (quotes: string) => void;
}

interface QuoteListInfo<T> {
  quoteslist: T[];
  updateQuotesList: (quotes: T[]) => void; 
  removeQuotesList: (index: number) => void;
}

export const useQuoteStore = create<QuoteList>()((set) => ({
  quotes: [],
  prevQuoteCount: 0,
  updateQuotes: (by) => set((state) => {
    const quotes = [...state.quotes, by]
    return ({ quotes: [...new Set(quotes)] })
  }),
  removeQuotes: (by) => set((state) => ({quotes: state.quotes.filter((item) => item !== by), prevQuoteCount: state.quotes.length})),
}));

export const useQuotesList = create<QuoteListInfo<Partial<typeof QuoteBase>>>()((set) => ({
  quoteslist: [],
  updateQuotesList: (quotes) => set((state) => ({quoteslist: quotes})),
  removeQuotesList: (index) => set((state) => ({quoteslist: state.quoteslist.filter((item, idx) => idx !== index)}))
}))
