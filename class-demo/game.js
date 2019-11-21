import { TrianglePlayer } from "./triangle-player.js";
import { SquarePlayer } from "./square-player.js";
import { PentagonPlayer } from "./pentagon-player.js";
import { HexagonPlayer } from "./hexagon-player.js";
import { Utilities } from '../js/utilities.js';
import { Player } from "./player.js";

class Game {
    // Member variables
    gameContext;
    canvas;
    players = [];
    winners = [];
    WIN_LINE_X = 860;
    STOP_RUNNING_LINE = 950;
    gameInterval;

    constructor() {
        this.canvas = document.getElementById('game-surface');
        this.gameContext = this.canvas.getContext('2d');

        this.players.push(new TrianglePlayer(0));
        this.players.push(new SquarePlayer(1));
        this.players.push(new PentagonPlayer(2));
        this.players.push(new HexagonPlayer(3));
        this.drawBoard();
    }

    drawBoard() {
        this.gameContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.gameContext.beginPath();
        this.gameContext.setLineDash([25, 15]);
        this.gameContext.moveTo(900, 0);
        this.gameContext.lineTo(900, 500);
        this.gameContext.strokeStyle = "green";
        this.gameContext.lineWidth = 5;
        this.gameContext.stroke();


        for (const player of this.players) {
            player.draw(this.gameContext);
        }
    }

    reset() {
        for (const player of this.players) {
            player.reset();
        }
    }

    advance() {

        for (const player of this.players) {
            player.move();
        }
    }

    advanceAndDraw() {
        this.advance();
        this.drawBoard();
        for (const player of this.players) {
            if (player.x > this.WIN_LINE_X && this.winners.indexOf(player) === -1) {
                this.winners.push(player);
                this.printLeaderBoard();

                return;
            }
        }
        if (this.players.filter(i => i.x !== this.STOP_RUNNING_LINE).length === 0) {
            clearInterval(this.gameInterval);
            document.getElementById('start-game').style.visibility = 'visible';
        }
    }

    printLeaderBoard() {
        Utilities.clearDOMChildren('leader-board-items');
        for (const winner of this.winners) {
            let winnerItemTemplate = document.getElementById('winner-item').innerHTML;

            winnerItemTemplate = Utilities.replaceStringWithObject(winnerItemTemplate, winner, Player.prototype);


            const winnerDiv = document.createElement('li');
            winnerDiv.innerHTML = winnerItemTemplate;
            document.getElementById('leader-board-items').appendChild(winnerDiv);
        }
    }

    startGame() {
        Utilities.clearDOMChildren('leader-board-items');
        this.reset();
        this.gameInterval = setInterval(() => this.advanceAndDraw(), 50);
        this.winners = [];
        document.getElementById('start-game').style.visibility = 'hidden';
    }

    stopGame() {
        clearInterval(this.gameInterval);
    }

    printGame() {
        console.log(this);
    }
}
(function () {
    // JavaScript Object - Object Creation
    const game = new Game();

    // Wire-up button event handlers
    document.getElementById('start-game').addEventListener('click', () => game.startGame());
    document.getElementById('game-surface').addEventListener('click', () => game.printGame());

})();