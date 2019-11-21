import { Player } from "./player.js";

export class TrianglePlayer extends Player {
    constructor(index) {
        super(3,index);
        this.name = 'Triangle';
    }

}