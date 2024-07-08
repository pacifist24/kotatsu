'use client';
import KotatsuButton from '@/components/KotatsuButton';
import { FC } from 'react';
import Data from '../../public/button_list.json';

const AllButtonTab: FC = () => {
  return (
    <div className="flex flex-wrap">
      {Data.map((item) => {
        return (
          <div className="mr-2 mb-2" key={item.label}>
            <KotatsuButton text={item.label} filename={item.label + '.mp3'} />
          </div>
        );
      })}
    </div>
  );
};

export default AllButtonTab;
