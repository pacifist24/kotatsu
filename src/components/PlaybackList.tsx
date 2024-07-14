import { makeAudioPlayer } from '@/app/playAudio';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import { FC } from 'react';
import { useRecoilState } from 'recoil';

type PlaybackItemProps = {
  nowPlaying: boolean;
  selected: boolean;
  label: string;
  handleClick: () => void;
};

const PlaybackItem: FC<PlaybackItemProps> = ({ selected, label, handleClick, nowPlaying }) => {
  const onClick = () => {
    handleClick();
    const sound = makeAudioPlayer(label);
    sound.play();
  };
  const normalStyle = 'w-full cursor-pointer py-0.5 px-1';
  const selectedStyle = `w-full py-0.5 px-1 bg-gray-500 text-white cursor-pointer`;
  const nowPlayingStyle = 'w-full cursor-pointer py-0.5 px-1 bg-orange-200';
  const style = nowPlaying ? nowPlayingStyle : selected ? selectedStyle : normalStyle;

  return (
    <div className={style} onClick={onClick}>
      {label}
    </div>
  );
};

const PlaybackList: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const handleClick = (index: number) => () => {
    if (index === playbackItems.selectedIndex) {
      //既に選択されている項目をクリックされた場合は選択を解除する
      setPlaybackItems({
        ...playbackItems,
        selectedIndex: -1,
      });
    } else {
      setPlaybackItems({
        ...playbackItems,
        selectedIndex: index,
      });
    }
  };
  return (
    <div className="overflow-y-auto w-full h-full bg-white border rounded-md border-black block">
      {playbackItems.items.length !== 0 &&
        playbackItems.items.map((item, index) => {
          return (
            <PlaybackItem
              nowPlaying={playbackItems.nowPlayIndex === index}
              selected={playbackItems.selectedIndex === index}
              label={item}
              key={index}
              handleClick={handleClick(index)}
            />
          );
        })}
    </div>
  );
};
export default PlaybackList;
