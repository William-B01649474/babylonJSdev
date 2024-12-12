// Import BabylonJS modules
import { Scene, ArcRotateCamera, Vector3, SpotLight, MeshBuilder, Color3, Animation } from "@babylonjs/core";

function createBox(scene) {
    let box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 3;
    return box;
}

function createLight(scene) {
    // Change light to a spotlight
    const spotlight = new SpotLight("spotlight", new Vector3(0, 5, 0), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    spotlight.diffuse = new Color3(1, 1, 1);
    spotlight.specular = new Color3(1, 1, 1);
    return spotlight;
}

function createSphere(scene) {
    let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Add motion to the sphere
    const animation = new Animation("sphereAnimation", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);

    const keys = [
        { frame: 0, value: 0 }, // Start position
        { frame: 30, value: 5 } // Move right and stop
    ];

    animation.setKeys(keys);
    sphere.animations.push(animation);

    scene.beginAnimation(sphere, 0, 30, false);
    return sphere;
}

function createGround(scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: 10, height: 10 }, scene);
    return ground;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 10, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.attachControl(true);
    return camera;
}

export default function createStartScene(engine) {
    let that = { scene: new Scene(engine) };
    that.scene.debugLayer.show();
    that.box = createBox(that.scene);
    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);
    return that;
}
