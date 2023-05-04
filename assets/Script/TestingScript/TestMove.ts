import { _decorator, Component, MATH_FLOAT_ARRAY, Node, Vec3 } from "cc";
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
  }

  update(deltaTime: number) {}
}
