// Import BabylonJS modules
import { Engine, Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Color3, Animation } from "@babylonjs/core";
import { AdvancedDynamicTexture, Button, Control } from "@babylonjs/gui";

// Main Game Scene
export function createGameScene(engine: Engine): Scene {
    const scene = new Scene(engine);

    // Camera Setup
    const camera = new ArcRotateCamera("camera", Math.PI / 4, Math.PI / 4, 10, Vector3.Zero(), scene);
    camera.attachControl(engine.getRenderingCanvas(), true);

    // Lighting Setup
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.8;

    // Ground Setup
    const ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);

    // Add UI
    const ui = AdvancedDynamicTexture.CreateFullscreenUI("UI");

    const startButton = Button.CreateSimpleButton("start", "Start Game");
    startButton.width = "150px";
    startButton.height = "50px";
    startButton.color = "white";
    startButton.background = "green";
    startButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    startButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    startButton.top = -50;
    ui.addControl(startButton);

    const quitButton = Button.CreateSimpleButton("quit", "Quit Game");
    quitButton.width = "150px";
    quitButton.height = "50px";
    quitButton.color = "white";
    quitButton.background = "red";
    quitButton.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    quitButton.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_CENTER;
    quitButton.top = 50;
    ui.addControl(quitButton);

    // Button Animations
    [startButton, quitButton].forEach(button => {
        button.onPointerDownObservable.add(() => {
            button.background = "yellow";
        });

        button.onPointerUpObservable.add(() => {
            button.background = button.name === "start" ? "green" : "red";
        });
    });

    return scene;
}