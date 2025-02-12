import { _decorator, Button, Component, director, Label, Node, ProgressBar } from 'cc';
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
    public lavel : Label

    @property({
        type : Label
    })
    public result : Label

    @property({
        type : ProgressBar
    })
    public progressBar : Button


    public currentLevel : number = 1;
    public currentScore : number;
    public maxPipe : number = 10;
    public maxLevel : number = 9;


    showSceneHome(){
        director.resume();
        director.loadScene("scene");
    }

    updateLevel (val : number) {
        this.currentLevel = val;
        this.lavel.string = 'Level : ' + val;
    }

    hideResult () {
        this.result.node.active = false;
        this.btnReplay.node.active = false;
        this.btnResume.node.active = false;
        this.btnNextLv.node.active = false;
        this.btnHome.node.active = false;
    }

    showResultLose () {
        this.result.node.active = true;
        this.btnReplay.node.active = true;
        this.btnHome.node.active = true;
        this.result.string = "YOU LOSE"
    }

    showResultWin () {
        this.result.node.active = true;
        this.btnNextLv.node.active = true;
        this.btnHome.node.active = true;
        this.result.string = "YOU WIN"
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

    updateScore(num : number){
        this.currentScore = num;
        this.progressBar.getComponent(ProgressBar).progress = num / this.maxPipe;
        localStorage.setItem("score_bird", JSON.stringify({score: num }));
    }

    upLevel () {
        this.updateLevel(++this.currentLevel)
    }

    
    addScore () {
        this.updateScore(++this.currentScore);
    }
    resetScore (){
        this.updateScore(0)
        this.hideResult();
    }
    
}


