import { _decorator, Component, Input, Node } from "cc";
const { ccclass, property } = _decorator;
import { Userdetails } from "../Manager/Userdetails";
@ccclass("FaceSelection")
export class FaceSelection extends Component {
  @property({ type: Node })
  DiceFaces = [];
  @property({ type: Node })
  RollButton = null;
  @property({ type: Node })
  RollAgainButton = null;
  FaceSelected: string = null;
  userdetails: Userdetails;
  start() {
    this.userdetails = Userdetails.getInstance();
    this.RollAgainButton.active = false;
    this.RollButton.active = false;
    this.touchEventRegister();
  }
  touchEventRegister() {
    this.DiceFaces[0].on(Input.EventType.TOUCH_START, this.onSelect, this);
    this.DiceFaces[1].on(Input.EventType.TOUCH_START, this.onSelect, this);
    this.DiceFaces[2].on(Input.EventType.TOUCH_START, this.onSelect, this);
    this.DiceFaces[3].on(Input.EventType.TOUCH_START, this.onSelect, this);
    this.DiceFaces[4].on(Input.EventType.TOUCH_START, this.onSelect, this);
    this.DiceFaces[5].on(Input.EventType.TOUCH_START, this.onSelect, this);
  }
  onSelect(event) {
    console.log("node selected", event.target.name);
    this.node.active = false;
    this.RollButton.active = true;
    this.FaceSelected = event.target.name;
    this.userdetails.faceSelected = this.FaceSelected;
  }
  update(deltaTime: number) {}
}
