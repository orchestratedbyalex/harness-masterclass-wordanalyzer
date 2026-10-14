import {
    BackSide,
    CanvasTexture,
    Mesh,
    MeshBasicMaterial,
    MeshStandardMaterial,
    PerspectiveCamera,
    PMREMGenerator,
    Scene,
    SphereGeometry,
    WebGLRenderer,
} from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const FOV = 30;
const RISE_MS = 1400;
const FADE_MS = 700;

// A studio-sky gradient with a dark horizon band: this is what gives chrome its classic look.
const createStudioEnvironment = (): Scene => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(0.38, '#cfd8e3');
    gradient.addColorStop(0.5, '#1b1f27');
    gradient.addColorStop(0.58, '#7d8794');
    gradient.addColorStop(1, '#f2f5f9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 4, 256);

    const env = new Scene();
    env.add(new Mesh(
        new SphereGeometry(10, 32, 16),
        new MeshBasicMaterial({ map: new CanvasTexture(canvas), side: BackSide }),
    ));
    return env;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export interface HeroScene {
    dispose: () => void;
}

// Builds the chrome title inside `container`. `onReady` runs once the first frame is drawn;
// `onFade` receives 0 → 1 while the plain heading should fade out.
export async function createHeroScene(
    container: HTMLElement,
    text: string,
    fontUrl: string,
    onFade: (progress: number) => void,
): Promise<HeroScene> {
    const buffer = await (await fetch(fontUrl)).arrayBuffer();
    const font = new FontLoader().parse(new TTFLoader().parse(buffer));

    const renderer = new WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.className = 'heroCanvas';

    const scene = new Scene();
    const pmrem = new PMREMGenerator(renderer);
    const envMap = pmrem.fromScene(createStudioEnvironment(), 0.02).texture;
    scene.environment = envMap;

    const geometry = new TextGeometry(text, {
        font,
        size: 1,
        height: 0.28,
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 0.04,
        bevelSize: 0.03,
        bevelSegments: 5,
    });
    geometry.computeBoundingBox();
    geometry.center();
    const box = geometry.boundingBox!;
    const textWidth = box.max.x - box.min.x;
    const textHeight = box.max.y - box.min.y;

    const material = new MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0.08 });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const camera = new PerspectiveCamera(FOV, 1, 0.1, 100);
    let travel = 1; // world units the title rises from, set on resize

    const resize = () => {
        const width = Math.max(container.clientWidth, 1);
        const height = Math.max(container.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        const tan = Math.tan((FOV * Math.PI) / 360);
        // distance at which the title fills 96% of the width and ~65% of the height at most
        const byWidth = (textWidth / 0.82 / camera.aspect) / (2 * tan);
        const byHeight = (textHeight / 0.65) / (2 * tan);
        camera.position.set(0, 0, Math.max(byWidth, byHeight));
        camera.updateProjectionMatrix();
        travel = 2 * camera.position.z * tan * 0.7;
    };

    container.appendChild(renderer.domElement);
    resize();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(container);

    let frame = 0;
    let start = 0;
    const render = (now: number) => {
        if (!start) start = now;
        const elapsed = now - start;
        const rise = easeOutCubic(Math.min(elapsed / RISE_MS, 1));
        const bob = Math.sin(elapsed / 1000 * 1.2) * textHeight * 0.06;
        mesh.position.y = -travel * (1 - rise) + bob * rise;
        mesh.rotation.y = Math.sin(elapsed / 1000 * 0.7) * 0.12;
        mesh.rotation.x = Math.sin(elapsed / 1000 * 0.9) * 0.05;
        onFade(Math.min(elapsed / FADE_MS, 1));
        renderer.render(scene, camera);
        frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return {
        dispose: () => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
            geometry.dispose();
            material.dispose();
            envMap.dispose();
            pmrem.dispose();
            renderer.dispose();
            renderer.domElement.remove();
        },
    };
}
