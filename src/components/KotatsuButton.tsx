import { Howl } from 'howler';
import { FC } from 'react';

type Props = {
  text: string;
  filename: string;
  handleRightClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const KotatsuButton: FC<Props> = ({ text, filename, handleRightClick }) => {
  const handlePlay = () => {
    const sound = new Howl({
      src: ['audio/' + filename],
    });
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
        {text}
      </button>
    </>
  );
};

export default KotatsuButton;
