import setSceneIndex from "./../index";

import {
    Scene,
    ArcRotateCamera,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    Mesh,
    Light,
    Camera,
    Engine,
    StandardMaterial,
    Texture,
    Color3,
    CubeTexture,
    Sound
  } from "@babylonjs/core";
  import * as GUI from "@babylonjs/gui";
 
  //----------------------------------------------------

  function createText(_scene: Scene, theText: string, x: string, y: string, s: string, c: string, advtex) {
    let text = new GUI.TextBlock();
    text.text = theText;
    text.color = c;
    text.fontSize = s;
    text.fontWeight = "bold"; //can add parameter for this if you wish
    text.left = x;
    text.top = y;
    advtex.addControl(text);
    return text;
  }

  function createRectangle(_scene: Scene, w: string, h: string, x: string, y: string, cr: number, c: string, t: number, bg: string, advtext) {
    let rectangle = new GUI.Rectangle();
    rectangle.width = w;
    rectangle.height = h;
    rectangle.left = x;
    rectangle.top = y;
    rectangle.cornerRadius = cr;
    rectangle.color = c;
    rectangle.thickness = t;
    rectangle.background = bg;
    advtext.addControl(rectangle);
    return rectangle;
  }

  function createSceneButton(
    _scene: Scene,
    name: string,
    note: string,
    _index: number,
    x: string,
    y: string,
    advtex,
    onClick: () => void
  ) {
    let button = GUI.Button.CreateSimpleButton(name, note);
    button.left = x;
    button.top = y;
    button.width = "120px";
    button.height = "40px";
    button.color = "white";
    button.cornerRadius = 20;
    button.background = "red";

    button.onPointerUpObservable.add(() => {
      onClick();
    });
    advtex.addControl(button);
    return button;
  }

 function createArcRotateCamera(scene: Scene) {
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
    scene,
  );
  //camera.attachControl(true);
  return camera;
}
  
  //----------------------------------------------------------
  //BOTTOM OF CODE - MAIN RENDERING AREA FOR YOUR SCENE
  export default function menuScene(engine: Engine) {
    interface SceneData {
      scene: Scene;
      advancedTexture: GUI.AdvancedDynamicTexture;
      button1: GUI.Button;
      button2: GUI.Button;
      button3: GUI.Button;
      camera: Camera;
    }
  
    //----------------------------------------------------------
    let scene = new Scene(engine);
    let advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true);

    // Play Button - Change Scene and Remove GUI
    var button1 = createSceneButton(
      scene,
      "but1",
      "PLAY",
      1,
      "0px",
      "-60px",
      advancedTexture,
      () => {
        setSceneIndex(1); // Change to the first scene
        advancedTexture.dispose(); // Remove GUI elements
      }
    );

    // Options Button - Show Alert
    var button2 = createSceneButton(
      scene,
      "but2",
      "OPTIONS",
      2,
      "0px",
      "0px",
      advancedTexture,
      () => {
        alert("OPTIONS WAS SELECTED!");
      }
    );

    // Quit Button - Show Alert
    var button3 = createSceneButton(
      scene,
      "but3",
      "QUIT",
      3,
      "0px",
      "60px",
      advancedTexture,
      () => {
        alert("YOU HAVE QUIT THE GAME!");
      }
    );

    var camera = createArcRotateCamera(scene);

    let that: SceneData = {
      scene,
      advancedTexture,
      button1,
      button2,
      button3,
      camera,
    };
    
    return that;
  }