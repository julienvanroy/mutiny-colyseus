import { Room, Client } from "colyseus";
import { type } from "@colyseus/schema";

import configs from '../configs';
import { Player } from "./schema/Player";
import { State } from "./schema/State";

export class PlayRoom extends Room<State> {

  maxClients: number;
  autoDispose: boolean;

  constructor() {
    super();
    this.maxClients = configs.rooms.maxClientPerRoom;
    this.autoDispose = false;
  }

  @type("number") playerNext: number = 0;
  colors: string[] = ["green", "red", "blue", "yellow"];


  onCreate(options: any) {
    this.autoDispose = options.autoDispose

    this.setState(new State());

    this.onMessage("addPlayer", (client) => {
      this.broadcast("addPlayer", {
        playerSessionId: client.id,
      })
    });

    this.onMessage("getAllPlayers", () => {
      this.broadcast("getAllPlayers", this.state.players)
    });

    this.onMessage("getPlayer", (client) => {
      this.broadcast("getPlayer", this.state.players.get(client.id))
    });

    this.onMessage("updatePlayerTarget", (client, message) => {
      this.broadcast("updatePlayerTarget", {
        playerId: message.playerId,
        playerTarget: message.playerTarget
      })
    });

    this.onMessage("addPoint", (client, message) => {
      const player = this.state.players.get(message.playerId);
      player.points += 1;

      this.broadcast("addPoint", {
        playerId: message.playerId,
        playerPoints: message.playerPoints
      })
    });

    this.onMessage("startGame", () => {
      this.broadcast("startGame")
    });

    this.onMessage("joystick", (client, message) => {
      this.broadcast("joystick", {
        playerSessionId: client.id,
        playerPosition: message
      })
    });

    this.onMessage("kill", (client, message) => {
      // console.log(client.id, message)
      this.broadcast("kill", {
        playerSessionId: client.id,
        kill: message
      })
    });

    this.onMessage("power", (client, message) => {
      // console.log(client.id, message)
      this.broadcast("power", {
        playerSessionId: client.id,
        power: message
      })
    });

  }

  onJoin(client: Client, options: any) {
    const player = new Player()
    player.id = client.id
    player.name = options.name
    player.color = this.colors[this.playerNext]
    this.state.players.set(client.sessionId, player);
    console.log(client.sessionId, "-", player.name, "joined!");

    if (this.playerNext === 3) this.playerNext = 0
    else this.playerNext++
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    // if (this.clients.length === 0) this.disconnect();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
