import { _decorator, Button, Component, director , Layout, Node, Sprite, UITransform } from 'cc';
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
        const playerChoose = this.loadDataLocalStorage("player_choose")
        if(playerChoose){
            this.initShopping(playerChoose);
        }
    }

    onSave(key : string, val : any){
        const jsonData = JSON.stringify(val);
        localStorage.setItem(key, jsonData);
    }

    loadDataLocalStorage (key : string | null) {
        const jsonData = localStorage.getItem(key);
        if (jsonData) {
            return JSON.parse(jsonData);
        }
        return null;
    }

    initShopping (playerChoose : number) {
        this.birds.forEach(element => {
            const index = element.getSiblingIndex() + 1;
            console.log(playerChoose, index)
            if(playerChoose == index){
                const elm = element.getComponent(UITransform);
                elm.setContentSize(this.scaleX, this.scaleY);
            }
        });
    }

    setSizebird (uiTransform : UITransform) {
        this.birds.forEach(element => {
            const elm = element.getComponent(UITransform);
            elm.setContentSize(this.baseWidth, this.baseHeight);
        })
        if(uiTransform){
            uiTransform.setContentSize(this.scaleX , this.scaleY);
        }
    }


    chooseBird (event : Event) {
        const targetNode = event.target as unknown as Node;
        const uiTransform = targetNode.getComponent(UITransform);
        const sprite = targetNode.getComponent(Sprite);
        if(sprite){
            const index = sprite.node.getSiblingIndex();
            this.onSave("player_choose" , index + 1);
        }
        if(uiTransform){
            this.setSizebird(uiTransform)
        }
    }
}


