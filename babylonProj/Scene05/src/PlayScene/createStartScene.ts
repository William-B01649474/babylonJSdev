import {
  Scene,
  ArcRotateCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Camera,
  Engine,
  StandardMaterial,
  Texture,
  Color3,
  Animation
} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";

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

function createBackground(scene: Scene) {
  const background = new StandardMaterial("backgroundMaterial", scene);
  background.diffuseTexture = new Texture("./assets/background-image.jpg", scene);
  //scene.clearColor = new Color3(0, 0, 0); // To ensure no default clear color shows through
  scene.defaultMaterial = background;
}

function createArcRotateCamera(scene: Scene): Camera {
  let camAlpha = -Math.PI / 2,
      camBeta = Math.PI / 4,
      camDist = 15,
      camTarget = new Vector3(0, 0, 0);

  let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
  camera.attachControl(scene.getEngine().getRenderingCanvas(), true);
  return camera;
}

function createGUI(_scene: Scene, counter: { value: number }) {
  const advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true);

  // Counter display
  const counterText = new GUI.TextBlock();
  counterText.text = `Jumps: ${counter.value}`;
  counterText.color = "white";
  counterText.fontSize = 24;
  counterText.top = "-40px";
  counterText.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  counterText.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(counterText);

  // Instructions
  const instructions = new GUI.TextBlock();
  instructions.text = "Press SPACE to make the ball jump!";
  instructions.color = "white";
  instructions.fontSize = 18;
  instructions.top = "20px";
  instructions.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  instructions.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(instructions);

  return { counterText, advancedTexture };
}

export default function createJumpingBallScene(engine: Engine) {
  interface SceneData {
      light?: HemisphericLight;
      scene: Scene;
      sphere?: Mesh;
      ground?: Mesh;
      camera?: Camera;
  }

  let that: SceneData = {
      scene: new Scene(engine)
  };

  // Create background
  createBackground(that.scene);

  // Create scene elements
  that.light = createLight(that.scene);
  that.sphere = createSphere(that.scene);
  that.ground = createGround(that.scene);
  that.camera = createArcRotateCamera(that.scene);

  // Jump counter
  const counter = { value: 0 };
  const gui = createGUI(that.scene, counter);

  // Animation for jumping
  const jumpAnimation = new Animation(
      "jumpAnimation",
      "position.y",
      30,
      Animation.ANIMATIONTYPE_FLOAT,
      Animation.ANIMATIONLOOPMODE_CYCLE
  );

  const jumpKeys = [
      { frame: 0, value: 1 }, // Start position
      { frame: 15, value: 3 }, // Peak of the jump
      { frame: 30, value: 1 } // Return to start
  ];

  jumpAnimation.setKeys(jumpKeys);
  that.sphere.animations.push(jumpAnimation);

  // Handle spacebar input
  window.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
          counter.value++;
          gui.counterText.text = `Jumps: ${counter.value}`;
          that.scene.beginAnimation(that.sphere, 0, 30, false);
      }
  });

  return that;
}

