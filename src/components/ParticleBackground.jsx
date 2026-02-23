import React, { useEffect, useRef } from 'react';

export default function ParticleBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Nodes for neural network effect
        const nodes = [];
        const NODE_COUNT = 80;

        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2 + 1,
                // Mix of saffron, white, and green color nodes
                color: [
                    'rgba(255,153,51,',
                    'rgba(255,255,255,',
                    'rgba(19,136,8,',
                ][Math.floor(Math.random() * 3)],
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.02,
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update positions
            nodes.forEach(n => {
                n.x += n.vx;
                n.y += n.vy;
                n.pulse += n.pulseSpeed;
                if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
            });

            // Draw connections
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 140) {
                        const alpha = ((1 - dist / 140) * 0.2).toFixed(3);
                        // Pick connection color based on nearby nodes
                        const colI = nodes[i].color;
                        ctx.beginPath();
                        ctx.strokeStyle = `${colI}${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            nodes.forEach(n => {
                const pulse = 0.5 + 0.5 * Math.sin(n.pulse);
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + pulse, 0, Math.PI * 2);
                ctx.fillStyle = `${n.color}${0.5 + 0.3 * pulse})`;
                ctx.fill();
            });

            animId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="particle-canvas"
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.7,
            }}
        />
    );
}
