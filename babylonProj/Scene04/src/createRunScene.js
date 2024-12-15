import "@babylonjs/loaders";
export default function createRunScene(runScene) {
    runScene.scene.onAfterRenderObservable.add(() => { });
}
