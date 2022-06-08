import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import {Color} from "./Color";
import colors from "../../configs/colors";

export class State extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ array: Color }) availableColors = colors;
}
