import { Player } from "./player.js";

export class HexagonPlayer extends Player {
    finished = false;
    constructor(index) {
        super(6, index);

        this.fillStyle = 'purple';

        this.speed = 16;
        this.defaultSpeed = 16;
        this.endurance = 5;
        this.restInterval = 30;
        this.name = 'Hexagon';
    }

    move() {
        super.move();
        if (this.x >= 860 && !this.finished) {
            console.log(`${this.name} says, "WoooHoooo!!!  I\'m finished"`);
            this.finished = true;
        }
    }

    reset() {
        super.reset();
        this.finished = false;
    }
}