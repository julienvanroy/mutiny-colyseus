import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import {SetupColor} from "./SetupColor";

export class State extends Schema {

  @type({ map: Player }) players = new MapSchema<Player>();
  @type(SetupColor) setupColor = new SetupColor()
}
