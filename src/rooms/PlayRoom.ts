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

    this.onMessage("ejectPlayer", (client, message) => {
      this.broadcast("leaveRoom", message)
    })

    this.onMessage("addPlayer", (client, message) => {
      const player = new Player()
      player.id = client.id
      player.name = message.playerName
      player.orientationReady = message.orientationReady;

      const availableColors = this.state.availableColors
      if (availableColors.length === 0) return;
      player.color = availableColors[0]
      availableColors.shift();

      this.state.players.set(client.sessionId, player);

      this.broadcast("addPlayer", {playerSessionId: client.id})
      this.broadcast("getAllPlayers", this.state.players)
    });

    this.onMessage("getAllPlayers", () => {
      this.broadcast("getAllPlayers", this.state.players)
    });

    this.onMessage("getPlayer", (client) => {
      this.broadcast("getPlayer", this.state.players.get(client.id))
    });

    this.onMessage("updatePlayerTarget", (client, message) => {
      const player = this.state.players.get(message.playerId);
      if (!player) return;
      player.target = JSON.stringify(message.playerTarget);

      if (!message.onGameStart) {
        player.targetChanged = true;
        this.broadcast("getAllPlayers", this.state.players)
        let timeout = this.clock.setTimeout(() => {
          player.targetChanged = false;
          this.broadcast("getAllPlayers", this.state.players)
          timeout.clear();
        }, 2000);

        if (message.playerStealer) {
          player.targetGotStolen = true;
          let timeout2 = this.clock.setTimeout(() => {
            player.targetGotStolen = false;
            timeout2.clear();
          }, 2000);
        }
      }

      if (message.playerStealer) {
        const playerStealer = this.state.players.get(message.playerStealer);

        if (playerStealer) {
          this.broadcast("updatePlayerTarget", {
            stealer: playerStealer.name,
          })
        }
      }
      

      this.broadcast("getAllPlayers", this.state.players)
    });

    this.onMessage("addPoint", (client, message) => {
      const player = this.state.players.get(message.playerId);
      player.points += 1;
    });

    this.onMessage("startGame", () => {
      this.state.isStartGame = true
      this.broadcast("startGame")
    });

    this.onMessage("endGame", () => {
      this.state.isEndGame = true
      this.broadcast("endGame")
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
      if (!player) return;
      player.isKilled = true;
      this.broadcast("getAllPlayers", this.state.players)

      let timeout = this.clock.setTimeout(() => {
        player.isKilled = false;
        this.broadcast("getAllPlayers", this.state.players)
        timeout.clear();
      }, 2000);

      const playerKiller = this.state.players.get(message.player);
      if (!playerKiller) return;
      this.broadcast("kill", {
        killer: playerKiller.name
      })
    });

    this.onMessage("power", (client, message) => {
      this.broadcast("power", {
        playerSessionId: client.id,
        power: message
      })
    });

    this.onMessage("orientationChange", (client, message) => {
      const player = this.state.players.get(client.id);
      if(player) {
        player.orientationReady = message.orientationReady;
        this.broadcast("getAllPlayers", this.state.players)
      }
    });

  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  async onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    const player = this.state.players.get(client.id);

    if(this.state.isStartGame && player) {
      // flag client as inactive for other users
      player.connected = false;
      this.broadcast("getAllPlayers", this.state.players)

      try {
        if (consented) {
          throw new Error("consented leave");
        }

        // allow disconnected client to reconnect into this room until 20 seconds
        await this.allowReconnection(client, 20);

        // client returned! let's re-activate it.
        player.connected = true;

      } catch (e) {
        // 20 seconds expired. let's remove the client.
        this.state.leave(client.id)
      }
    } else this.state.leave(client.id)

    this.broadcast("getAllPlayers", this.state.players)
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
