import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Audio')
export class Audio extends Component {
    @property({
        type : [AudioClip]
    })
    public clips : AudioClip[] = []

    @property({
        type : AudioSource
    })
    public audioSource : AudioSource = null!;

    soundGame (index : number) {
        let clip : AudioClip = this.clips[index];
        this.audioSource.playOneShot(clip);
    }
}


