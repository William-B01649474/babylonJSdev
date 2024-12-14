import { Scene, Sound, Engine } from "@babylonjs/core";
import { SceneData } from "./interfaces";
import { Button, AdvancedDynamicTexture } from "@babylonjs/gui/2D";
import createGameScene from "./gameScene"; // Import the new game scene

// Helper function to create buttons
function createSceneButton(
  scene: Scene,
  name: string,
  label: string,
  x: string,
  y: string,
  advtex: AdvancedDynamicTexture,
  onClick: () => void
) {
  const button: Button = Button.CreateSimpleButton(name, label);
  button.left = x;
  button.top = y;
  button.width = "180px";
  button.height = "35px";
  button.color = "white";
  button.cornerRadius = 20;
  button.background = "red";

  const buttonClick: Sound = new Sound(
    "MenuClickSFX",
    "./assets/audio/menu-click.wav",
    scene,
    null,
    { loop: false, autoplay: false }
  );

  button.onPointerUpObservable.add(() => {
    buttonClick.play();
    onClick();
  });

  advtex.addControl(button);
  return button;
}

export default function createGUIScene(runScene: SceneData, engine: Engine) {
  // Create GUI texture
  const advancedTexture: AdvancedDynamicTexture =
    AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);

  // Create buttons with unique actions
  createSceneButton(
    runScene.scene,
    "playButton",
    "PLAY",
    "0px",
    "-60px",
    advancedTexture,
    () => {
      console.log("Play button clicked!");
      const gameScene = createGameScene(engine); // Load new game scene
      engine.stopRenderLoop();
      engine.runRenderLoop(() => {
        gameScene.render();
      });
    }
  );

  createSceneButton(
    runScene.scene,
    "optionsButton",
    "OPTIONS",
    "0px",
    "0px",
    advancedTexture,
    () => {
      console.log("Options button clicked!");
      alert("Open Options Menu!");
    }
  );

  createSceneButton(
    runScene.scene,
    "quitButton",
    "QUIT",
    "0px",
    "60px",
    advancedTexture,
    () => {
      console.log("Quit button clicked!");
      alert("Quit Game!");
    }
  );

  runScene.scene.onAfterRenderObservable.add(() => {});
}