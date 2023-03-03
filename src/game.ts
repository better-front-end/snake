import { cleanBoard } from "@/board";
import { moveSnake, placeSnakeOnStartingPoint, resetSnake } from "@/snake";
import settings from "@/settings";
import {
	cancelListenToUserArrowKeys,
	listenToUserArrowKeys,
} from "@/user-interactions";

let startButton: HTMLButtonElement;
let moveSnakeIntervalId: number | undefined;

export function initGame() {
	const possibleStartButton = document.querySelector(
		"[data-snake-game-start-button]",
	) as HTMLButtonElement | undefined;

	if (!possibleStartButton) {
		return;
	}

	startButton = possibleStartButton;

	startButton.addEventListener("click", () => {
		startButton.disabled = true;

		startGame();
	});
}

function startGame() {
	placeSnakeOnStartingPoint();

	moveSnakeIntervalId = window.setInterval(() => {
		requestAnimationFrame(moveSnake);
	}, settings.snakeIntervalInMs);

	listenToUserArrowKeys();

	setTimeout(endGame, 5000);
}

function endGame() {
	startButton.disabled = false;
	window.clearInterval(moveSnakeIntervalId);
	moveSnakeIntervalId = undefined;

	cancelListenToUserArrowKeys();
	resetSnake();
	cleanBoard();
}
