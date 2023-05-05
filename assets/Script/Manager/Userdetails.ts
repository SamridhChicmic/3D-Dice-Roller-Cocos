import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Userdetails")
export class Userdetails {
  private static _instance: Userdetails = null;
  faceSelected: string;
  static getInstance(): Userdetails {
    if (!Userdetails._instance) {
      Userdetails._instance = new Userdetails();
    }
    return Userdetails._instance;
  }
}
