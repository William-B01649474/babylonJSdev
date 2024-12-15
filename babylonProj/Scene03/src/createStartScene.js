var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Scene, ArcRotateCamera, Vector3, MeshBuilder, StandardMaterial, HemisphericLight, Color3, Engine, Texture, SceneLoader, Sound } from "@babylonjs/core";
function backgroundMusic(scene) {
    let music = new Sound("music", "./assets/audio/arcade-kid.mp3", scene, null, {
        loop: true,
        autoplay: true,
    });
    Engine.audioEngine.useCustomUnlockedButton = true;
    window.addEventListener("click", () => {
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
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield SceneLoader.ImportMeshAsync("", "./assets/models/men/", "dummy3.babylon", scene);
        if (result.meshes.length === 0) {
            throw new Error("No meshes found in the imported model.");
        }
        let character = result.meshes[0];
        character.position.x = x;
        character.position.y = y + 0.1;
        character.scaling = new Vector3(1, 1, 1);
        character.rotation = new Vector3(0, 1.5, 0);
        return character;
    });
}
export default function createStartScene(engine) {
    return __awaiter(this, void 0, void 0, function* () {
        let scene = new Scene(engine);
        let audio = backgroundMusic(scene);
        let lightHemispheric = createHemisphericLight(scene);
        let camera = createArcRotateCamera(scene);
        let ground = createGround(scene);
        let player;
        try {
            player = yield importMeshA(scene, 0, 0);
        }
        catch (error) {
            console.error("Error loading player mesh:", error);
            throw error;
        }
        let that = {
            scene,
            audio,
            lightHemispheric,
            camera,
            player,
            ground,
        };
        return that;
    });
}
