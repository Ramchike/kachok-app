import { IS_FULL_TTS, PREPARATION_TIME } from "../config";
import { Exercise } from "../storage/exercise";

class SoundManager {
  private sounds: { [key: string]: HTMLAudioElement } = {};

  constructor() {
    this.preloadSounds();
  }

  private preloadSounds() {
    this.sounds.start = new Audio('/start.wav');
    this.sounds.complete = new Audio('/complete.wav');
  }

  play(soundName: 'start' | 'complete') {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch();
    }
  }
}

export const soundManager = new SoundManager();

class TTSService {
  private synthesis: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
    this.initVoice();
  }

  private initVoice() {
    let voices = this.synthesis.getVoices();
    this.voice = voices.find(voice => voice.lang.startsWith('ru')) ||
                 voices.find(voice => voice.lang.startsWith('en')) ||
                 voices[0];

    if (voices.length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', () => {
        voices = this.synthesis.getVoices();
        this.voice = voices.find(voice => voice.lang.startsWith('ru')) ||
                    voices.find(voice => voice.lang.startsWith('en')) ||
                    voices[0];
      });
    }
  }

  speak(text: string, priority: boolean = false) {
    if (!this.voice) return;

    if (priority) {
      this.synthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.voice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    this.synthesis.speak(utterance);
  }

  stop() {
    this.synthesis.cancel();
  }
}

const tts = new TTSService();

class WorkoutAnnouncer {
  private currentTimeout: NodeJS.Timeout | null = null;

  announceExerciseStart(exercise: Exercise) {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    soundManager.play('start');
    tts.speak(exercise.name, true);

    if (IS_FULL_TTS) {
      this.currentTimeout = setTimeout(() => {
        tts.speak(exercise.instruction, true);
        this.currentTimeout = null;
      }, 10000);
    }
  }

  announcePreparation(time: number, firstExercise: Exercise | undefined) {
    if (time === PREPARATION_TIME) {
      tts.speak('Приготовьтесь', true);
    } else if (time <= 3 && time > 0) {
      tts.speak(time.toString(), true);
    } else if (time === 0 && firstExercise) {
      this.announceExerciseStart(firstExercise);
    }
  }

  announceRest(time: number, isStart: boolean) {
    if (isStart) {
      tts.speak('Отдых', true);
    } else if (time <= 3 && time > 0) {
      tts.speak(time.toString(), true);
    }
  }

  announceTimer(time: number) {
    if (time <= 3 && time > 0) {
      tts.speak(time.toString(), true);
    }
  }

  stop() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
      this.currentTimeout = null;
    }
    tts.stop();
  }
}

export const workoutAnnouncer = new WorkoutAnnouncer();