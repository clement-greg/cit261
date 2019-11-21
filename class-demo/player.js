export class Player {
    sides;
    speed = 5;
    endurance = 20;
    playerIndex = 0;
    fillStyle = 'green';
    restInterval = 20;
    name = 'shape';

    x = 100;
    y = 0;

    currentSprint = 0;
    currentRest = 0;
    moveState = '';

    constructor(numberOfSides, index) {
        this.sides = numberOfSides;
        this.playerIndex = index;
        this.y = index * 120 + 55;
    }

    draw(context) {
        const size = 40;
        context.fillStyle = this.fillStyle;
        context.beginPath();
        context.moveTo(this.x + size * Math.cos(0), this.y + size * Math.sin(0));
        for (var i = 1; i <= this.sides; i += 1) {
            context.lineTo(this.x + size * Math.cos(i * 2 * Math.PI / this.sides), this.y + size * Math.sin(i * 2 * Math.PI / this.sides));
        }
        context.fill();
    }

    move() {
        if (this.currentSprint <= this.endurance) {

            this.x += this.speed;
            this.currentSprint++;
            this.currentRest = 0;
            this.moveState = 'moving';
        } else {
            if (this.currentRest <= this.restInterval) {
                this.moveState = this.currentRest === 0 ? 'resting' : 'still resting';
                this.currentRest++;
            } else {
                this.currentSprint = 0;
                this.currentRest = 0;
                this.moveState = 'moving again';
            }
        }

        if (this.x > 950) {
            this.x = 950;
        }
    }

    reset() {
        this.x = 100;
        this.currentSprint = 0;
        this.currentRest = 0;
    }
}