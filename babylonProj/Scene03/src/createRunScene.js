import { ActionManager, CubeTexture, SceneLoader } from "@babylonjs/core";
import { keyActionManager, keyDownMap, keyDownHeld, getKeyDown, } from "./keyActionManager";
export default function createRunScene(runScene) {
    runScene.scene.actionManager = new ActionManager(runScene.scene);
    keyActionManager(runScene.scene);
    const environmentTexture = new CubeTexture("assets/textures/industrialSky.env", runScene.scene);
    const skybox = runScene.scene.createDefaultSkybox(environmentTexture, true, 10000, 0.1);
    runScene.audio.stop();
    SceneLoader.ImportMeshAsync("", "./assets/", "character.glb", runScene.scene).then((result) => {
        let character = result.meshes[0];
        runScene.scene.onBeforeRenderObservable.add(() => {
            if (getKeyDown() == 1 && (keyDownMap["m"] || keyDownMap["M"])) {
                keyDownHeld();
                if (runScene.audio.isPlaying) {
                    runScene.audio.stop();
                }
                else {
                    runScene.audio.play();
                }
            }
            if (keyDownMap["w"] || keyDownMap["ArrowUp"]) {
                character.position.x -= 0.1;
                character.rotation.y = (3 * Math.PI) / 2;
            }
            if (keyDownMap["a"] || keyDownMap["ArrowLeft"]) {
                character.position.z -= 0.1;
                character.rotation.y = (2 * Math.PI) / 2;
            }
            if (keyDownMap["s"] || keyDownMap["ArrowDown"]) {
                character.position.x += 0.1;
                character.rotation.y = (1 * Math.PI) / 2;
            }
            if (keyDownMap["d"] || keyDownMap["ArrowRight"]) {
                character.position.z += 0.1;
                character.rotation.y = (0 * Math.PI) / 2;
            }
        });
    }).catch((error) => {
        console.error("Error loading character mesh:", error);
    });
    runScene.scene.onAfterRenderObservable.add(() => { });
}
