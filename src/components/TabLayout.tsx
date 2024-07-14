import { parseQueryParam } from '@/app/output';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import AllButtonTab from '@/components/ButtonTab';
import ContinuousPlaybackTab from '@/components/ContinuousPlaybackTab';
import ListByUseTab from '@/components/ListByUseTab';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className=""
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

let ignore = false;
const TableLayout = () => {
  const searchParams = useSearchParams();
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOverwritePlaylist = () => {
    const playListStr = searchParams.get('v');
    if (playListStr != null) {
      const paramPlayList = parseQueryParam(playListStr);
      localStorage.setItem('playbackItems', JSON.stringify(paramPlayList));
      setPlaybackItems({
        ...playbackItems,
        items: [...paramPlayList],
        selectedIndex: -1,
      });
    }
    setOpen(false);
  };
  useEffect(() => {
    if (!ignore) {
      ignore = true;
      const playListStr = searchParams.get('v');
      if (playListStr != null) {
        const paramPlayList = parseQueryParam(playListStr);
        if (paramPlayList.length > 0) {
          setOpen(true);
        }
      }
    }
  }, [playbackItems, searchParams, setPlaybackItems]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="全一覧" {...a11yProps(0)} />
            <Tab label="会話用途別一覧" {...a11yProps(1)} />
            <Tab label="連続再生" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <AllButtonTab byUse="" />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ListByUseTab />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ContinuousPlaybackTab />
        </CustomTabPanel>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            URLに再生リストが指定されました。 再生リストに上書きしてよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOverwritePlaylist}>OK</Button>
          <Button onClick={handleClose}>キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableLayout;
