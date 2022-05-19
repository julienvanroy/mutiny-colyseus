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
    const colors = this.state.setupColor.colors
    const playerNext = this.state.setupColor.playerNext


    const player = new Player()
    player.id = client.id
    player.name = options.name
    player.color = colors[playerNext]
    this.state.players.set(client.sessionId, player);
    console.log(client.sessionId, "-", player.name, "joined!");

    if (this.state.setupColor.playerNext === 3) this.state.setupColor.playerNext = 0
    else this.state.setupColor.playerNext++
  }

  async onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");

    // flag client as inactive for other users
    this.state.players.get(client.sessionId).connected = false;

    try {
      if (consented) {
        throw new Error("consented leave");
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 20);

      // client returned! let's re-activate it.
      this.state.players.get(client.sessionId).connected = true;

    } catch (e) {
      // 20 seconds expired. let's remove the client.
      this.state.players.delete(client.sessionId);
    }

    this.broadcast("getAllPlayers", this.state.players)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
