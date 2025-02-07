import { _decorator, Button, Component, director, Layout, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shopping')
export class Shopping extends Component {
    @property({
        type : Button
    })
    public backScreen : Button

    @property({
        type : Node
    })
    public layoutBirds : Node

    @property({
        type : Node
    })
    public birds : Node[] = []

    public baseWidth : number = 130;
    public baseHeight : number = 100;
    public scaleX : number = 150;
    public scaleY : number = 120;


    backHome () {
        director.loadScene('scene');
    }

    onLoad () {
        this.initShopping();
    }

    initShopping () {
        const layout = this.layoutBirds.getComponent(Layout);
        console.log(layout)
        this.birds.forEach(element => {
            console.log(element)
        });
    }
}


