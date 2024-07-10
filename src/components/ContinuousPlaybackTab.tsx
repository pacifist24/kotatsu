'use client';
import AddButton from '@/components/AddButton';
import AllAudioList from '@/components/AllAudioList';
import OperationBar from '@/components/OperationBar';
import PlaybackList from '@/components/PlaybackList';
import { FC } from 'react';

const ContinuousPlaybackTab: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <AllAudioList />
      </div>
      <div className="w-1/12 h-screen flex items-center justify-center">
        <AddButton />
      </div>
      <div className="w-1/3">
        <PlaybackList />
      </div>
      <div className="w-1/12 h-screen">
        <OperationBar />
      </div>
    </div>
  );
};

export default ContinuousPlaybackTab;
