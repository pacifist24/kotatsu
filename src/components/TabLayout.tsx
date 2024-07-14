import AllButtonTab from '@/components/ButtonTab';
import ContinuousPlaybackTab from '@/components/ContinuousPlaybackTab';
import ListByUseTab from '@/components/ListByUseTab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React from 'react';

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

const TableLayout = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
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
  );
};

export default TableLayout;
