import { _decorator, CCInteger, Component, director, Node, Prefab, UITransform, Vec3 } from 'cc';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
import { PipePool } from './PipePool';
const { ccclass, property } = _decorator;

@ccclass('PlayCtr')
export class PlayCtr extends Component {
    @property({
        type : ButtonGroup
    })
    public btnGroup : ButtonGroup

    @property({
        type : CCInteger
    })
    public speed : number = 100;

    @property({
        type : CCInteger
    })
    public pipeSpeed : number = 5000;

    @property({
        type : PipePool
    })
    public pipePool : PipePool
    public isOver : boolean;


    onLoad(){
        this.initListener();
        this.btnGroup.onReset();
        this.initLevel();
        this.isOver = true;
        director.pause();
    }

    initListener () {
        this.node.on(Node.EventType.TOUCH_START, () => {
            if(this.isOver == true){
                this.resetGame();
                this.startGame();
            }
            if(this.isOver == false){
            }
        })
    }

    initLevel () {
        const data = this.loadData('player_select_level');
        this.btnGroup.updateLevel(data.level);
    }

    resetGame () {
        this.isOver = false;
        this.startGame();
    }

    startGame () {
        director.resume();
    }

    pauseGame () {

    }

    passPipe(){
        console.log('pass pipe')
    }


    loadData (key : string | null) {
        const data = localStorage.getItem(key);
        if(data){
            return JSON.parse(data);
        }
        return null;
    }
}


