import { Scene, ArcRotateCamera, Vector3, MeshBuilder, Mesh, StandardMaterial, HemisphericLight, Color3, Texture, CubeTexture, Vector4, SpriteManager, Sprite } from "@babylonjs/core";
function createTerrain(scene) {
    const largeGroundMat = new StandardMaterial("largeGroundMat");
    largeGroundMat.diffuseTexture = new Texture("./assets/environments/valleygrass.png");
    const largeGround = MeshBuilder.CreateGroundFromHeightMap("largeGround", "./assets/environments/villageheightmap.png", {
        width: 150,
        height: 150,
        subdivisions: 20,
        minHeight: 0,
        maxHeight: 10,
    }, scene);
    largeGround.material = largeGroundMat;
    largeGround.position.y = -0.01;
}
function createGround(scene) {
    const groundMaterial = new StandardMaterial("groundMaterial");
    groundMaterial.diffuseTexture = new Texture("./assets/environments/villagegreen.png");
    groundMaterial.diffuseTexture.hasAlpha = true;
    groundMaterial.backFaceCulling = false;
    const ground = MeshBuilder.CreateGround("ground", { width: 24, height: 24 }, scene);
    ground.material = groundMaterial;
    ground.position.y = 0.01;
    return ground;
}
function createSky(scene) {
    const skybox = MeshBuilder.CreateBox("skyBox", { size: 150 }, scene);
    const skyboxMaterial = new StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new CubeTexture("./assets/textures/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode =
        Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new Color3(0, 0, 0);
    skyboxMaterial.specularColor = new Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    return skybox;
}
function createBox(style) {
    const boxMat = new StandardMaterial("boxMat");
    const faceUV = [];
    if (style == 1) {
        boxMat.diffuseTexture = new Texture("./assets/textures/cubehouse.png");
        faceUV[0] = new Vector4(0.5, 0.0, 0.75, 1.0);
        faceUV[1] = new Vector4(0.0, 0.0, 0.25, 1.0);
        faceUV[2] = new Vector4(0.25, 0, 0.5, 1.0);
        faceUV[3] = new Vector4(0.75, 0, 1.0, 1.0);
    }
    else {
        boxMat.diffuseTexture = new Texture("./assets/textures/semihouse.png");
        faceUV[0] = new Vector4(0.6, 0.0, 1.0, 1.0);
        faceUV[1] = new Vector4(0.0, 0.0, 0.4, 1.0);
        faceUV[2] = new Vector4(0.4, 0, 0.6, 1.0);
        faceUV[3] = new Vector4(0.4, 0, 0.6, 1.0);
    }
    const box = MeshBuilder.CreateBox("box", {
        width: style,
        height: 1,
        faceUV: faceUV,
        wrap: true,
    });
    box.position = new Vector3(0, 0.5, 0);
    box.scaling = new Vector3(1, 1, 1);
    box.material = boxMat;
    return box;
}
function createRoof(style) {
    const roof = MeshBuilder.CreateCylinder("roof", {
        diameter: 1.3,
        height: 1.2,
        tessellation: 3,
    });
    roof.scaling.x = 0.75;
    roof.scaling.y = style * 0.85;
    roof.rotation.z = Math.PI / 2;
    roof.position.y = 1.22;
    const roofMat = new StandardMaterial("roofMat");
    roofMat.diffuseTexture = new Texture("./assets/textures/roof.jpg");
    roof.material = roofMat;
    return roof;
}
function createHouse(_scene, style) {
    const box = createBox(style);
    const roof = createRoof(style);
    const house = Mesh.MergeMeshes([box, roof], true, false, undefined, false, true);
    return house;
}
function createHouses(scene, style) {
    if (style == 1) {
        createHouse(scene, 1);
    }
    if (style == 2) {
        createHouse(scene, 2);
    }
    if (style == 3) {
        const houses = [];
        houses[0] = createHouse(scene, 1);
        houses[0].rotation.y = -Math.PI / 16;
        houses[0].position.x = -6.8;
        houses[0].position.z = 2.5;
        houses[1] = createHouse(scene, 2);
        houses[1].rotation.y = -Math.PI / 16;
        houses[1].position.x = -4.5;
        houses[1].position.z = 3;
        const ihouses = [];
        const places = [];
        places.push([2, -Math.PI / 16, -1.5, 4]);
        places.push([2, -Math.PI / 3, 1.5, 6]);
        places.push([2, (15 * Math.PI) / 16, -6.4, -1.5]);
        places.push([1, (15 * Math.PI) / 16, -4.1, -1]);
        places.push([2, (15 * Math.PI) / 16, -2.1, -0.5]);
        places.push([1, (5 * Math.PI) / 4, 0, -1]);
        places.push([1, Math.PI + Math.PI / 2.5, 0.5, -3]);
        places.push([2, Math.PI + Math.PI / 2.1, 0.75, -5]);
        places.push([1, Math.PI + Math.PI / 2.25, 0.75, -7]);
        places.push([2, Math.PI / 1.9, 4.75, -1]);
        places.push([1, Math.PI / 1.95, 4.5, -3]);
        places.push([2, Math.PI / 1.9, 4.75, -5]);
        places.push([1, Math.PI / 1.9, 4.75, -7]);
        places.push([2, -Math.PI / 3, 5.25, 2]);
        places.push([1, -Math.PI / 3, 6, 4]);
        for (let i = 0; i < places.length; i++) {
            if (places[i][0] === 1) {
                ihouses[i] = houses[0].createInstance("house" + i);
            }
            else {
                ihouses[i] = houses[1].createInstance("house" + i);
            }
            ihouses[i].rotation.y = places[i][1];
            ihouses[i].position.x = places[i][2];
            ihouses[i].position.z = places[i][3];
        }
    }
}
function createTrees(scene) {
    const spriteManagerTrees = new SpriteManager("treesManager", "./assets/sprites/tree.png", 2000, { width: 512, height: 1024 }, scene);
    for (let i = 0; i < 500; i++) {
        const tree = new Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * -30;
        tree.position.z = Math.random() * 20 + 8;
        tree.position.y = 0.2;
    }
    for (let i = 0; i < 500; i++) {
        const tree = new Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * 25 + 7;
        tree.position.z = Math.random() * -35 + 8;
        tree.position.y = 0.2;
    }
}
function createHemisphericLight(scene) {
    const light = new HemisphericLight("light", new Vector3(2, 1, 0), scene);
    light.intensity = 0.8;
    light.diffuse = new Color3(1, 1, 1);
    light.specular = new Color3(1, 0.8, 0.8);
    light.groundColor = new Color3(0, 0.2, 0.7);
    return light;
}
function createArcRotateCamera(scene) {
    let camAlpha = -Math.PI / 2, camBeta = Math.PI / 2.5, camDist = 18, camTarget = new Vector3(0, 0, 0);
    let camera = new ArcRotateCamera("camera1", camAlpha, camBeta, camDist, camTarget, scene);
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 18;
    camera.lowerAlphaLimit = 0;
    camera.upperAlphaLimit = Math.PI * 2;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2.02;
    camera.attachControl(true);
    return camera;
}
export default function createStartScene(engine) {
    let scene = new Scene(engine);
    let ground = createGround(scene);
    let sky = createSky(scene);
    let lightHemispheric = createHemisphericLight(scene);
    createHouses(scene, 3);
    createTrees(scene);
    createTerrain(scene);
    let camera = createArcRotateCamera(scene);
    let that = {
        scene,
        ground,
        sky,
        lightHemispheric,
        camera
    };
    return that;
}
