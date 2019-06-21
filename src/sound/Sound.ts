import {Howl} from 'howler';
import {SoundMap} from "./SoundMap";

export class Sound {
    static readonly BUTTON_CLICK_SOUND_ID: string = 'sounds/Start_Button.mp3';
    static readonly BASE_REEL_STOP_SOUND_PATH: string = 'sounds/Reel_Stop_';

    private sounds: SoundMap = {};

    constructor() {
        let reelStopSoundIds: Array<string> = [];
        for (let i = 1; i <= 5; i++) {
            reelStopSoundIds.push(Sound.getReelStopSoundId(i));
        }
        for (let id of reelStopSoundIds.concat(Sound.BUTTON_CLICK_SOUND_ID)) {
            this.sounds[id] = new Howl({
                src: id
            });
        }
    }

    private static getReelStopSoundId(num: number): string {
        return Sound.BASE_REEL_STOP_SOUND_PATH + num + '.mp3';
    }

    playButtonClickSound(): void {
        this.sounds[Sound.BUTTON_CLICK_SOUND_ID].play();
    }

    playRandomReelStopSound(): void {
        let index: number = Math.ceil(Math.random() * 5);
        let id: string = Sound.getReelStopSoundId(index);
        this.sounds[id].play();
    }
}