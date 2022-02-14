let numOfSound = 0;
const audioPlayer = new Audio() as HTMLAudioElement;

const nextSound = (playList: string[]) => {
  if (numOfSound < 2) {
    numOfSound += 1;
    audioPlayer.src = playList[numOfSound];
    audioPlayer.play();
  }
};

export const playAudio = (
  audio: string,
  audioMeaning: string,
  audioExample: string
) => {
  numOfSound = 0;
  const playList: string[] = [audio, audioMeaning, audioExample];
  audioPlayer.src = playList[numOfSound];
  audioPlayer.play();
  audioPlayer.onended = () => nextSound(playList);
};
