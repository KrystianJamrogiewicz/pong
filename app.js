const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Wymiary pola Canvas - pola gry
canvas.width = 1000;
canvas.height = 500;

const table = {
	height: canvas.height,
	width: canvas.width,
	lineWidth: 6, //szerokosć linii środkowej
	lineHeight: 16, //wysokosć linii środkowej
	table: () => {
		ctx.fillStyle = "black"; // Wybór koloru
		ctx.fillRect(0, 0, table.width, table.height); // Rysuje prostokąt (współżędne początkowe x, y, odległość x, y)
		// Rysuje przerywanąlinie na środku stołu
		for (
			let linePosition = 20;
			linePosition < table.height;
			linePosition += 30
		) {
			ctx.fillStyle = "gray";
			ctx.fillRect(
				table.width / 2 - table.lineWidth / 2,
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
	x: table.width / 2 - size / 2,
	y: table.height / 2 - size / 2,
	speedX: -3, // Zmiana połorzenia piłki
	speedY: 1,

	ball: () => {
		// Kolor piłki
		ctx.fillStyle = "#ffff";
		// Narysowanie piłki
		ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

		// Zmiana pozycji piłki (ruch)
		ball.x += ball.speedX;
		ball.y += ball.speedY;

		// Odbijanie od ścian (przeciwny zwrot prędkości)
		if (ball.x <= 0 || ball.x >= table.width - ball.size)
			(ball.speedX = -ball.speedX), ball.speedUp();
		if (ball.y <= 0 || ball.y >= table.height - ball.size) {
			(ball.speedY = -ball.speedY), ball.speedUp();
		}
	},
	// Przyśpieszenie piłki
	speedUp: () => {
		if (ball.speedX > 0 && ball.speedX < 16) ball.speedX += 0.2;
		else if (ball.speedX < 0 && ball.speedX > -16) ball.speedX -= 0.2;
		if (ball.speedY > 0 && ball.speedY < 16) ball.speedY += 0.2;
		else if (ball.speedY < 0 && ball.speedY > -16) ball.speedY -= 0.2;
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
		// Poruszanie paletką
		canvas.addEventListener("mousemove", event => {
			// Kod do wykonania w reakcji na ruch myszy na elemencie canvas (pole gry)
			let mauseY = event.clientY - canvas.offsetTop - playerPaddle.height / 2; // Odczyt osi Y z myszki skoregowany o położenie elementu (górna krawędź elementu = 0)
			if (mauseY <= 0) mauseY = 0;
			else if (mauseY >= 400) mauseY = 400;
			playerPaddle.y = mauseY;
		});
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

		// Poruszanie paletką
		let aiCenterY = aiPaddle.y + aiPaddle.height / 2;
		let ballCenterY = ball.y + ball.size / 2;
		if (ball.x > 500) {
			if (aiCenterY - ballCenterY > 200) aiPaddle.y -= 25;
			else if (aiCenterY - ballCenterY < -200) aiPaddle.y += 25;
			else if (aiCenterY - ballCenterY > 40) aiPaddle.y -= 10;
			else if (aiCenterY - ballCenterY < -40) aiPaddle.y += 10;
		} else if (ball.x > 150 && ball.x <= 500) {
			if (aiCenterY - ballCenterY > 100) aiPaddle.y -= 2;
			else if (aiCenterY - ballCenterY < -100) aiPaddle.y += 2;
		}
		if (aiPaddle.y >= 400) aiPaddle.y = 400;
		else if (aiPaddle.y <= 0) aiPaddle.y = 0;
		console.log(aiPaddle.y);
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
