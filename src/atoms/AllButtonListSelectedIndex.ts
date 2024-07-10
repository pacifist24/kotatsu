import { atom } from 'recoil';

type AllButtonListSelectedIndexType = {
  selectedIndex: number;
};

export const AllButtonListSelectedIndexState = atom<AllButtonListSelectedIndexType>({
  key: 'allButtonListSelectedIndex',
  default: {
    selectedIndex: 0,
  },
});
