import { _decorator, Component, instantiate, Node, NodePool , Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PipePool')
export class PipePool extends Component {
  
    @property({
        type: Node,
        tooltip: 'Where the new pipes go'
    })
    public pipePoolHome;

    public pool = new NodePool;
    public createPipe: Node = null;  
    public prefabPipes: Prefab = null;
    initPool(){
        console.log('init pipe pool')
        let countPipe = 2;
        for( let i = 0; i < countPipe; i++){
            let createPipe = instantiate(this.prefabPipes);
            if(i == 0){
                this.pipePoolHome.addChild(createPipe)
            }else{
                this.pool.put(createPipe);
            }
        }
    }
    reset(){

    }

}


