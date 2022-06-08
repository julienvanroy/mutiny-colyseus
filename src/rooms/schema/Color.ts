import { Schema, type } from "@colyseus/schema";

export class Color extends Schema {
  @type ("string") id:string;
  @type("string") bottle:string = "";
  @type("string") bottleDetails:string = "";
  @type("string") medal:string = "";

  constructor(id: string, bottle: string, bottleDetails: string, medal: string) {
    super();
    this.id = id;
    this.bottle = bottle;
    this.bottleDetails = bottleDetails;
    this.medal = medal;
  }
}
