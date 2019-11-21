import { Player } from "./player.js";

export class PentagonPlayer extends Player {
    constructor(index) {
        super(5, index);
        this.fillStyle = 'blue';
        this.speed = 7;
        this.endurance = 15;
        this.restInterval = 27;
        this.name = 'Pentagon';
    }

    move() {
        super.move();
        if (this.moveState === 'resting') {
            console.log(`${this.name} is sooooo tired`);
        }
    }
}