import { atom } from 'recoil';

type PlaybackItemsType = {
  nowPlayIndex: number;
  selectedIndex: number;
  items: string[];
};

export const PlaybackItemsState = atom<PlaybackItemsType>({
  key: 'playbackItems',
  default: {
    nowPlayIndex: -1,
    selectedIndex: -1,
    items: [],
  },
});
