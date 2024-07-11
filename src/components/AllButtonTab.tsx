'use client';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import KotatsuButton from '@/components/KotatsuButton';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import Data from '../../public/button_list.json';

const AllButtonTab: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);

  const handleAddToPlaylist = (item: string) => () => {
    if (playbackItems.nowPlayIndex === -1) {
      setPlaybackItems({
        ...playbackItems,
        items: [...playbackItems.items, item],
        selectedIndex: playbackItems.items.length,
      });
    }
  };
  return (
    <div className="flex flex-wrap">
      {Data.map((item) => {
        return (
          <div className="mr-2 mb-2" key={item.label}>
            <KotatsuButton
              text={item.label}
              filename={item.label + '.mp3'}
              handleAddToPlaylist={handleAddToPlaylist(item.label)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AllButtonTab;
