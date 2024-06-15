import { create } from 'zustand'

interface CounterState {
  count: boolean;
  increment: () => void;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: false,
  increment: () => set((state) => ({ count: !state.count })),
}));
