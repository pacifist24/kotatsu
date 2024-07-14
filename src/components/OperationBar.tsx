import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import { Button } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import IconButton from '@mui/material/IconButton';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';

const MoveUpButton: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const onClick = () => {
    if (playbackItems.selectedIndex > 0 && playbackItems.nowPlayIndex === -1) {
      const temp = playbackItems.items[playbackItems.selectedIndex];
      const tempArr = [...playbackItems.items];
      tempArr[playbackItems.selectedIndex] = tempArr[playbackItems.selectedIndex - 1];
      tempArr[playbackItems.selectedIndex - 1] = temp;
      localStorage.setItem('playbackItems', JSON.stringify(tempArr));
      setPlaybackItems({
        ...playbackItems,
        items: tempArr,
        selectedIndex: playbackItems.selectedIndex - 1,
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
          />
        </svg>
      </IconButton>
    </>
  );
};

const MoveDownButton: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const onClick = () => {
    if (
      playbackItems.selectedIndex >= 0 &&
      playbackItems.selectedIndex != playbackItems.items.length - 1 &&
      playbackItems.nowPlayIndex === -1
    ) {
      const temp = playbackItems.items[playbackItems.selectedIndex];
      const tempArr = [...playbackItems.items];
      tempArr[playbackItems.selectedIndex] = tempArr[playbackItems.selectedIndex + 1];
      tempArr[playbackItems.selectedIndex + 1] = temp;
      localStorage.setItem('playbackItems', JSON.stringify(tempArr));
      setPlaybackItems({
        ...playbackItems,
        items: tempArr,
        selectedIndex: playbackItems.selectedIndex + 1,
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </IconButton>
    </>
  );
};

const TrashButton: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const onClick = () => {
    if (playbackItems.selectedIndex >= 0 && playbackItems.nowPlayIndex === -1) {
      const tempArr = [...playbackItems.items];
      tempArr.splice(playbackItems.selectedIndex, 1);
      localStorage.setItem('playbackItems', JSON.stringify(tempArr));
      setPlaybackItems({
        ...playbackItems,
        items: tempArr,
        selectedIndex: -1,
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </IconButton>
    </>
  );
};

const AllClearButton: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAllClear = () => {
    if (playbackItems.nowPlayIndex === -1) {
      localStorage.setItem('playbackItems', JSON.stringify([]));
      setPlaybackItems({
        ...playbackItems,
        items: [],
        selectedIndex: -1,
      });
    }
    setOpen(false);
  };
  return (
    <>
      <IconButton aria-label="delete" onClick={handleClickOpen}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            連続再生リストを削除してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAllClear}>OK</Button>
          <Button onClick={handleClose} autoFocus>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const OperationBar: FC = () => {
  return (
    <div className=" flex items-center justify-center h-screen flex-col">
      <div className="mb-3">
        <MoveUpButton />
      </div>
      <div className="mb-3">
        <MoveDownButton />
      </div>
      <div className="mb-3">
        <TrashButton />
      </div>
      <div className="mb-3">
        <AllClearButton />
      </div>
    </div>
  );
};

export default OperationBar;
