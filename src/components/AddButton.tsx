import { AllButtonListSelectedIndexState } from '@/atoms/AllButtonListSelectedIndex';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import IconButton from '@mui/material/IconButton';
import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Data from '../../public/button_list.json';

const AddButton: FC = () => {
  const allButtonListSelectedIndex = useRecoilValue(AllButtonListSelectedIndexState);
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);

  const onClick = () => {
    if (playbackItems.nowPlayIndex === -1) {
      setPlaybackItems({
        ...playbackItems,
        items: [...playbackItems.items, Data[allButtonListSelectedIndex.selectedIndex].label],
        selectedIndex: playbackItems.items.length,
      });
    }
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </IconButton>
    </>
  );
};

export default AddButton;
