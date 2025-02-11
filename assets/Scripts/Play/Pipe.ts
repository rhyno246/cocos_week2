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
    public maxZoom:number = 300;
    public maxLevel:number = 10;

     public scene = screen.windowSize;

    isPass: boolean;

    onLoad (){
        const canvas = director.getScene().getChildByName("Canvas");
        this.game = canvas.getChildByName("PlayCtr").getComponent(PlayCtr);
        this.pipeSpeed = this.game.pipeSpeed;
        this.isPass = false; 
    }

    update(deltaTime: number){
        this.tempSpeed = this.pipeSpeed * deltaTime;
        const poTopPipe = this.topPipe.getPosition();
        const poBottomPipe = this.bottomPipe.getPosition();

        const newPoTopPipe = new Vec3(poTopPipe.x - this.tempSpeed , poTopPipe.y);
        const newPoBottomPipe = new Vec3(poBottomPipe.x - this.tempSpeed , poBottomPipe.y);

        this.topPipe.setPosition(newPoTopPipe);
        this.bottomPipe.setPosition(newPoBottomPipe);
        const playerScore = JSON.parse(localStorage.getItem("score_bird"));
        const pipeRightBird = - this.maxZoom * (parseInt(playerScore.score, 10) + 1);
        if(this.isPass == false && this.topPipe.position.x <= pipeRightBird){
            this.isPass = true;
            this.game.passPipe();
        }

        if(this.topPipe.position.x <= - (this.maxZoom * this.maxLevel + this.scene.width / 2)){
            this.destroy();
        }

    }
}


