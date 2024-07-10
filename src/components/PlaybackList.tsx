'use client';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import { FC } from 'react';
import { useRecoilState } from 'recoil';

type PlaybackItemProps = {
  selected: boolean;
  label: string;
  handleClick: () => void;
};

const PlaybackItem: FC<PlaybackItemProps> = ({ selected, label, handleClick }) => {
  const normalStyle = 'w-full cursor-pointer';
  const selectedStyle = `w-full bg-gray-400 cursor-pointer`;
  const style = selected ? selectedStyle : normalStyle;

  return (
    <div className={style} onClick={handleClick}>
      {label}
    </div>
  );
};

const PlaybackList: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const handleClick = (index: number) => () => {
    if (index === playbackItems.selectedIndex) {
      //既に選択されている項目をクリックされた場合は選択を解除する
      setPlaybackItems({
        ...playbackItems,
        selectedIndex: -1,
      });
    } else {
      setPlaybackItems({
        ...playbackItems,
        selectedIndex: index,
      });
    }
  };
  return (
    <div className="overflow-y-auto w-full h-screen bg-white border rounded-md border-black block">
      {playbackItems.items.length !== 0 &&
        playbackItems.items.map((item, index) => {
          return (
            <PlaybackItem
              selected={playbackItems.selectedIndex === index}
              label={item}
              key={index}
              handleClick={handleClick(index)}
            />
          );
        })}
    </div>
  );
};
export default PlaybackList;
