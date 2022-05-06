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

    this.onMessage("joystickMove", (client, message) => {
      // console.log(client.id, message)
      this.broadcast("joystickPos", {
        playerSessionId: client.id,
        playerPosition: message
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
