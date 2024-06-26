import Arena from "@colyseus/arena";
import {uWebSocketsTransport} from "@colyseus/uwebsockets-transport";
import { WebSocketTransport } from "@colyseus/ws-transport"
import { monitor } from "@colyseus/monitor";
import { matchMaker } from "colyseus";

/**
 * Import your Room files
 */
import { PlayRoom } from "./rooms/PlayRoom";
import { LobbyRoom } from "colyseus";
import configs from './configs';

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: async (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define("lobby_room", LobbyRoom);
        gameServer
            .define('play_room', PlayRoom)
            .enableRealtimeListing();

        for (let i = 0; i < configs.rooms.starterRoomsCount; i++) {
            matchMaker.createRoom("play_room", {})
        }
    },

    initializeTransport: function() {
        return process.env.NODE_ENV === 'production' ? new uWebSocketsTransport() : new WebSocketTransport();
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
