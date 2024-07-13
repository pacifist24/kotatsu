import ButtonTab from '@/components/ButtonTab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React from 'react';
// import Data from '../../public/button_list.json';

// const uniqueClassNames = [new Set(Data.map((item) => item.className))];
// console.log(uniqueClassNames);
const tabNames = [
  'あいさつ',
  '肯定',
  '否定',
  '返事、リアクション',
  'ツッコミ',
  '問いかけ、呼びかけ',
  '掛け声',
  '恫喝、罵倒、煽り',
  'お礼',
  '謝罪',
  '命令',
  '笑い',
  '応援、褒め',
  '慰める',
  '効果音、悲鳴、技',
  '泣、弱',
  '食べ物',
  'その他',
];

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const ListByUseTab = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex">
      <div>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          {tabNames.map((item, index) => (
            <Tab label={item} {...a11yProps(index)} key={item} />
          ))}
        </Tabs>
      </div>
      {tabNames.map((item, index) => (
        <TabPanel value={value} index={index} key={item}>
          <ButtonTab byUse={item} />
        </TabPanel>
      ))}
    </div>
  );
};
export default ListByUseTab;
