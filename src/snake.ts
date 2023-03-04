import settings from "@/settings";
import { drawSnakePart, eraseSnakePart } from "@/board";
import { SnakePosition } from "@/types/snake-position";
import { resetSnakeDirection, snakeDirection } from "@/snake-direction";
import { endGame } from "@/game";
import { detectCollisions } from "@/snake-collisions";

export let snakePositions: SnakePosition[] = [];

export function addSnakePart(snakePosition: SnakePosition) {
	snakePositions.push(snakePosition);

	drawSnakePart(snakePosition);
}

export function resetSnake() {
	snakePositions = [];
	resetSnakeDirection();
}

function getNextHeadPosition() {
	const currentPosition = snakePositions.at(-1) as SnakePosition;
	const nextPosition: SnakePosition = [...currentPosition];

	switch (snakeDirection) {
		case "right": {
			nextPosition[0] = currentPosition[0] + settings.snakeSizeWithGap;
			break;
		}
		case "left": {
			nextPosition[0] = currentPosition[0] - settings.snakeSizeWithGap;
			break;
		}
		case "up": {
			nextPosition[1] = currentPosition[1] - settings.snakeSizeWithGap;
			break;
		}
		case "down": {
			nextPosition[1] = currentPosition[1] + settings.snakeSizeWithGap;
			break;
		}
	}

	return nextPosition;
}

function eraseTail() {
	const snakeTail = snakePositions.shift() as SnakePosition;

	eraseSnakePart(snakeTail);
}

export function moveSnake() {
	if (snakePositions.length === 0) {
		return;
	}

	const nextHeadPosition = getNextHeadPosition();

	const isCollision = detectCollisions(nextHeadPosition);

	if (isCollision) {
		endGame();
	}

	addSnakePart(nextHeadPosition);

	eraseTail();
}
