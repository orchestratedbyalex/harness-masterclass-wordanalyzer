import {
    BackSide,
    BufferGeometry,
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
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const FOV = 30;
const RISE_MS = 1400;
const FADE_MS = 700;

// A studio-sky gradient with a dark horizon band: this is what gives chrome its classic look.
const createStudioEnvironment = (): Scene => {
    const canvas = document.createElement('canvas');
    canvas.width = 720;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    [
        [0, '#ffffff'], [0.22, '#e4ebf3'], [0.34, '#5d6673'], [0.42, '#f7f9fc'],
        [0.5, '#0d1016'], [0.56, '#aeb7c3'], [0.7, '#2a303a'], [0.85, '#dfe5ec'], [1, '#ffffff'],
    ].forEach(([stop, color]) => gradient.addColorStop(stop as number, color as string));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 720, 256);

    // Soft vertical stripes (a light-box rig) so flat faces catch light and dark as they move.
    const stripes = ctx.createLinearGradient(0, 0, 720, 0);
    for (let i = 0; i <= 72; i += 1) {
        stripes.addColorStop(i / 72, `rgba(0, 0, 0, ${0.6 * (0.5 + 0.5 * Math.sin(i * Math.PI * 2 / 6))})`);
    }
    ctx.fillStyle = stripes;
    ctx.fillRect(0, 0, 720, 256);

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

    // Laid out glyph by glyph so letters get extra tracking and never touch.
    const tracking = 0.14;
    const glyphScale = 1 / (font.data as any).resolution;
    let cursor = 0;
    const parts: BufferGeometry[] = [];
    for (const char of text) {
        const glyph = (font.data as any).glyphs[char];
        if (!glyph) continue;
        if (char !== ' ') {
            const part = new TextGeometry(char, {
                font,
                size: 1,
                height: 0.1,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: 0.02,
                bevelSize: 0.008,
                bevelSegments: 4,
            });
            part.translate(cursor, 0, 0);
            parts.push(part);
        }
        cursor += glyph.ha * glyphScale + tracking;
    }
    const geometry = mergeGeometries(parts)!;
    parts.forEach((part) => part.dispose());
    geometry.computeBoundingBox();
    geometry.center();
    const box = geometry.boundingBox!;
    const textWidth = box.max.x - box.min.x;
    const textHeight = box.max.y - box.min.y;

    const material = new MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: 0 });
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = -0.04;
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
