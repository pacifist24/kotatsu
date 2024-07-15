// 連続再生タブの右側の状態を示すrecoil
import { atom } from 'recoil';

type PlaybackItemsType = {
  nowPlayIndex: number;
  selectedIndex: number;
  items: string[];
};

let defaultValue = [];
if (typeof window !== 'undefined') {
  const serializedArray = localStorage.getItem('playbackItems');
  if (serializedArray != null) {
    defaultValue = JSON.parse(serializedArray);
  }
}

export const PlaybackItemsState = atom<PlaybackItemsType>({
  key: 'playbackItems',
  default: {
    nowPlayIndex: -1,
    selectedIndex: -1,
    items: defaultValue,
  },
});
