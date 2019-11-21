import { Player } from "./player.js";

export class TrianglePlayer extends Player {
    constructor(index) {
        super(3, index);
        this.name = 'Triangle';
    }

    draw(context) {
        super.draw(context);
        if (this.moveState === 'still resting' || this.moveState === 'resting') {
            context.strokeStyle = "red";
            context.lineWidth = 5;
            context.setLineDash([]);
            context.stroke();
        }
    }
}