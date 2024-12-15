import { Sound } from "@babylonjs/core";
import { Button, AdvancedDynamicTexture } from "@babylonjs/gui/2D";
function createSceneButton(scene, name, index, x, y, advtex) {
    var button = Button.CreateSimpleButton(name, index);
    button.left = x;
    button.top = y;
    button.width = "180px";
    button.height = "35px";
    button.color = "white";
    button.cornerRadius = 20;
    button.background = "green";
    const buttonClick = new Sound("MenuClickSFX", "./assets/audio/menu-click.wav", scene, null, {
        loop: false,
        autoplay: false,
    });
    button.onPointerUpObservable.add(function () {
        buttonClick.play();
        alert("you did it!");
    });
    advtex.addControl(button);
    return button;
}
export default function createGUIScene(runScene) {
    let advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);
    let button1 = createSceneButton(runScene.scene, "but1", "Click Here", "0px", "120px", advancedTexture);
    runScene.scene.onAfterRenderObservable.add(() => { });
}
