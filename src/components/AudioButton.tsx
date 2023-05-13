import React, { useRef } from 'react';

interface AudioButtonProps {
  id: number
  active: boolean
  sound: string,
  onClick: (id: number) => void
}

const AudioButton: React.FC<AudioButtonProps> = ({ id, active, sound, onClick }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleButtonClick = () => {
    console.log('Me ejecute al invocar click', id)
    const audio = audioRef.current;
    if (audio) {
      audio.play();
    }
    onClick(id)
  };

  return (
    <React.Fragment>
      <button
        id={`btn-${id}`}
        className={`game-btn ${id} ${active ? "active" : ""}`}
        onClick={handleButtonClick}
      />
      <audio 
        ref={audioRef} 
        src={sound} 
      />
    </React.Fragment>
  );
};

export default AudioButton;
