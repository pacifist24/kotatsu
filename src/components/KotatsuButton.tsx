'use client';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Howl } from 'howler';
import { FC, useState } from 'react';

type Props = {
  text: string;
  filename: string;
  handleAddToPlaylist: () => void;
};

const KotatsuButton: FC<Props> = ({ text, filename, handleAddToPlaylist }) => {
  const handlePlay = () => {
    const sound = new Howl({
      src: ['audio/' + filename],
    });
    sound.play();
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onRightClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAddToPlaylist = () => {
    handleAddToPlaylist();
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handlePlay} onContextMenu={onRightClick}>
        {text}
      </Button>

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
    </>
  );
};

export default KotatsuButton;
