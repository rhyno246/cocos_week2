import { _decorator, CCInteger, Color, Component, director, Node, Prefab, Sprite, UITransform, Vec3 } from 'cc';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { PipePool } from './PipePool';
import { Bird } from './Bird';
const { ccclass, property } = _decorator;

@ccclass('PlayCtr')
export class PlayCtr extends Component {
    @property({ 
        type: [Prefab], 
        tooltip: 'The prefab of pipes'
    })
    public prefabPipes: Prefab[] = [];

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
    }

    initListener () {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(!this.isOver && this.isPlay){
                this.bird?.fly();
                director.resume();
            }else if(this.isOver && this.isPlay){
                this.bird?.fly();
                this.replayGame();
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
        this.bird?.resetBird();
        this.isPlay = true;
        this.resetGame();
    }

    resetGame() {
        this.pipePool.reset(this.prefabPipes[this.btnGroup.currentLevel - 1]);
        this.isOver = false;
        this.btnGroup.resetScore();
        this.startGame();
    }

    startGame () {
        this.btnGroup.hideResult();
        console.log('start')
    }

    pauseGame () {

    }

    passPipe(){
        this.btnGroup.addScore();
    }



    loadData (key : string | null) {
        const data = localStorage.getItem(key);
        if(data){
            return JSON.parse(data);
        }
        return null;
    }
}


