import { _decorator, CCInteger, Component, Node, SphereCollider } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DiceCollision")
export class DiceCollision extends Component {
  @property({ type: CCInteger, tooltip: "Opposite Side Face" })
  DiceColliderOppositeSide = 0;

  onGroundStay: boolean = false;
  start() {
    let Spherecollider = this.node.getComponent(SphereCollider);
    Spherecollider.on("onTriggerStay", this.onCollisionStay, this);
    Spherecollider.on("onTriggerExit", this.OnCollisionExit, this);
  }
  onCollisionStay(event) {
    if (event.otherCollider.node.name != "Dice") {
      this.onGroundStay = true;
    }
  }
  OnCollisionExit() {
    this.onGroundStay = false;
  }
  update(deltaTime: number) {}
}
