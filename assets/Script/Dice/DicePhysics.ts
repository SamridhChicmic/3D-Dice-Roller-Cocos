import { _decorator, Component, Node, Quat, RigidBody, tween, Vec3 } from "cc";
import { DiceCollision } from "../Collision/DiceCollision";
import { Userdetails } from "../Manager/Userdetails";
const { ccclass, property } = _decorator;

@ccclass("DicePhysics")
export class DicePhysics extends Component {
  @property({ type: Node })
  UserOption: Node = null;
  @property({ type: Node })
  RollButton = null;
  @property({ type: Node })
  RollAgainButton = null;
  @property({ type: Node })
  DiceFace = [];
  @property({ type: Node })
  GameEnd: Node = null;
  @property({ type: Node })
  TryAgain: Node = null;
  isLanded = false;
  isSleep = false;
  DiceRigidBody: RigidBody;
  initialPos: Vec3;
  initialAngle: Quat;
  UserDetails: Userdetails;
  OutputFace;
  start() {
    this.UserDetails = Userdetails.getInstance();
    this.initialPos = this.node.getPosition();
    this.initialAngle = this.node.getRotation();
    this.DiceRigidBody = this.node.getComponent(RigidBody);
    this.DiceRigidBody.useGravity = false;
  }
  setEularAngle() {
    let angle = this.node.eulerAngles;
    this.node.eulerAngles = new Vec3(
      Math.random() * 360,
      Math.random() * 360,
      Math.random() * 360
    );
  }
  rollButtonClicked() {
    this.setEularAngle();
    this.setTorque();
    this.DiceRigidBody.useGravity = true;
    this.RollButton.active = false;
  }
  rollAgainButtonClicked() {
    this.DiceRigidBody.useGravity = false;
    this.node.setPosition(this.initialPos);
    this.node.setRotation(this.initialAngle);
    this.isLanded = false;
    this.UserOption.active = true;
    this.RollAgainButton.active = false;
    this.RollButton.active = false;
    this.GameEnd.scale = new Vec3(0, 0, 0);
    this.TryAgain.scale = new Vec3(0, 0, 0);
  }
  setTorque() {
    let torque = new Vec3(
      Math.random() * 300,
      Math.random() * 400,
      Math.random() * 200
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
        this.OutputFace = Component.DiceColliderOppositeSide;
        this.result();
        Component.onGroundStay = false;
      }
    }
  }
  result() {
    if (this.UserDetails.faceSelected == this.OutputFace.toString()) {
      console.log("Correct Prediction");
      tween(this.GameEnd)
        .to(0.5, { scale: new Vec3(1, 1, 1) })
        .call(() => {
          this.RollAgainButton.active = true;
        })
        .start();
    } else {
      console.log("Wrong Prediction");
      tween(this.TryAgain)
        .to(0.5, { scale: new Vec3(1, 1, 1) })
        .call(() => {
          this.RollAgainButton.active = true;
        })
        .start();
    }
  }
  update(deltaTime: number) {
    if (this.isLanded == false && this.DiceRigidBody.useGravity == true) {
      this.isDiceLanded();
    }
  }
}
