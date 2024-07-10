'use client';
import AllAudioList from '@/components/AllAudioList';
import PlaybackList from '@/components/PlaybackList';
import { FC } from 'react';

const ContinuousPlaybackTab: FC = () => {
  return (
    <div className="flex">
      <div className="w-1/3">
        <AllAudioList />
      </div>
      <div className="w-1/3">
        <PlaybackList />
      </div>
    </div>
  );
};

export default ContinuousPlaybackTab;
