import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  availableShips = [
    {
      length: 4,
      quantity: 1
    },
    {
      length: 3,
      quantity: 2
    },
    {
      length: 2,
      quantity: 3
    },
    {
      length: 1,
      quantity: 4
    },
  ]

  ships = [];

  constructor() { }

  createShips() {
    const numberOfAvailableShips: number = this.availableShips.length;

    for (let i = 0; i < numberOfAvailableShips; i++) {
      this.ships[i] = []
      let newShip = {
        x: this.availableShips[i].length,
        y: 1,
        length: this.availableShips[i].length,
        horizontal: true
      };

      for (let j = 0; j < this.availableShips[i].quantity; j++){
        this.ships[i].push(newShip);
      }
    }
  }

  rotateShip(i, j) {
    let temp = this.ships[i][j].x;
    this.ships[i][j].x = this.ships[i][j].y;
    this.ships[i][j].y = temp;
    this.ships[i][j].horizontal = !this.ships[i][j].horizontal;
  }

  getShips() {
    return this.ships;
  }
}
