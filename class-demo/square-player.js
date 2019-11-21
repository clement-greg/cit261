import { Player } from "./player.js";

export class SquarePlayer extends Player {
    constructor(index) {
        super(4,index);
        this.fillStyle = 'orange';

        this.speed = 3.5;
        this.defaultSpeed = 3.5;
        this.endurance = 50;
        this.restInterval = 10;
        this.name = 'Square';
    }
}