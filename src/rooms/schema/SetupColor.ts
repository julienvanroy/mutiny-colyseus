import { Schema, type } from "@colyseus/schema";

export class SetupColor extends Schema {
  @type("number") playerNext: number = 0;
  colors: string[] = ["green", "red", "blue", "yellow"];
}
