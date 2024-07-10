'use client';
import { AllButtonListSelectedIndexState } from '@/atoms/AllButtonListSelectedIndex';
import { FC, useRef } from 'react';
import { useRecoilState } from 'recoil';
import Data from '../../public/button_list.json';

type AudioItemProps = {
  selected: boolean;
  label: string;
  handleClick: () => void;
};

const AudioItem: FC<AudioItemProps> = ({ selected, label, handleClick }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const onClick = () => {
    handleClick();
    audioRef.current?.play();
  };
  const normalStyle = 'w-full cursor-pointer';
  const selectedStyle = `w-full bg-gray-400 cursor-pointer`;
  const style = selected ? selectedStyle : normalStyle;

  return (
    <div className={style} onClick={onClick}>
      {label}
      <audio ref={audioRef}>
        <source src={'audio/' + label + '.mp3'} type="audio/mpeg" />
      </audio>
    </div>
  );
};

const AllAudioList: FC = () => {
  const [allButtonListSelectedIndex, setAllButtonListSelectedIndex] = useRecoilState(
    AllButtonListSelectedIndexState
  );
  const handleClick = (index: number) => () => {
    // if (index === allButtonListSelectedIndex.selectedIndex) {
    //   //既に選択されている項目をクリックされた場合は選択を解除する
    //   setAllButtonListSelectedIndex({
    //     ...allButtonListSelectedIndex,
    //     selectedIndex: -1,
    //   });
    // } else {
    //   setAllButtonListSelectedIndex({
    //     ...allButtonListSelectedIndex,
    //     selectedIndex: index,
    //   });
    // }
    setAllButtonListSelectedIndex({
      ...allButtonListSelectedIndex,
      selectedIndex: index,
    });
  };
  return (
    <div className="overflow-y-auto w-full h-screen bg-white border rounded-md border-black block">
      {Data.map((item, index) => {
        return (
          <AudioItem
            selected={allButtonListSelectedIndex.selectedIndex === index}
            label={item.label}
            key={item.label}
            handleClick={handleClick(index)}
          />
        );
      })}
    </div>
  );
};
export default AllAudioList;
