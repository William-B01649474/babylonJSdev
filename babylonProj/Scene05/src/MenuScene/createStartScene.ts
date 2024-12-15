import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";
import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Color3,
    Camera,
    Engine,
    Animation,
    StandardMaterial
} from "@babylonjs/core";

function createLight(scene: Scene) {
    const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
    light.intensity = 0.7;
    return light;
}

function createSphere(scene: Scene): Mesh {
    let sphere = MeshBuilder.CreateSphere("sphere", { diameter: 2, segments: 32 }, scene);
    sphere.position.y = 1;

    // Add red material to the sphere
    const material = new StandardMaterial("sphereMaterial", scene);
    material.diffuseColor = new Color3(1, 0, 0); // Red color
    sphere.material = material;

    // Add animation for bouncing
    const animation = new Animation(
        "bouncingAnimation",
        "position.y",
        30,
        Animation.ANIMATIONTYPE_FLOAT,
        Animation.ANIMATIONLOOPMODE_CYCLE
    );

    const keys = [
        { frame: 0, value: 1 }, // Start position
        { frame: 15, value: 3 }, // Peak of the bounce
        { frame: 30, value: 1 } // Return to start
    ];

    animation.setKeys(keys);
    sphere.animations.push(animation);

    scene.beginAnimation(sphere, 0, 30, true);

    return sphere;
}

function createGround(scene: Scene): Mesh {
    let ground = MeshBuilder.CreateGround("ground", { width: 1000, height: 100 }, scene);

    // Add black material to the ground
    const material = new StandardMaterial("groundMaterial", scene);
    material.diffuseColor = new Color3(0, 0, 0); // Black color
    ground.material = material;

    return ground;
}

function createArcRotateCamera(scene: Scene): Camera {
    let camAlpha = -Math.PI / 2,
        camBeta = Math.PI / 4,
        camDist = 15,
        camTarget = new Vector3(0, 0, 0);

    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    //camera.attachControl(true);
    return camera;
}

export default function createBouncingSphereScene(engine: Engine) {
    interface SceneData {
        scene: Scene;
        light?: Light;
        sphere?: Mesh;
        ground?: Mesh;
        camera?: Camera;
    }

    let that: SceneData = { scene: new Scene(engine) };

    // Set background color
    //that.scene.clearColor = new Color3(0.1, 0.1, 0.4); // A solid blue background

    that.light = createLight(that.scene);
    that.sphere = createSphere(that.scene);
    that.ground = createGround(that.scene);
    that.camera = createArcRotateCamera(that.scene);

    return that;
}