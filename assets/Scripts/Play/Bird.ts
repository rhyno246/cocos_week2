import { _decorator, Animation, CCFloat, Component, easing, Tween, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bird')
export class Bird extends Component {
    @property({
        type : CCFloat
    })
    public jumpHeight : number = 70

    @property({
        type : CCFloat
    })
    public jumpDuration : number = 0.3;

    public bridAnimation : Animation;
    public birdLocation : Vec3;
    public birdHit : boolean;
    public test : Tween;

    

    onLoad () {
        this.resetBird();
        this.bridAnimation = this.getComponent(Animation);
    }

    resetBird () {
        this.birdLocation = new Vec3(0,0,0);
        this.node.setPosition(this.birdLocation);
        this.birdHit = false
    }

    fly () {
        this.bridAnimation.stop();
        if(this.test){
            this.test.stop();
        }
        // this.test = tween(new Vec3(0)).to(this.jumpDuration, new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0),
        //     { 
        //         easing : 'smooth',
        //         onUpdate : (target : Vec3 , ratio : number) => {
        //             console.log(target, ratio)
        //             this.node.position = target;
        //         }
        //     }
        // ).start();

        this.test = tween(this.node).to(this.jumpDuration, {
            position: new Vec3(this.node.position.x, this.node.position.y + this.jumpHeight, 0)
        }, {easing: 'smooth'}).start();


        this.bridAnimation.play();
    }

}


