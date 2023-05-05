import {
  _decorator,
  Component,
  MATH_FLOAT_ARRAY,
  Node,
  RigidBody,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("TestMove")
export class TestMove extends Component {
  @property({ type: Node })
  dice: Node = null;
  start() {
    let angle = this.dice.eulerAngles;
    this.dice.eulerAngles = new Vec3(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
    let torqu = new Vec3(
      (Math.random() * 360) / 3,
      (Math.random() * 360) / 4,
      (Math.random() * 360) / 5
    );
    this.node.getComponent(RigidBody).applyTorque(torqu);

    console.log(torqu);
  }

  update(deltaTime: number) {}
}
