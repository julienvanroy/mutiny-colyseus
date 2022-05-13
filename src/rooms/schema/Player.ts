import { Schema, Context, type } from "@colyseus/schema";

export class Player extends Schema {

  @type ("string") id:string;
  @type("string") name:string = "";
  @type("number") points:number = 0;

}
