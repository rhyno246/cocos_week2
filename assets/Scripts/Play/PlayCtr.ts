import { _decorator, CCInteger, Collider2D, Color, Component, Contact2DType, director, IPhysics2DContact, Node, Prefab, Sprite, UITransform, Vec3 } from 'cc';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { PipePool } from './PipePool';
import { Bird } from './Bird';
import { Audio } from './Audio';
const { ccclass, property } = _decorator;

@ccclass('PlayCtr')
export class PlayCtr extends Component {
    @property({ 
        type: Prefab, 
        tooltip: 'The prefab of pipes'
    })
    public prefabPipes = null;

    @property({
        type : ButtonGroup
    })
    public btnGroup : ButtonGroup

    @property({
        type : CCInteger
    })
    public speed : number = 50;

    @property({
        type : CCInteger
    })
    public pipeSpeed : number = 50;

    @property({
        type : PipePool
    })
    public pipePool : PipePool

    @property({
        type : Bird
    })
    public bird : Bird

    @property({
        type : Audio
    })
    public audio : Audio


    public isOver: boolean;
    public isPlay: boolean;

    onLoad(){
        this.initListener();
        this.initBird();
        this.btnGroup.resetScore();
        this.initLevel();
        this.isOver = true;
        director.pause();
        this.isPlay = true;
        this.contactGroundPipe();
    }

    initListener () {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(!this.isOver && this.isPlay){
                this.btnGroup.hideResult();
                this.bird.fly();
                this.audio.soundGame(0)
                director.resume();
            }else if(this.isOver && this.isPlay){
                this.bird.fly();
                this.replayGame();
                this.audio.soundGame(0)
                director.resume();
            }
        })
    }

    initBird () {
        const birdColor = this.loadData('player_choose');
        if(birdColor){
            const color = new Color(
                birdColor.color._data[0],
                birdColor.color._data[1],
                birdColor.color._data[2],
                birdColor.color._data[3]
            )
            this.bird.getComponent(Sprite).color = color;
        }
    }

    initLevel () {
        const data = this.loadData('player_select_level');
        this.btnGroup.updateLevel(data.level);
    }

    replayGame () {
        this.resetGame();
        this.bird.resetBird();
        this.btnGroup.hideResult();
        this.bird.node.active = true;
        this.isPlay = true;
        director.pause();
    }

    resetGame() {
        this.pipePool.reset(this.prefabPipes);
        this.isOver = false;
        this.btnGroup.resetScore();
        this.startGame();
    }

    startGame () {
        this.bird.resetBird();
        this.btnGroup.hideResult();
        director.resume();
    }

    nextLevel () {
        this.bird.resetBird();
        this.btnGroup.upLevel();
        this.isPlay = true;
        this.replayGame();
    }



    passPipe(){
        this.btnGroup.addScore();
        this.audio.soundGame(1);
        if(this.btnGroup.currentScore == this.btnGroup.maxPipe){
            this.isOver = true;
            this.isPlay = false;
            this.btnGroup.showResultWin();
            this.bird.node.active = false;
        }
    }

    contactGroundPipe () {
        let collider = this.bird.getComponent(Collider2D);
        if(collider){
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact , this)
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        this.bird.birdHit = true;
        this.audio.soundGame(2)
    }

    gameOver () {
        this.audio.soundGame(3)
        this.btnGroup.showResultLose();
        this.isOver = true;
        this.isPlay = false;
        director.pause();
    }

    update() {
        if(this.bird.birdHit == true){
            this.gameOver();
        }
    }



    loadData (key : string | null) {
        const data = localStorage.getItem(key);
        if(data){
            return JSON.parse(data);
        }
        return null;
    }
}


