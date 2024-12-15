import setSceneIndex from "./../index";
import { Scene, ArcRotateCamera, Vector3 } from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
function createText(_scene, theText, x, y, s, c, advtex) {
    let text = new GUI.TextBlock();
    text.text = theText;
    text.color = c;
    text.fontSize = s;
    text.fontWeight = "bold";
    text.left = x;
    text.top = y;
    advtex.addControl(text);
    return text;
}
function createRectangle(_scene, w, h, x, y, cr, c, t, bg, advtext) {
    let rectangle = new GUI.Rectangle();
    rectangle.width = w;
    rectangle.height = h;
    rectangle.left = x;
    rectangle.top = y;
    rectangle.cornerRadius = cr;
    rectangle.color = c;
    rectangle.thickness = t;
    rectangle.background = bg;
    advtext.addControl(rectangle);
    return rectangle;
}
function createSceneButton(_scene, name, note, _index, x, y, advtex, onClick) {
    let button = GUI.Button.CreateSimpleButton(name, note);
    button.left = x;
    button.top = y;
    button.width = "120px";
    button.height = "40px";
    button.color = "white";
    button.cornerRadius = 20;
    button.background = "red";
    button.onPointerUpObservable.add(() => {
        onClick();
    });
    advtex.addControl(button);
    return button;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 10, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    return camera;
}
export default function menuScene(engine) {
    let scene = new Scene(engine);
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
    var button1 = createSceneButton(scene, "but1", "PLAY", 1, "0px", "-60px", advancedTexture, () => {
        setSceneIndex(1);
        advancedTexture.dispose();
    });
    var button2 = createSceneButton(scene, "but2", "OPTIONS", 2, "0px", "0px", advancedTexture, () => {
        alert("OPTIONS WAS SELECTED!");
    });
    var button3 = createSceneButton(scene, "but3", "QUIT", 3, "0px", "60px", advancedTexture, () => {
        alert("YOU HAVE QUIT THE GAME!");
    });
    var camera = createArcRotateCamera(scene);
    let that = {
        scene,
        advancedTexture,
        button1,
        button2,
        button3,
        camera,
    };
    return that;
}
