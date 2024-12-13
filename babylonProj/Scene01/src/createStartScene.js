// Import BabylonJS modules
import { Scene, ArcRotateCamera, Vector3, SpotLight, MeshBuilder, Color3, Animation } from "@babylonjs/core";

function createBox(scene) {
    let box = MeshBuilder.CreateBox("box", { size: 1 }, scene);
    box.position.y = 10;
    return box;
}

function createLight(scene) {
    // Spotlight setup
    const spotlight = new SpotLight("spotlight", new Vector3(0, 5, 0), new Vector3(0, -1, 0), Math.PI / 3, 2, scene);
    spotlight.diffuse = new Color3(1, 1, 1);
    spotlight.specular = new Color3(1, 1, 1);
    return spotlight;
}

function createSphere(scene) {
    let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Add looping animation to move left and right
    const animation = new Animation("sphereAnimation", "position.x", 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CYCLE);

    const keys = [
        { frame: 0, value: -5 }, // Start position on the left
        { frame: 30, value: 5 }, // Move to the right
        { frame: 60, value: -5 } // Back to the left
    ];

    animation.setKeys(keys);
    sphere.animations.push(animation);

    scene.beginAnimation(sphere, 0, 60, true);
    return sphere;
}

function createGround(scene) {
    let ground = MeshBuilder.CreateGround("ground", { width: 40, height: 40 }, scene);
    return ground;
}

function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2,
     camBeta = Math.PI / 2.5,
     camDist = 10,
     camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera(
     "camera1",
     camAlpha,
     camBeta,
     camDist,
     camTarget,
     scene
    );
        camera.lowerRadiusLimit = 0;
        camera.upperRadiusLimit = 12;
        camera.lowerAlphaLimit = 0;
        camera.upperAlphaLimit = Math.PI * 2;
        camera.lowerBetaLimit = 0;
        camera.upperBetaLimit = Math.PI / 2.02;

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
