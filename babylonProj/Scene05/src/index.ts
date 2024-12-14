import { Engine, Scene } from "@babylonjs/core";
import createGUIScene from "./createGUI";
import { SceneData } from "./interfaces";

// Entry point
window.addEventListener("DOMContentLoaded", () => {
  // Get canvas element
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;

  if (!canvas) {
    console.error("Canvas element with ID 'renderCanvas' not found.");
    return;
  }

  // Create BabylonJS engine
  const engine = new Engine(canvas, true);

  // Initial GUI scene
  const initialScene = new Scene(engine);

  // Create scene data object
  const runScene: SceneData = {
    scene: initialScene,
    engine: engine, // Pass the engine here
    canvas: canvas,
  };

  // Create GUI scene
  createGUIScene(runScene, engine);

  // Run render loop
  engine.runRenderLoop(() => {
    if (runScene.scene) {
      runScene.scene.render();
    }
  });

  // Handle browser resize events
  window.addEventListener("resize", () => {
    engine.resize();
  });
});
