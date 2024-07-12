import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Howl } from 'howler';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';

let sound: Howl | null = null;

const PlayButton: FC = () => {
  const [playbackItems, setPlaybackItems] = useRecoilState(PlaybackItemsState);
  const [loopPlayChecked, setLoopPlayChecked] = useState(false);

  const playsound = (index: number) => () => {
    if (index < playbackItems.items.length) {
      setPlaybackItems({
        ...playbackItems,
        nowPlayIndex: index,
      });
      sound = new Howl({
        src: ['audio/' + playbackItems.items[index] + '.mp3'],
        onend: playsound(index + 1),
      });
      sound.play();
    } else if (loopPlayChecked) {
      playsound(0)();
    } else {
      setPlaybackItems({
        ...playbackItems,
        nowPlayIndex: -1,
      });
    }
  };
  const onClick = () => {
    playsound(0)();
  };
  const onChange = () => {
    if (sound != null) {
      sound.stop();
    }
    setLoopPlayChecked((checked) => !checked);
    setPlaybackItems({
      ...playbackItems,
      nowPlayIndex: -1,
    });
  };
  const onStop = () => {
    if (sound != null) {
      sound.stop();
    }
    setPlaybackItems({
      ...playbackItems,
      nowPlayIndex: -1,
    });
  };

  return (
    <div className="w-full flex justify-center mt-3">
      {playbackItems.nowPlayIndex == -1 && (
        <Button onClick={onClick} variant="outlined" style={{ width: '30%' }}>
          再生
        </Button>
      )}
      {playbackItems.nowPlayIndex != -1 && (
        <Button onClick={onStop} variant="outlined" style={{ width: '30%' }}>
          停止
        </Button>
      )}
      <div className="text-sm">
        <Checkbox checked={loopPlayChecked} onChange={onChange} />
        ループ再生
      </div>
    </div>
  );
};

export default PlayButton;
