import { Schema, MapSchema, type } from "@colyseus/schema";
import { Color } from './Color';
import { Player } from "./Player";
import {SetupColors} from "./SetupColors";

export class State extends Schema {

  @type({ map: Player }) players = new MapSchema<Player>();
  @type(SetupColors) setupColor = new SetupColors()
}
