import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HomeCtr')
export class HomeCtr extends Component {
    @property({
        type : Button
    })
    public btnPlay : Button

    @property({
        type : Button
    })
    public btnShopping : Button

    showShoppingScenes () {
        director.loadScene("shopping")
    }

    showLevelScenes () {
        director.loadScene("level")
    }
}


