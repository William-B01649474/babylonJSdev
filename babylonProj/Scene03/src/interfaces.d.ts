import {
  Scene,
  Sound,
  Mesh,
  HemisphericLight,
  Camera,
  AbstractMesh,
} from "@babylonjs/core";

export interface SceneData {
  scene: Scene;
  audio: Sound;
  lightHemispheric: HemisphericLight;
  camera: Camera;
  player: AbstractMesh; // Corrected type
  ground: Mesh;
}

  