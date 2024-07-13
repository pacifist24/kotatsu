import { Howl } from 'howler';
import Data from '../../public/button_list.json';

const label2VolumeMap: { [key: string]: number } = {};
Data.forEach((btn_info) => {
  label2VolumeMap[btn_info['label']] = Number(btn_info['volume']);
});

export const makeAudioPlayer = (label: string, handleOnend = () => {}) => {
  const sound = new Howl({
    src: ['audio/' + label + '.mp3'],
    volume: label2VolumeMap[label],
    onend: handleOnend,
  });
  return sound;
};
