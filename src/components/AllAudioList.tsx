'use client';
import { AllButtonListSelectedIndexState } from '@/atoms/AllButtonListSelectedIndex';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import { Howl } from 'howler';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import Data from '../../public/button_list.json';

type AudioItemProps = {
  selected: boolean;
  label: string;
  handleClick: () => void;
  handleDoubleClick: () => void;
};

let clickCount = 0;
const AudioItem: FC<AudioItemProps> = ({ selected, label, handleClick, handleDoubleClick }) => {
  const onClick = () => {
    clickCount++;
    handleClick();
    if (clickCount == 1) {
      const sound = new Howl({
        src: ['audio/' + label + '.mp3'],
      });
      sound.play();
    }
    setTimeout(() => {
      clickCount = 0;
    }, 200);
  };

  const onDoubleClick = () => {
    handleDoubleClick();
  };

  const normalStyle = 'w-full cursor-pointer py-0.5 px-1';
  const selectedStyle = `w-full py-0.5 px-1 bg-gray-500 text-white cursor-pointer`;
  const style = selected ? selectedStyle : normalStyle;

  return (
    <div className={style} onClick={onClick} onDoubleClick={onDoubleClick}>
      {label}
    </div>
  );
};

const AllAudioList: FC = () => {
  const [allButtonListSelectedIndex, setAllButtonListSelectedIndex] = useRecoilState(
    AllButtonListSelectedIndexState
  );
  const handleClick = (index: number) => () => {
    setAllButtonListSelectedIndex({
      ...allButtonListSelectedIndex,
      selectedIndex: index,
    });
  };

  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);

  const handleDoubleClick = () => {
    if (playbackItems.nowPlayIndex === -1) {
      setPlaybackItems({
        ...playbackItems,
        items: [...playbackItems.items, Data[allButtonListSelectedIndex.selectedIndex].label],
        selectedIndex: playbackItems.items.length,
      });
    }
  };

  return (
    <div className="overflow-y-auto w-full h-full bg-white border rounded-md border-black block">
      {Data.map((item, index) => {
        return (
          <AudioItem
            selected={allButtonListSelectedIndex.selectedIndex === index}
            label={item.label}
            key={item.label}
            handleClick={handleClick(index)}
            handleDoubleClick={handleDoubleClick}
          />
        );
      })}
    </div>
  );
};
export default AllAudioList;
