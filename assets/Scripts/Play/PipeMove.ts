import { _decorator, Component, director, Node, screen, UITransform, Vec3 } from 'cc';
import { PlayCtr } from './PlayCtr';
const { ccclass, property } = _decorator;
const random =  (min : number, max : number) => {
    return Math.random() * (max - min) + min;
}
@ccclass('PipeMove')
export class PipeMove extends Component {
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

    public tempStartLocationUp:Vec3 = new Vec3(0,0,0);
    public tempStartLocationDown:Vec3 = new Vec3(0,0,0);

    public verticalOffset: number = 0;
    public verticalDuration: number = 1;

    public PIPE_MOVING_Y = 90;

    isPass: boolean;

    onLoad (){
        const canvas = director.getScene().getChildByName("Canvas");
        this.game = canvas.getChildByName("PlayCtr").getComponent(PlayCtr);
        this.pipeSpeed = this.game.pipeSpeed;
        this.isPass = false;
        this.initPos();
    }
    initPos () {
        this.tempStartLocationUp.x = (this.topPipe.getComponent(UITransform).width);
        this.tempStartLocationDown.x = (this.bottomPipe.getComponent(UITransform).width);

        let gap = random(110,115);
        let topHeight = random(0,420);

        this.tempStartLocationUp.y = topHeight;
        this.tempStartLocationDown.y = (topHeight - (gap * 10));
        
        this.topPipe.setPosition(this.tempStartLocationUp);
        this.bottomPipe.setPosition(this.tempStartLocationDown);
    }



    update(deltaTime: number){
        this.verticalOffset += this.verticalDuration * random(1, 3);
        if (this.verticalOffset > this.PIPE_MOVING_Y || this.verticalOffset < - this.PIPE_MOVING_Y) {
            this.verticalDuration *= -1; 
        }
        this.tempSpeed = this.pipeSpeed * deltaTime;
        const poTopPipe = this.topPipe.getPosition();
        const poBottomPipe = this.bottomPipe.getPosition();
        const newPoTopPipe = new Vec3(poTopPipe.x - this.tempSpeed , poTopPipe.y + this.verticalOffset * deltaTime);
        const newPoBottomPipe = new Vec3(poBottomPipe.x - this.tempSpeed , poBottomPipe.y + this.verticalOffset * deltaTime);

        
        
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


