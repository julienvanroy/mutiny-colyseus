import { Room, Client } from "colyseus";
import configs from '../configs';
import { MyRoomState } from "./schema/PlayRoomState";

export class PlayRoom extends Room<MyRoomState> {

  maxClients: number;
  autoDispose: boolean;

  constructor() {
    super();
    this.maxClients = configs.rooms.maxClientPerRoom;
    this.autoDispose = false;
  }

  onCreate (options: any) {
    this.autoDispose = options.autoDispose

    this.setState(new MyRoomState());

    this.onMessage("addPlayer", (client) => {
      this.broadcast("addPlayer", {
        playerSessionId: client.id,
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
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
    // if (this.clients.length === 0) this.disconnect();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
