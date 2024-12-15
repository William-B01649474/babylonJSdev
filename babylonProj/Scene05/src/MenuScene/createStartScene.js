import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import { Scene, ArcRotateCamera, Vector3, HemisphericLight, MeshBuilder, Color3, Animation, StandardMaterial } from "@babylonjs/core";
function createLight(scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}
function createSphere(scene) {
    let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;
    const material = new StandardMaterial("sphereMaterial", scene);
    material.diffuseColor = new Color3(1, 0, 0);
    sphere.material = material;
    const animation = new Animation("bouncingAnimation", "position.y", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);
    const keys = [
        { frame: 0, value: 1 },
        { frame: 15, value: 3 },
        { frame: 30, value: 1 }
    ];
    animation.setKeys(keys);
    sphere.animations.push(animation);
    scene.beginAnimation(sphere, 0, 30, true);
    return sphere;
}
function createGround(scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 100 }, scene);
    const material = new StandardMaterial("groundMaterial", scene);
    material.diffuseColor = new Color3(0, 0, 0);
    ground.material = material;
    return ground;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 4, camDist = 15, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    return camera;
}
export default function createBouncingSphereScene(engine) {
    let that = { scene: new Scene(engine) };
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
}
