import { _decorator, Component, director, Node , Vec3 , screen, UITransform } from 'cc';
import { PlayCtr } from './PlayCtr';
const { ccclass, property } = _decorator;
@ccclass('Pipe')
export class Pipe extends Component {
    @property({
        type: Node,
        tooltip: 'Top Pipe'
     })
     public topPipe: Node;
    
     @property({
        type: Node,
        tooltip: 'Bottom Pipe'
     })
     public bottomPipe: Node;


     
     public game;
     public pipeSpeed:number;
     public tempSpeed:number;
     

     public scene = screen.windowSize;

    isPass: boolean;

    onLoad (){
        const canvas = director.getScene().getChildByName("Canvas");
        this.game = canvas.getChildByName("PlayCtr").getComponent(PlayCtr);
        this.pipeSpeed = this.game.pipeSpeed;
        this.isPass = false; 

    }
    initPos() {
        console.log('init pipe component')
    }

    update(deltaTime: number){
        this.tempSpeed = this.pipeSpeed * deltaTime;
    }
}


