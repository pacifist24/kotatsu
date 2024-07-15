// 連続再生タブの左側の選択箇所を示すrecoil
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
