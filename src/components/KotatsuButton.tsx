'use client';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FC, useRef, useState } from 'react';

type Props = {
  text: string;
  filename: string;
};

const KotatsuButton: FC<Props> = ({ text, filename }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const handlePlay = () => {
    audioRef.current?.play();
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
  return (
    <>
      <Button variant="outlined" onClick={handlePlay} onContextMenu={onRightClick}>
        {text}
      </Button>
      <audio ref={audioRef}>
        <source src={'audio/' + filename} type="audio/mpeg" />
      </audio>
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
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default KotatsuButton;
