import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("FaceSelection")
export class FaceSelection extends Component {
  @property({ type: Node })
  DiceFaces = [];
  @property({ type: Node })
  RollButton = null;
  @property({ type: Node })
  RollAgainButton = null;
  start() {
    this.RollAgainButton.active = false;
    this.RollButton.active = false;
  }

  update(deltaTime: number) {}
}
