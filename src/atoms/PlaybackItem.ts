import { atom } from 'recoil';

type PlaybackItemsType = {
  nowPlayIndex: number;
  selectedIndex: number;
  items: string[];
};

const serializedArray = localStorage.getItem('playbackItems');
let defaultValue = [];
if (serializedArray != null) {
  defaultValue = JSON.parse(serializedArray);
}

export const PlaybackItemsState = atom<PlaybackItemsType>({
  key: 'playbackItems',
  default: {
    nowPlayIndex: -1,
    selectedIndex: -1,
    items: defaultValue,
  },
});
