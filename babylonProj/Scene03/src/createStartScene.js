//import "@babylonjs/core/Debug/debugLayer";
//import "@babylonjs/inspector";
import { Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Color3, } from "@babylonjs/core";

function createLight(scene) {
    const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new Color3(0.2, 0.2, 0.2);
    light.specular = new Color3(0, 1, 0);
    light.groundColor = new Color3(0, 1, 0);
    return light;
}

function createGround(scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: 100, height: 100 }, scene);
    return ground;
}

function createStaticCamera(scene) {
    // Camera setup
    const alpha = 0; // 45-degree angle horizontally
    const beta = Math.PI / 3;  // 45-degree angle vertically
    const radius = 10;        // Distance from the target
    const target = new Vector3(0, 0, 0); // Target at the origin

    const camera = new ArcRotateCamera("staticCamera", alpha, beta, radius, target, scene);
    camera.attachControl(false); // Static camera, no user control

    return camera;
}

export default function createStartScene(engine) {
    let that = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
    that.light = createLight(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createStaticCamera(that.scene);
    return that;
}
