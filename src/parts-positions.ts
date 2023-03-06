import { PartPosition } from "@/types/part-position";
import settings from "@/settings";

let partsPositions: PartPosition[] = [];

export function updateAllPartsPositions() {
	const partWorker = new Worker(
		new URL("all-parts-positions-worker.ts", import.meta.url),
		{ type: "module" },
	);

	const promise = new Promise<void>((resolve) => {
		partWorker.addEventListener(
			"message",
			(results) => {
				partsPositions = results.data;

				resolve();
			},
			{ once: true },
		);

		// eslint-disable-next-line unicorn/require-post-message-target-origin
		partWorker.postMessage(settings);
	});

	return promise;
}

export function getAllPartsPositions() {
	return partsPositions;
}
