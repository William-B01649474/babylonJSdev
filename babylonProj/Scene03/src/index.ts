import { Engine } from "@babylonjs/core";
import createStartScene from "./createStartScene";
import createRunScene from "./createRunScene";
import "./main.css";

const CanvasName = "renderCanvas";

let canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);

async function main() {
  // Initialize the BabylonJS engine
  let eng = new Engine(canvas, true, {}, true);

  // Create the start scene asynchronously
  let startScene = await createStartScene(eng);

  // Pass the startScene to the run scene setup
  await createRunScene(startScene);

  // Run the render loop
  eng.runRenderLoop(() => {
    if (startScene.scene) {
      startScene.scene.render();
    }
  });

  // Handle window resize events
  window.addEventListener("resize", () => {
    eng.resize();
  });
}

// Run the main function
main().catch((error) => {
  console.error("An error occurred during initialization:", error);
});
