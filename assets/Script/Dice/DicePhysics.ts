import { _decorator, Component, Node, Quat, RigidBody, Vec3 } from "cc";
import { DiceCollision } from "../Collision/DiceCollision";
const { ccclass, property } = _decorator;

@ccclass("DicePhysics")
export class DicePhysics extends Component {
  @property({ type: Node })
  DiceFace = [];
  isLanded = false;
  isSleep = false;
  DiceRigidBody: RigidBody;
  initialPos: Vec3;
  initialAngle: Quat;
  start() {
    this.initialPos = this.node.getPosition();
    this.initialAngle = this.node.getRotation();
    this.DiceRigidBody = this.node.getComponent(RigidBody);
    this.DiceRigidBody.useGravity = false;
  }
  setEularAngle() {
    let angle = this.node.eulerAngles;
    this.node.eulerAngles = new Vec3(angle.x, Math.random() * 360, angle.z);
  }
  rollButtonClicked() {
    this.setEularAngle();
    this.setTorque();
    this.DiceRigidBody.useGravity = true;
  }
  rollAgainButtonClicked() {
    this.DiceRigidBody.useGravity = false;
    this.node.setPosition(this.initialPos);
    this.node.setRotation(this.initialAngle);
    this.isLanded = false;
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
      console.log("Body Sleep");
      this.isLanded = true;

      this.diceSide();
    }
  }
  diceSide() {
    for (let face = 0; face < this.DiceFace.length; face++) {
      let Component = this.DiceFace[face].getComponent(DiceCollision);
      if (Component.onGroundStay == true) {
        console.log("Face of Dice", Component.DiceColliderOppositeSide);
        Component.onGroundStay = false;
      }
    }
  }
  update(deltaTime: number) {
    if (this.isLanded == false && this.DiceRigidBody.useGravity == true) {
      this.isDiceLanded();
    }
  }
}
