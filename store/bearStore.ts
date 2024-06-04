/**
 * zustand 예시
 * by https://velog.io/@sumi-0011/zustand-tip-and-code
 */

// import { create } from "zustand";
//
// const useBearStore = create((set) => ({
//   bears: 0,
//   fish: 0,
//   actions: {
//     increasePopulation: (by) => set((state) => ({ bears: state.bears + by })),
//     eatFish: () => set((state) => ({ fish: state.fish - 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//   },
// }));
//
// export const useBears = () => useBearStore((state) => state.bears);
// export const useFish = () => useBearStore((state) => state.fish);
//
// export const useBearAction = () => useBearStore((state) => state.actions);
