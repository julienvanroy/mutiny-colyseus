import { Schema, type } from "@colyseus/schema";
import { Color } from './Color';
import defaultColors from '../../configs/colors';

export class SetupColors extends Schema {
  @type("number") playerNext: number = 0;
  colorsAvailable: Color[] = defaultColors.map(c => new Color(c.id, c.bottle, c.bottleDetails, c.medal));
  colorsTaken: Color[] = [];
}
