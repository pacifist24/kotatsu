// 連続再生のタブ
import AddButton from '@/components/AddButton';
import AllAudioList from '@/components/AllAudioList';
import OperationBar from '@/components/OperationBar';
import PlaybackList from '@/components/PlaybackList';
import PlayButton from '@/components/PlayButton';
import { FC } from 'react';

const ContinuousPlaybackTab: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex h-2/3">
        <div className="w-5/12">
          <AllAudioList />
        </div>
        <div className="w-1/12 flex items-center justify-center">
          <AddButton />
        </div>
        <div className="w-5/12">
          <PlaybackList />
        </div>
        <div className="w-1/12 flex items-center justify-center">
          <OperationBar />
        </div>
      </div>
      <div>
        <PlayButton />
      </div>
    </div>
  );
};

export default ContinuousPlaybackTab;
