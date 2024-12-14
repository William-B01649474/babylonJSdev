import { Engine } from "@babylonjs/core";
import { createGameScene } from "./createStartScene";

// Initialize BabylonJS Engine
const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
const engine = new Engine(canvas, true);

// Create the game scene
const scene = createGameScene(engine);

// Render loop
engine.runRenderLoop(() => {
    scene.render();
});

// Handle window resize
window.addEventListener("resize", () => {
    engine.resize();
});
