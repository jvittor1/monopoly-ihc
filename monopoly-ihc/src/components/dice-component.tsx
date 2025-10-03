import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { useDiceResult } from "@/contexts/dice-result-overlay-context";
import { useGame } from "@/contexts/game-context";

export default function Dice() {
  const { showDiceResult } = useDiceResult();
  const { movePlayer, nextTurn } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cubeBodyRef = useRef<CANNON.Body | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);

  const [diceNumber, setDiceNumber] = useState<number | null>(null);

  // Detecta a face que está para cima
  const detectTopFace = (body: CANNON.Body) => {
    const up = new CANNON.Vec3(0, 1, 0);
    const axes = [
      new CANNON.Vec3(0, 1, 0), // +Y
      new CANNON.Vec3(0, -1, 0), // -Y
      new CANNON.Vec3(1, 0, 0), // +X
      new CANNON.Vec3(-1, 0, 0), // -X
      new CANNON.Vec3(0, 0, 1), // +Z
      new CANNON.Vec3(0, 0, -1), // -Z
    ];
    const values = [3, 4, 1, 2, 5, 6]; // ajusta conforme orientação do dado
    let bestDot = -1;
    let topFace = 0;

    axes.forEach((axis, i) => {
      const worldAxis = body.quaternion.vmult(axis);
      const dot = worldAxis.dot(up);
      if (dot > bestDot) {
        bestDot = dot;
        topFace = values[i];
      }
    });
    return topFace;
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const containerEl = containerRef.current;
    const canvasEl = canvasRef.current;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      containerEl.clientWidth / containerEl.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 6, 10);
    camera.lookAt(0, 2, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(10, 20, 10);
    light.castShadow = true;
    scene.add(light);

    // --- Física ---
    const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.82, 0) });
    const solver = new CANNON.GSSolver();
    solver.iterations = 10; // aqui funciona
    world.solver = solver;
    worldRef.current = world;

    const diceMaterial = new CANNON.Material("dice");
    const groundMaterial = new CANNON.Material("ground");
    world.addContactMaterial(
      new CANNON.ContactMaterial(diceMaterial, groundMaterial, {
        restitution: 0.3,
        friction: 0.6,
      }),
    );

    // --- chão ---
    const boardBody = new CANNON.Body({ mass: 0, material: groundMaterial });
    boardBody.addShape(new CANNON.Plane());
    boardBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(boardBody);

    const groundMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.4 }),
    );
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // --- dado ---
    const diceSize = 0.6;

    const createFaceWithDots = (count: number) => {
      const size = 256;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = "black";

      const dotRadius = 25;
      const offset = 60;
      const center = size / 2;
      const positions: Record<number, [number, number][]> = {
        1: [[center, center]],
        2: [
          [center - offset, center - offset],
          [center + offset, center + offset],
        ],
        3: [
          [center - offset, center - offset],
          [center, center],
          [center + offset, center + offset],
        ],
        4: [
          [center - offset, center - offset],
          [center - offset, center + offset],
          [center + offset, center - offset],
          [center + offset, center + offset],
        ],
        5: [
          [center - offset, center - offset],
          [center - offset, center + offset],
          [center + offset, center - offset],
          [center + offset, center + offset],
          [center, center],
        ],
        6: [
          [center - offset, center - offset],
          [center - offset, center],
          [center - offset, center + offset],
          [center + offset, center - offset],
          [center + offset, center],
          [center + offset, center + offset],
        ],
      };
      positions[count].forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      });
      return new THREE.CanvasTexture(canvas);
    };

    const materials = [1, 2, 3, 4, 5, 6].map(
      (n) =>
        new THREE.MeshStandardMaterial({
          map: createFaceWithDots(n),
          roughness: 0.5,
          metalness: 0.1,
        }),
    );

    const cubeGeo = new THREE.BoxGeometry(diceSize, diceSize, diceSize);
    const cubeMesh = new THREE.Mesh(cubeGeo, materials);
    cubeMesh.castShadow = true;
    scene.add(cubeMesh);

    const cubeShape = new CANNON.Box(
      new CANNON.Vec3(diceSize / 2, diceSize / 2, diceSize / 2),
    );
    const cubeBody = new CANNON.Body({
      mass: 2,
      material: diceMaterial,
    });
    cubeBody.addShape(cubeShape);
    cubeBody.position.set(0, 2, 0);
    world.addBody(cubeBody);
    cubeBodyRef.current = cubeBody;

    // --- render ---
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      world.step(1 / 60, delta, 3);

      cubeMesh.position.copy(cubeBody.position as unknown as THREE.Vector3);
      cubeMesh.quaternion.copy(
        cubeBody.quaternion as unknown as THREE.Quaternion,
      );

      // detecta quando o dado parou
      const vel = cubeBody.velocity.length();
      const angVel = cubeBody.angularVelocity.length();
      if (vel < 0.05 && angVel < 0.05 && diceNumber === null) {
        setDiceNumber(detectTopFace(cubeBody));
      }

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = containerEl.clientWidth / containerEl.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerEl.clientWidth, containerEl.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  const throwDice = () => {
    const cubeBody = cubeBodyRef.current;
    if (!cubeBody) return;

    setDiceNumber(null);
    cubeBody.wakeUp();
    cubeBody.position.set(0, 2, 0);
    cubeBody.velocity.set(0, 0, 0);
    cubeBody.angularVelocity.set(0, 0, 0);
    cubeBody.quaternion.set(0, 0, 0, 1);

    const forceX = (Math.random() - 0.5) * 5; // Força horizontal (eixo X)
    const forceY = 6; // Força vertical (eixo Y) para o lançamento
    const forceZ = -(Math.random() * 3 + 2); // Força para o fundo (eixo Z)

    cubeBody.applyImpulse(
      new CANNON.Vec3(forceX, forceY, forceZ),
      cubeBody.position,
    );
    cubeBody.angularVelocity.set(
      Math.random() * 5,
      Math.random() * 5,
      Math.random() * 5,
    );

    // espera o dado parar e mostra o resultado
    const checkIfStopped = setInterval(() => {
      const vel = cubeBody.velocity.length();
      const angVel = cubeBody.angularVelocity.length();
      if (vel < 0.05 && angVel < 0.05) {
        const topFace = detectTopFace(cubeBody);
        setDiceNumber(topFace);
        showDiceResult({ value: topFace });
        movePlayer(topFace);
        nextTurn();
        clearInterval(checkIfStopped);
      }
    }, 100);
  };

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <button
        onClick={throwDice}
        className="absolute right-5 bottom-5 rounded-xl bg-blue-600 px-6 py-2 text-white shadow-md transition hover:bg-blue-700"
      >
        Jogar dado
      </button>
    </div>
  );
}
