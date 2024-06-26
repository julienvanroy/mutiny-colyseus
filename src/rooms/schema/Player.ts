import { Schema, type } from "@colyseus/schema";
import { Color } from './Color';

export class Player extends Schema {
  @type ("string") id:string;
  @type("string") name:string = "";
  @type(Color) color:Color;
  @type("number") points:number = 0;
  @type("boolean") connected:boolean = true;
  @type("boolean") orientationReady:boolean = false;
  @type("string") target:string = "";
  @type("boolean") isKilled:boolean = false;
  @type("boolean") targetChanged:boolean = false;
  @type("boolean") targetGotStolen:boolean = false;
}
