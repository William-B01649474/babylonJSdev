import {
    Scene,
    Mesh,
    HemisphericLight,
    Engine,
    Camera,
    GroundMesh,
  } from "@babylonjs/core";
  
  import {Button }  from "@babylonjs/gui/2D";
  
  export interface SceneData {
    scene: Scene;
    //ground:GroundMesh;
    //sky: Mesh;
    //lightHemispheric: HemisphericLight;
    canvas: HTMLCanvasElement;
    engine: Engine;
    //camera: Camera;
  }
  
  export interface GUIData {
    button1:Button;
  }