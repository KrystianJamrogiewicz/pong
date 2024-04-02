const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const table = {
	lineWidth: 6, //szerokosć linii środkowej
	lineHeight: 16, //wysokosć linii środkowej
	table: () => {
		ctx.fillStyle = "black"; // Wybór koloru
		ctx.fillRect(0, 0, cw, ch); // Rysuje prostokąt (współżędne początkowe x, y, odległość x, y)

		for (let linePosition = 20; linePosition < ch; linePosition += 30) {
			ctx.fillStyle = "gray";
			ctx.fillRect(
				cw / 2 - table.lineWidth / 2,
				linePosition,
				table.lineWidth,
				table.lineHeight
			);
		}
	},
};
let size = 20;
const ball = {
	size: size,
	x: cw / 2 - size / 2,
	y: ch / 2 - size / 2,
	speedX: -3, // Zmiana połorzenia piłki
	speedY: 1,

	ball: () => {
		ctx.fillStyle = "#ffff";
		ctx.fillRect(ball.x, ball.y, ball.size, ball.size);
		// Zmiana pozycji piłki (ruch)
		ball.x += ball.speedX;
		ball.y += ball.speedY;
		// Odbijanie od ścian (przeciwny zwrot prędkości)
		if (ball.x <= 0 || ball.x >= cw - ball.size) ball.speedX = -ball.speedX;
		if (ball.y <= 0 || ball.y >= ch - ball.size) ball.speedY = -ball.speedY;
	},
};

const playerPaddle = {
	height: 100,
	width: 20,
	x: 70,
	y: 200,
	player: () => {
		ctx.fillStyle = "#7FFF00";
		ctx.fillRect(
			playerPaddle.x,
			playerPaddle.y,
			playerPaddle.width,
			playerPaddle.height
		);
	},
};

const aiPaddle = {
	height: 100,
	width: 20,
	x: 910,
	y: 200,
	ai: () => {
		ctx.fillStyle = "yellow"; // wybór koloru
		ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height);
	},
};

function game() {
	table.table();
	ball.ball();
	playerPaddle.player();
	aiPaddle.ai();
}

// 1000/60 = 60 razy na sekundę (60FPS)
setInterval(game, 1000 / 60);
