import { TrianglePlayer } from "./triangle-player.js";
import { SquarePlayer } from "./square-player.js";
import { PentagonPlayer } from "./pentagon-player.js";
import { HexagonPlayer } from "./hexagon-player.js";
import { Utilities } from '../js/utilities.js';

class Game {
    // Member variables
    gameContext;
    canvas;
    players = [];
    winners = [];
    WIN_LINE_X = 860;
    STOP_RUNNING_LINE = 950;
    gameInterval;
    initialDrawInterval;

    constructor() {
        this.canvas = document.getElementById('game-surface');
        this.gameContext = this.canvas.getContext('2d');

        this.players.push(new TrianglePlayer(0));
        this.players.push(new SquarePlayer(1));
        this.players.push(new PentagonPlayer(2));
        this.players.push(new HexagonPlayer(3));
        this.drawBoard();

        this.initialDrawInterval = setInterval(() => this.drawBoard(), 50);
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


        this.drawHorizontalLaneLine(10);

        this.drawHorizontalLaneLine(120);
        this.drawHorizontalLaneLine(240);
        this.drawHorizontalLaneLine(360);
        this.drawHorizontalLaneLine(480);

        this.gameContext.lineWidth = 40;
        this.gameContext.beginPath();
        this.gameContext.moveTo(120, 0);
        this.gameContext.lineTo(120, 500);
        this.gameContext.stroke();

        this.gameContext.lineWidth = 100;
        this.gameContext.beginPath();
        this.gameContext.moveTo(960, 0);
        this.gameContext.lineTo(960, 500);
        this.gameContext.stroke();

        this.gameContext.save();
        this.gameContext.fillStyle = '#fff';
        this.gameContext.translate(100, 100);
        this.gameContext.rotate(-Math.PI / 2);
        this.gameContext.textAlign = "center";
        this.gameContext.font = "bold 40px Saira";
        this.gameContext.fillText("START", -150, 35);

        this.gameContext.font = "bold 80px Saira";
        this.gameContext.fillText('FINISH', -150, 880);

        this.gameContext.font = "bold 80px Saira";
        this.gameContext.fillStyle = 'green';
        this.gameContext.fillText('1', 43, -30);
        this.gameContext.fillText('2', -77, -30);
        this.gameContext.fillText('3', -197, -30);
        this.gameContext.fillText('4', -317, -30);

        this.gameContext.restore();


        for (const player of this.players) {
            player.draw(this.gameContext);
        }
    }

    drawHorizontalLaneLine(y) {
        this.gameContext.setLineDash([]);
        this.gameContext.beginPath();
        this.gameContext.lineWidth = .5;
        this.gameContext.moveTo(0, y);
        this.gameContext.lineTo(900, y);
        this.gameContext.stroke();
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
            const winnerDiv = document.createElement('li');
            winnerDiv.innerHTML = winner.name;
            document.getElementById('leader-board-items').appendChild(winnerDiv);
        }
    }

    startGame() {
        clearInterval(this.initialDrawInterval);
        Utilities.clearDOMChildren('leader-board-items');
        this.reset();
        this.gameInterval = setInterval(() => this.advanceAndDraw(), 50);
        this.winners = [];
        document.getElementById('start-game').style.visibility = 'hidden';
        console.clear();
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