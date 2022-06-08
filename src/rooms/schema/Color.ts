import { Schema, type } from "@colyseus/schema";

export class Color extends Schema {
  @type("string") bottle:string = "";
  @type("string") bottleDetails:string = "";
  @type("string") medal:string = "";

  constructor(bottle: string, bottleDetails: string, medal: string) {
    super()
    this.bottle = bottle;
    this.bottleDetails = bottleDetails;
    this.medal = medal;
  }
}
