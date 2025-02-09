import { _decorator, Component, Node } from 'cc';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';
const { ccclass, property } = _decorator;

@ccclass('PlayCtr')
export class PlayCtr extends Component {
    @property({
        type : ButtonGroup
    })
    public btnGroup : ButtonGroup

    onLoad(){
        this.btnGroup.onReset();
    }

}


