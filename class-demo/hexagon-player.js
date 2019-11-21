import { Player } from "./player.js";

export class HexagonPlayer extends Player {
    constructor(index) {
        super(6, index);
        
        this.fillStyle = 'purple';

        this.speed = 16;
        this.endurance = 5;
        this.restInterval = 30;
        this.name = 'Hexagon';
    }
}