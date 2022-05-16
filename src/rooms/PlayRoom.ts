import { Room, Client } from "colyseus";
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

  onCreate (options: any) {
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

  onJoin (client: Client, options: any) {
    const player = new Player()
    player.id = client.id
    player.name = options.name
    this.state.players.set(client.sessionId, player);
    console.log(client.sessionId, "-", player.name, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    // if (this.clients.length === 0) this.disconnect();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
