import { Schema, MapSchema, type } from "@colyseus/schema";
import { Player } from "./Player";
import {Color} from "./Color";
import colors from "../../configs/colors";

export class State extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type({ array: Color }) availableColors = colors;
  @type("boolean") isStartGame = false;
  @type("boolean") isEndGame = false;

  leave(sessionId: string) {
    const player = this.players.get(sessionId);
    this.availableColors.push(player.color);

    this.players.delete(sessionId);
  }
}
