import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { useDiceResult } from "@/contexts/dice-result-overlay-context";
import { useGame } from "@/contexts/game-context";
import { BotService } from "@/services/bot-service";
import { motion } from "framer-motion";
import { Dices } from "lucide-react";
interface DiceProps {
  onDiceResult: (value: number) => void;
}

export default function Dice({ onDiceResult }: DiceProps) {
  const { showDiceResult } = useDiceResult();
  const {
    isRoundInProgress,
    setIsRoundInProgress,
    currentPlayer,
    endGameCalled,
  } = useGame();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cubeBodyRef = useRef<CANNON.Body | null>(null);
  const worldRef = useRef<CANNON.World | null>(null);

  const [diceNumber, setDiceNumber] = useState<number | null>(null);

  const [numberOfMoves, setNumberOfMoves] = useState(0);

  const isBotTurn = currentPlayer?.isBot || false;

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
    setIsRoundInProgress(true);
    // console.log("Dado lançado");

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
        const result = detectTopFace(cubeBody);
        setDiceNumber(result);
        showDiceResult({ value: result });
        onDiceResult(result);
        clearInterval(checkIfStopped);
      }
    }, 100);
  };

  useEffect(() => {
    if (
      currentPlayer?.isBot &&
      !isRoundInProgress &&
      !endGameCalled &&
      currentPlayer.jailTurns === 0
    ) {
      const autoBotRoll = async () => {
        await BotService.thinkingDelay();
        throwDice();
      };
      autoBotRoll();
    }
  }, [currentPlayer?.isBot, isRoundInProgress, endGameCalled]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <motion.button
        onClick={throwDice}
        disabled={isRoundInProgress || isBotTurn}
        className="absolute right-4 bottom-4 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        whileHover={!isRoundInProgress && !isBotTurn ? { scale: 1.05 } : {}}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={
            isRoundInProgress
              ? {
                  rotate: 360,
                }
              : {}
          }
          transition={{
            duration: 1.4,
            ease: "easeOut",
          }}
        >
          <div className="rounded-sm bg-gradient-to-br from-slate-800 to-slate-900 p-4 shadow-2xl ring-2 ring-slate-700/50 transition-all group-hover:brightness-110">
            <Dices className="h-10 w-10 text-white" strokeWidth={2} />
          </div>
        </motion.div>
        <motion.span
          className="mt-2 block text-center text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          animate={
            isRoundInProgress ? { opacity: [1, 0.6, 1] } : { opacity: 1 }
          }
          transition={{
            duration: 0.8,
            repeat: isRoundInProgress ? Infinity : 0,
          }}
        >
          Jogar Dado
        </motion.span>
      </motion.button>

      {isBotTurn && (
        <div className="absolute right-4 bottom-32 animate-pulse rounded-md border border-gray-200 bg-white/20 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-sm">
          Bot está jogando...
        </div>
      )}

      <input
        className="absolute top-40 left-8 w-24 rounded border border-gray-200 bg-white/40 p-1 text-center text-white placeholder:text-white focus:border-blue-500 focus:outline-none"
        type="number"
        onChange={(e) => setNumberOfMoves(Number(e.target.value))}
      />
      <button
        onClick={() => onDiceResult(numberOfMoves)}
        className="absolute top-56 left-5 rounded-xl bg-green-600 px-6 py-2 text-white shadow-md transition hover:bg-green-700"
      >
        Mover X casas
      </button>
    </div>
  );
}
