import {Ship} from "./ship";

export interface Player {
  id: number,
  onTurn: boolean,
  outcome: boolean,
  sunkShipsArray: Ship[],
  sunkShipsNumber: number,
  score: number[]
}
