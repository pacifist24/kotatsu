// 連続再生タブ下側の再生（停止）ボタン
import { makeAudioPlayer } from '@/app/playAudio';
import { PlaybackItemsState } from '@/atoms/PlaybackItem';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
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
      sound = makeAudioPlayer(playbackItems.items[index], playsound(index + 1));
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
      <div className="ml-4">
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={loopPlayChecked} onChange={onChange} />}
            label="ループ再生"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default PlayButton;
