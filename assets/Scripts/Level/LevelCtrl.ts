import { _decorator, Button, Component, director, instantiate, Label , Layout, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelCtrl')
export class LevelCtrl extends Component {
    @property({
        type : Button    
    })
    public BtnNext : Button

    @property({
        type : Button
    })
    public BtnPrev : Button

    @property({
        type : Prefab
    })
    public prefab : Prefab = null

    @property({
        type : Node
    })
    public layout : Node

    public pageIndex: number = 1;
    public pageNumber: number = 3;
    public maxLevel: number = 9;
    public sizeButton: number = 60;


    onLoad () {
        this.loadLevel();
        this.isShowNav();
    }

    loadLevel () {
        const levelStart = this.pageIndex * this.pageNumber - this.pageNumber + 1;
        const levelEnd = this.pageNumber * this.pageIndex;
        this.layout.removeAllChildren();   
        const layout = this.layout.getComponent(Layout);  
        for( let i = levelStart; i <= levelEnd; i++ ){
            const button = instantiate(this.prefab);
            const label = button.getComponentInChildren(Label);
            this.layout.addChild(button);
            if(label){
                label.string = `${i}`;
            }
            button.on(Button.EventType.CLICK, () => this.onSelectLevel(i))
        }
        if(layout){
            layout.updateLayout()
        }
    }



    onSelectLevel(val : number){
        localStorage.setItem('player_select_level', JSON.stringify({ level : val}))
        director.loadScene('play');
    }

    onNextScreen () {
        this.pageIndex++;
        this.loadLevel();
        this.isShowNav();
    }

    onPrevScreen () {
        this.pageIndex--;
        this.loadLevel();
        this.isShowNav();
    }

    isShowNav () {
        this.BtnNext.node.active = false;
        this.BtnPrev.node.active = false;
        if(this.pageIndex > 1){
            this.BtnPrev.node.active = true;
        }
        if(this.pageIndex < this.maxLevel / this.pageNumber){
            this.BtnNext.node.active = true;
        }
    }
}


