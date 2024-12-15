import { Scene, ArcRotateCamera, Vector3, MeshBuilder, StandardMaterial, HemisphericLight, Color3, Engine, Texture, SceneLoader, Sound } from "@babylonjs/core";
function backgroundMusic(scene) {
    let music = new Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true
    });
    Engine.audioEngine.useCustomUnlockedButton = true;
    window.addEventListener('click', () => {
        if (!Engine.audioEngine.unlocked) {
            Engine.audioEngine.unlock();
        }
    }, { once: true });
    return music;
}
function createGround(scene) {
    const groundMaterial = new StandardMaterial("groundMaterial");
    const groundTexture = new Texture("./assets/textures/wood.jpg");
    groundTexture.uScale = 4.0;
    groundTexture.vScale = 4.0;
    groundMaterial.diffuseTexture = groundTexture;
    groundMaterial.diffuseTexture.hasAlpha = true;
    groundMaterial.backFaceCulling = false;
    let ground = MeshBuilder.CreateGround("ground", { width: 15, height: 15, subdivisions: 4 }, scene);
    ground.material = groundMaterial;
    return ground;
}
function createHemisphericLight(scene) {
    const light = new HemisphericLight("light", new Vector3(2, 1, 0), scene);
    light.intensity = 0.7;
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 0.8, 0.8);
    light.groundColor = new Color3(0, 0.2, 0.7);
    return light;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 15, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.lowerRadiusLimit = 9;
    camera.upperRadiusLimit = 25;
    camera.lowerAlphaLimit = 0;
    camera.upperAlphaLimit = Math.PI * 2;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.02;
    return camera;
}
function importMeshA(scene, x, y) {
    let item = SceneLoader.ImportMeshAsync("", "./assets/models/men/", "dummy3.babylon", scene);
    item.then((result) => {
        let character = result.meshes[0];
        character.position.x = x;
        character.position.y = y + 0.1;
        character.scaling = new Vector3(1, 1, 1);
        character.rotation = new Vector3(0, 1.5, 0);
    });
    return item;
}
export default function createStartScene(engine) {
    let scene = new Scene(engine);
    let audio = backgroundMusic(scene);
    let lightHemispheric = createHemisphericLight(scene);
    let camera = createArcRotateCamera(scene);
    let player = importMeshA(scene, 0, 0);
    let ground = createGround(scene);
    let that = {
        scene,
        audio,
        lightHemispheric,
        camera,
        player,
        ground,
    };
    return that;
}
