import { Engine } from "@babylonjs/core";
import createScene1 from "./MenuScene/createStartScene";
import createScene2 from "./PlayScene/createStartScene";
import menuScene from "./gui/guiScene";
import "./main.css";
const CanvasName = "renderCanvas";
let canvas = document.createElement("canvas");
canvas.id = CanvasName;
canvas.classList.add("background-canvas");
document.body.appendChild(canvas);
let scene;
let scenes = [];
let eng = new Engine(canvas, true, {}, true);
let gui = menuScene(eng);
scenes[0] = createScene1(eng);
scenes[1] = createScene2(eng);
scene = scenes[0].scene;
setSceneIndex(0);
export default function setSceneIndex(i) {
    eng.runRenderLoop(() => {
        scenes[i].scene.render();
        gui.scene.autoClear = false;
        gui.scene.render();
    });
}
