import React, { useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';

import './HeroTitle.css';

const TITLE = 'The WordAnalyzer';

const hasWebGL = (): boolean => {
    if (typeof window === 'undefined' || typeof (window as any).WebGLRenderingContext === 'undefined') {
        return false;
    }
    try {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
    } catch (e) {
        return false;
    }
};

// The h1 always stays in the DOM for screen readers and tests. When WebGL is available the
// chrome 3D title loads in the background and the plain heading fades out as it rises in.
const HeroTitle: React.FunctionComponent = () => {
    const stageRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || !hasWebGL()) return;

        let disposed = false;
        let dispose: (() => void) | undefined;

        import('./scene')
            .then(({ createHeroScene }) =>
                createHeroScene(
                    stage,
                    TITLE,
                    `${process.env.PUBLIC_URL}/fonts/michroma.woff`,
                    (progress) => {
                        if (headingRef.current) headingRef.current.style.opacity = String(1 - progress);
                    },
                ),
            )
            .then((heroScene) => {
                if (disposed) heroScene.dispose();
                else dispose = heroScene.dispose;
            })
            .catch(() => {
                // Plain heading stays visible.
            });

        return () => {
            disposed = true;
            dispose?.();
        };
    }, []);

    return (
        <div className="heroStage" ref={stageRef}>
            <Typography variant="h1" component="h1" className="mainTitle" ref={headingRef}>
                {TITLE}
            </Typography>
        </div>
    );
};

export default HeroTitle;
