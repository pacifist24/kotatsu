'use client';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import KotatsuButton from '@/components/KotatsuButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import Data from '../../public/button_list.json';

const AllButtonTab: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedButton, setSelectedButton] = useState<string>('');
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenManu = (label: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedButton(label);
    setAnchorEl(event.currentTarget);
  };

  const handleClickAddToPlaylist = () => {
    if (playbackItems.nowPlayIndex === -1) {
      localStorage.setItem(
        'playbackItems',
        JSON.stringify([...playbackItems.items, selectedButton])
      );
      setPlaybackItems({
        ...playbackItems,
        items: [...playbackItems.items, selectedButton],
        selectedIndex: playbackItems.items.length,
      });
    }
    handleClose();
  };

  return (
    <div className="flex flex-wrap">
      {Data.map((item) => {
        return (
          <div className="mr-2 mb-2" key={item.label}>
            <KotatsuButton label={item.label} handleRightClick={handleOpenManu(item.label)} />
          </div>
        );
      })}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClickAddToPlaylist}>連続再生リストに追加</MenuItem>
      </Menu>
    </div>
  );
};

export default AllButtonTab;
