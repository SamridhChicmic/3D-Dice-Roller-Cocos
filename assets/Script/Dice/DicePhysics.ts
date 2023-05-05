import { _decorator, Component, Node, RigidBody, Vec3 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("DicePhysics")
export class DicePhysics extends Component {
  @property({ type: Node })
  DiceFace = [];
  isLanded = false;
  isSleep = false;
  DiceRigidBody: RigidBody;
  start() {
    this.DiceRigidBody = this.node.getComponent(RigidBody);
    this.setEularAngle();
    this.setTorque();
    this.DiceRigidBody.sleepThreshold;
  }
  setEularAngle() {
    let angle = this.node.eulerAngles;
    this.node.eulerAngles = new Vec3(angle.x, Math.random() * 360, angle.z);
  }
  setTorque() {
    let torque = new Vec3(
      Math.random() * 300,
      Math.random() * 300,
      Math.random() * 300
    );
    this.DiceRigidBody.applyTorque(torque);
  }
  isDiceLanded() {
    if (this.DiceRigidBody.isSleeping == true) {
      this.isLanded = true;
      console.log("Body is Sleeped");
    }
  }
  update(deltaTime: number) {
    this.isDiceLanded();
  }
}
