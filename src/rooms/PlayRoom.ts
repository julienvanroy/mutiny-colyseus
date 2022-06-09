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
    this.autoDispose = true;
  }

  onCreate(options: any) {
    this.setState(new State());

    this.onMessage("addPlayer", (client, message) => {
      const player = this.state.players.get(client.id);
      player.orientationReady = message.orientationReady;

      this.broadcast("addPlayer", {
        playerSessionId: client.id,
      })
    });

    this.onMessage("addPseudo", (client, message) => {
      const player = this.state.players.get(message.playerId);
      player.name = message.playerName

      this.broadcast("getAllPlayers", this.state.players)
    })

    this.onMessage("getAllPlayers", () => {
      this.broadcast("getAllPlayers", this.state.players)
    });

    this.onMessage("getPlayer", (client) => {
      this.broadcast("getPlayer", this.state.players.get(client.id))
    });

    this.onMessage("updatePlayerTarget", (client, message) => {
      const player = this.state.players.get(message.playerId);
      player.target = JSON.stringify(message.playerTarget);

      if (!message.onGameStart) {
        player.targetChanged = true;
        this.broadcast("getAllPlayers", this.state.players)
        let timeout = this.clock.setTimeout(() => {
          player.targetChanged = false;
          this.broadcast("getAllPlayers", this.state.players)
          timeout.clear();
        }, 2000);
      }

      // this.broadcast("updatePlayerTarget", {
      //   player: message.playerId,
      //   target: message.playerTarget.id
      // })
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

    this.onMessage("attack", (client) => {
      this.broadcast("attack", {
        playerSessionId: client.id,
      })
    });

    this.onMessage("kill", (client, message) => {
      const player = this.state.players.get(message.target);
      player.isKilled = true;
      this.broadcast("getAllPlayers", this.state.players)

      let timeout = this.clock.setTimeout(() => {
        player.isKilled = false;
        this.broadcast("getAllPlayers", this.state.players)
        timeout.clear();
      }, 2000);

      // this.broadcast("kill", {
      //   player: message.player,
      //   target: message.target
      // })
    });

    this.onMessage("power", (client, message) => {
      this.broadcast("power", {
        playerSessionId: client.id,
        power: message
      })
    });

    this.onMessage("orientationChange", (client, message) => {
      const player = this.state.players.get(client.id);
      player.orientationReady = message.orientationReady;
    });

  }

  onJoin(client: Client, options: any) {
    const availableColors = this.state.availableColors

    if (availableColors.length === 0) return;

    const player = new Player()
    player.id = client.id
    player.color = availableColors[0]

    availableColors.shift();

    this.state.players.set(client.sessionId, player);

    console.log(client.sessionId, "-", player.name, "joined!");
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
      const player = this.state.players.get(client.sessionId);
      this.state.availableColors.push(player.color);

      this.state.players.delete(client.sessionId);
    }

    this.broadcast("getAllPlayers", this.state.players)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
