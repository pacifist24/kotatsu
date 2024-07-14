import { makeAudioPlayer } from '@/app/playAudio';
import { FC } from 'react';

type Props = {
  label: string;
  handleRightClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const UiButton: FC<Props> = ({ label, handleRightClick }) => {
  const handlePlay = () => {
    const sound = makeAudioPlayer(label);
    sound.play();
  };
  const onRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleRightClick(event);
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handlePlay}
        onContextMenu={onRightClick}
      >
        {label}
      </button>
    </>
  );
};

export default UiButton;
