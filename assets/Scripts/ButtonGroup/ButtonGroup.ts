import { _decorator, Button, Component, director, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ButtonGroup')
export class ButtonGroup extends Component {
    @property({
        type : Button
    })
    public btnHome : Button
    
    @property({
        type : Button
    })
    public btnNextLv : Button

    @property({
        type : Button
    })
    public btnResume : Button
    
    @property({
        type : Button
    })
    public btnReplay : Button

    @property({
        type : Button
    })
    public btnPause : Button

    @property({
        type : Label
    })
    public level : Label

    @property({
        type : Label
    })
    public result : Label


    showSceneHome(){
        director.loadScene("scene");
    }

    onReset(){
        this.hideResult();
    }



    hideResult () {
        this.result.node.active = false;
        this.btnReplay.node.active = false;
        this.btnResume.node.active = false;
        this.btnNextLv.node.active = false;
        this.btnHome.node.active = false;
    }

    pauseGame() {
        director.pause();
        this.btnResume.node.active = true;
        this.btnHome.node.active = true;
    }

    resumeGame () {
        director.resume();
        this.btnResume.node.active = false;
        this.btnHome.node.active = false;
    }


    resultWin () {

    }

    resultLoss () {

    }

}


