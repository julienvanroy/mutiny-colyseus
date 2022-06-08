import { Schema, type } from "@colyseus/schema";
import { Color } from './Color';

export class Player extends Schema {
  @type ("string") id:string;
  @type("string") name:string = "";
  @type(Color) color:Color = null;
  @type("number") points:number = 0;
  @type("boolean") connected:boolean = true;
  @type("boolean") orientationReady:boolean = false;
  @type("string") target:string = "";
}
