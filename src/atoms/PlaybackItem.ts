import { atom } from 'recoil';

type PlaybackItemsType = {
  selectedIndex: number;
  items: string[];
};

export const PlaybackItemsState = atom<PlaybackItemsType>({
  key: 'playbackItems',
  default: {
    selectedIndex: 1,
    items: ['1', '2', '3'],
  },
});
