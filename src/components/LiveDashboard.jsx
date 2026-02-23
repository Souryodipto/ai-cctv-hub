import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// ── Simulated camera feeds with locations ──────────────────────────────────
const CAMERAS = [
    { id: 1, label: 'Main Gate', location: 'Entry Zone', icon: '🚪' },
    { id: 2, label: 'Lobby', location: 'Ground Floor', icon: '🏢' },
    { id: 3, label: 'Parking Lot', location: 'Basement B1', icon: '🚗' },
    { id: 4, label: 'Server Room', location: 'Floor 3', icon: '🖥️' },
    { id: 5, label: 'Cafeteria', location: 'Floor 1', icon: '☕' },
    { id: 6, label: 'Rooftop', location: 'Top Floor', icon: '🏙️' },
];

// ── Possible AI detections that fire randomly ──────────────────────────────
const DETECTIONS = [
    { type: 'person', label: 'Person Detected', color: '#FF9933', icon: '👤', severity: 'info' },
    { type: 'crowd', label: 'Crowd Density High', color: '#FFD700', icon: '👥', severity: 'warn' },
    { type: 'fire', label: '🔥 Fire Detected!', color: '#FF4444', icon: '🔥', severity: 'critical' },
    { type: 'weapon', label: '⚠️ Weapon Alert!', color: '#FF2222', icon: '🚨', severity: 'critical' },
    { type: 'loiter', label: 'Loitering Detected', color: '#FF9933', icon: '⚠️', severity: 'warn' },
    { type: 'face', label: 'Unknown Face', color: '#9B67CA', icon: '😶', severity: 'warn' },
    { type: 'safe', label: 'Zone Clear', color: '#138808', icon: '✅', severity: 'safe' },
    { type: 'motion', label: 'Motion Detected', color: '#4A90E2', icon: '📡', severity: 'info' },
    { type: 'count', label: 'People Count: 12', color: '#FF9933', icon: '🔢', severity: 'info' },
    { type: 'intrude', label: 'Perimeter Breach!', color: '#FF2222', icon: '🚨', severity: 'critical' },
];

const AI_TAGS = ['People Counting', 'Fire Detection', 'Crowd Analysis', 'Behavior AI', 'Face Recog.', 'Motion Probe'];

function randomBetween(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ── Single Camera Tile ───────────────────────────────────────────────────
function CameraTile({ cam, isActive, onClick }) {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const [activeDetection, setActiveDetection] = useState(null);
    const [boxes, setBoxes] = useState([]);
    const personCountRef = useRef(randomBetween(1, 8));

    // Generate simulated detection boxes
    const generateBoxes = useCallback(() => {
        const count = randomBetween(1, 3);
        return Array.from({ length: count }, () => ({
            x: randomBetween(5, 70),
            y: randomBetween(10, 60),
            w: randomBetween(12, 25),
            h: randomBetween(18, 32),
            type: Math.random() > 0.3 ? 'person' : Math.random() > 0.5 ? 'object' : 'face',
            conf: (85 + randomBetween(0, 14)) / 100,
        }));
    }, []);

    // Animate the canvas feed
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frame = 0;

        const hues = [200, 210, 195, 205, 215, 200]; // bluish-dark tones per camera
        const baseHue = hues[cam.id % hues.length];

        // ── Scene renderer per camera ──────────────────────────────────────────
        function drawScene(ctx, camId, w, h, frame) {
            const scenes = {
                1: drawGateScene,
                2: drawLobbyScene,
                3: drawParkingScene,
                4: drawServerRoomScene,
                5: drawCafeteriaScene,
                6: drawRooftopScene,
            };
            (scenes[camId] || drawLobbyScene)(ctx, w, h, frame);
        }

        function applyFilmGrain(ctx, w, h) {
            for (let i = 0; i < 120; i++) {
                const gx = Math.random() * w;
                const gy = Math.random() * h;
                ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.035})`;
                ctx.fillRect(gx, gy, 1, 1);
            }
            // CRT scanlines
            ctx.fillStyle = 'rgba(0,0,0,0.06)';
            for (let y = 0; y < h; y += 3) {
                ctx.fillRect(0, y, w, 1);
            }
        }

        function drawPerspectiveFloor(ctx, w, h, floorColor, ceilColor) {
            const grad = ctx.createLinearGradient(0, h * 0.45, 0, h);
            grad.addColorStop(0, floorColor);
            grad.addColorStop(1, 'rgba(0,0,0,0.9)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, h * 0.45, w, h * 0.55);

            const ceilGrad = ctx.createLinearGradient(0, 0, 0, h * 0.45);
            ceilGrad.addColorStop(0, ceilColor);
            ceilGrad.addColorStop(1, 'rgba(30,30,40,0.6)');
            ctx.fillStyle = ceilGrad;
            ctx.fillRect(0, 0, w, h * 0.45);

            // Perspective lines
            ctx.strokeStyle = 'rgba(255,255,255,0.06)';
            ctx.lineWidth = 0.5;
            const vx = w / 2, vy = h * 0.45;
            [0, w * 0.25, w * 0.5, w * 0.75, w].forEach(x => {
                ctx.beginPath(); ctx.moveTo(vx, vy); ctx.lineTo(x, h); ctx.stroke();
            });
        }

        function drawHumanSilhouette(ctx, x, y, scale, alpha) {
            ctx.fillStyle = `rgba(40,50,55,${alpha})`;
            // Body
            ctx.fillRect(x - 5 * scale, y, 10 * scale, 22 * scale);
            // Head
            ctx.beginPath();
            ctx.arc(x, y - 5 * scale, 6 * scale, 0, Math.PI * 2);
            ctx.fill();
            // Arms
            ctx.fillRect(x - 11 * scale, y + 2 * scale, 5 * scale, 14 * scale);
            ctx.fillRect(x + 6 * scale, y + 2 * scale, 5 * scale, 14 * scale);
            // Legs
            ctx.fillRect(x - 5 * scale, y + 22 * scale, 4 * scale, 14 * scale);
            ctx.fillRect(x + 1 * scale, y + 22 * scale, 4 * scale, 14 * scale);
        }

        function drawGateScene(ctx, w, h, frame) {
            // Sky/day exterior — slight blue tint (outdoor daytime CCTV)
            ctx.fillStyle = '#1a2535';
            ctx.fillRect(0, 0, w, h);

            // Ground
            const gGrad = ctx.createLinearGradient(0, h * 0.55, 0, h);
            gGrad.addColorStop(0, '#2a3020');
            gGrad.addColorStop(1, '#181e10');
            ctx.fillStyle = gGrad;
            ctx.fillRect(0, h * 0.55, w, h);

            // Sky gradient
            const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.55);
            skyGrad.addColorStop(0, '#0d1520');
            skyGrad.addColorStop(1, '#1e2d40');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, w, h * 0.55);

            // Gate structure
            ctx.fillStyle = '#2d3540';
            ctx.fillRect(w * 0.2, h * 0.15, w * 0.08, h * 0.45); // left pillar
            ctx.fillRect(w * 0.72, h * 0.15, w * 0.08, h * 0.45); // right pillar
            ctx.fillRect(w * 0.2, h * 0.12, w * 0.6, h * 0.08); // top beam

            // Gate bars (moving slightly)
            ctx.strokeStyle = '#3a4455';
            ctx.lineWidth = 3;
            for (let i = 0; i < 8; i++) {
                const bx = w * 0.28 + i * (w * 0.44 / 8);
                ctx.beginPath(); ctx.moveTo(bx, h * 0.2); ctx.lineTo(bx, h * 0.55); ctx.stroke();
            }

            // Road markings
            ctx.strokeStyle = 'rgba(255,255,255,0.2)';
            ctx.lineWidth = 2;
            ctx.setLineDash([10, 15]);
            ctx.beginPath(); ctx.moveTo(w / 2, h * 0.6); ctx.lineTo(w / 2, h); ctx.stroke();
            ctx.setLineDash([]);

            // Security light (orange glow at top of gate)
            const glowX = w * 0.5, glowY = h * 0.1;
            const gGlow = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, 30);
            gGlow.addColorStop(0, 'rgba(255,153,51,0.4)');
            gGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = gGlow;
            ctx.fillRect(glowX - 35, glowY - 15, 70, 50);

            // Person at gate
            const px = w * 0.45 + Math.sin(frame * 0.02) * 3;
            drawHumanSilhouette(ctx, px, h * 0.4, 0.85, 0.8);

            // IR night vision vignette
            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.8);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.55)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);

            applyFilmGrain(ctx, w, h);
        }

        function drawLobbyScene(ctx, w, h, frame) {
            // Indoor warm lobby
            ctx.fillStyle = '#12161e';
            ctx.fillRect(0, 0, w, h);
            drawPerspectiveFloor(ctx, w, h, 'rgba(60,55,45,0.8)', 'rgba(25,28,35,0.95)');

            // Back wall with reception desk
            ctx.fillStyle = '#1d2230';
            ctx.fillRect(w * 0.1, h * 0.1, w * 0.8, h * 0.35);

            // Reception counter
            ctx.fillStyle = '#2a3040';
            ctx.fillRect(w * 0.25, h * 0.38, w * 0.5, h * 0.12);
            ctx.fillStyle = '#3d4560';
            ctx.fillRect(w * 0.27, h * 0.32, w * 0.1, h * 0.07); // monitor

            // Wall lights / windows
            [[w * 0.2, h * 0.18], [w * 0.5, h * 0.18], [w * 0.8, h * 0.18]].forEach(([lx, ly]) => {
                const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 20);
                lg.addColorStop(0, 'rgba(255,220,150,0.35)');
                lg.addColorStop(1, 'transparent');
                ctx.fillStyle = lg;
                ctx.fillRect(lx - 25, ly - 10, 50, 40);
                ctx.fillStyle = 'rgba(255,220,150,0.8)';
                ctx.fillRect(lx - 6, ly - 3, 12, 8);
            });

            // People in lobby
            const move1 = Math.sin(frame * 0.025) * 8;
            drawHumanSilhouette(ctx, w * 0.35 + move1, h * 0.35, 0.9, 0.85);
            drawHumanSilhouette(ctx, w * 0.6, h * 0.37, 0.75, 0.75);
            drawHumanSilhouette(ctx, w * 0.15, h * 0.42, 1.0, 0.7);

            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.25, w / 2, h / 2, w * 0.75);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.6)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);
            applyFilmGrain(ctx, w, h);
        }

        function drawParkingScene(ctx, w, h, frame) {
            // Dark parking lot
            ctx.fillStyle = '#0a0d12';
            ctx.fillRect(0, 0, w, h);

            // Concrete floor (green-ish fluorescent tint)
            const flGrad = ctx.createLinearGradient(0, h * 0.5, 0, h);
            flGrad.addColorStop(0, 'rgba(40,50,35,0.9)');
            flGrad.addColorStop(1, '#0d1008');
            ctx.fillStyle = flGrad;
            ctx.fillRect(0, h * 0.5, w, h);

            // Ceiling pipes
            ctx.strokeStyle = '#1a2018';
            ctx.lineWidth = 4;
            [w * 0.25, w * 0.5, w * 0.75].forEach(px => {
                ctx.beginPath(); ctx.moveTo(px, 0); ctx.lineTo(px, h * 0.15); ctx.stroke();
            });

            // Parking bay lines
            ctx.strokeStyle = 'rgba(255,255,100,0.4)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([]);
            [0.15, 0.35, 0.55, 0.75].forEach(x => {
                ctx.beginPath(); ctx.moveTo(w * x, h * 0.5); ctx.lineTo(w * x, h); ctx.stroke();
            });

            // Parked cars as rectangular silhouettes
            ctx.fillStyle = 'rgba(30,40,55,0.9)';
            ctx.fillRect(w * 0.05, h * 0.5, w * 0.28, h * 0.28); // car 1
            ctx.fillRect(w * 0.38, h * 0.52, w * 0.2, h * 0.25); // car 2
            ctx.fillStyle = 'rgba(20,30,45,0.9)';
            ctx.fillRect(w * 0.62, h * 0.5, w * 0.32, h * 0.28); // car 3

            // Car windows
            ctx.fillStyle = 'rgba(60,90,120,0.5)';
            ctx.fillRect(w * 0.08, h * 0.52, w * 0.1, h * 0.08);
            ctx.fillRect(w * 0.19, h * 0.52, w * 0.1, h * 0.08);

            // Fluorescent ceiling lights
            [w * 0.2, w * 0.5, w * 0.8].forEach(lx => {
                const lg = ctx.createRadialGradient(lx, 0, 0, lx, 0, 60);
                lg.addColorStop(0, 'rgba(180,240,180,0.35)');
                lg.addColorStop(1, 'transparent');
                ctx.fillStyle = lg;
                ctx.fillRect(lx - 40, 0, 80, 80);
                ctx.fillStyle = 'rgba(200,255,200,0.6)';
                ctx.fillRect(lx - 12, 2, 24, 4);
            });

            // Walking person
            const px = w * 0.45 + Math.sin(frame * 0.02) * 15;
            drawHumanSilhouette(ctx, px, h * 0.44, 0.9, 0.9);

            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.7)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);
            applyFilmGrain(ctx, w, h);
        }

        function drawServerRoomScene(ctx, w, h, frame) {
            ctx.fillStyle = '#080c10';
            ctx.fillRect(0, 0, w, h);
            drawPerspectiveFloor(ctx, w, h, 'rgba(20,25,35,0.9)', 'rgba(10,15,22,0.95)');

            // Server racks
            const rackW = w * 0.12;
            [0.05, 0.2, 0.35, 0.52, 0.67, 0.82].forEach((rx, i) => {
                ctx.fillStyle = `rgba(${20 + i * 3}, ${25 + i * 2}, ${32 + i * 4}, 0.95)`;
                ctx.fillRect(w * rx, h * 0.08, rackW, h * 0.62);
                // LED lights on each rack
                for (let r = 0; r < 8; r++) {
                    const blink = Math.sin(frame * 0.1 + i + r * 0.7) > 0.5;
                    ctx.fillStyle = blink ? (r % 3 === 0 ? '#00FF41' : '#FF9933') : 'rgba(0,255,65,0.2)';
                    ctx.fillRect(w * rx + 5, h * 0.12 + r * h * 0.07, rackW * 0.4, 3);
                }
            });

            // Raised floor tiles
            ctx.strokeStyle = 'rgba(80,100,120,0.2)';
            ctx.lineWidth = 0.5;
            for (let gx = 0; gx < w; gx += 20) {
                ctx.beginPath(); ctx.moveTo(gx, h * 0.7); ctx.lineTo(gx, h); ctx.stroke();
            }

            // Cool air duct glow
            const airGrad = ctx.createLinearGradient(0, 0, 0, h * 0.08);
            airGrad.addColorStop(0, 'rgba(100,180,255,0.15)');
            airGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = airGrad;
            ctx.fillRect(0, 0, w, h * 0.08);

            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.15, w / 2, h / 2, w * 0.85);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.75)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);
            applyFilmGrain(ctx, w, h);
        }

        function drawCafeteriaScene(ctx, w, h, frame) {
            ctx.fillStyle = '#131820';
            ctx.fillRect(0, 0, w, h);
            drawPerspectiveFloor(ctx, w, h, 'rgba(55,45,38,0.85)', 'rgba(22,22,28,0.95)');

            // Tables
            const tableY = h * 0.52;
            [[w * 0.15, tableY], [w * 0.45, tableY], [w * 0.72, tableY + 5]].forEach(([tx, ty]) => {
                ctx.fillStyle = 'rgba(70,55,45,0.9)';
                ctx.fillRect(tx - 25, ty, 55, 18);
                // Chairs
                ctx.fillStyle = 'rgba(50,40,35,0.85)';
                ctx.fillRect(tx - 20, ty + 16, 14, 14);
                ctx.fillRect(tx + 8, ty + 16, 14, 14);
            });

            // People sitting
            drawHumanSilhouette(ctx, w * 0.18, h * 0.38, 0.75, 0.8);
            drawHumanSilhouette(ctx, w * 0.45, h * 0.38, 0.75, 0.75);

            // Window (back wall fluorescent light)
            ctx.fillStyle = 'rgba(255,240,200,0.15)';
            ctx.fillRect(w * 0.3, h * 0.1, w * 0.4, h * 0.25);
            ctx.strokeStyle = 'rgba(255,240,200,0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(w * 0.3, h * 0.1, w * 0.4, h * 0.25);

            // Warm ceiling lights
            [[w * 0.3, h * 0.05], [w * 0.7, h * 0.05]].forEach(([lx, ly]) => {
                const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 45);
                lg.addColorStop(0, 'rgba(255,220,130,0.3)');
                lg.addColorStop(1, 'transparent');
                ctx.fillStyle = lg;
                ctx.fillRect(lx - 50, ly, 100, 80);
            });

            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.78);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.62)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);
            applyFilmGrain(ctx, w, h);
        }

        function drawRooftopScene(ctx, w, h, frame) {
            // Night sky exterior
            const sky = ctx.createLinearGradient(0, 0, 0, h * 0.55);
            sky.addColorStop(0, '#05080f');
            sky.addColorStop(1, '#0d1825');
            ctx.fillStyle = sky;
            ctx.fillRect(0, 0, w, h * 0.55);

            // Stars
            for (let i = 0; i < 30; i++) {
                const sx = (i * 137 + 50) % w;
                const sy = (i * 83 + 20) % (h * 0.4);
                const twinkle = 0.4 + 0.5 * Math.abs(Math.sin(frame * 0.04 + i));
                ctx.fillStyle = `rgba(255,255,255,${twinkle * 0.7})`;
                ctx.fillRect(sx, sy, 1, 1);
            }

            // Rooftop surface
            const roof = ctx.createLinearGradient(0, h * 0.5, 0, h);
            roof.addColorStop(0, '#1a2015');
            roof.addColorStop(1, '#0a0f0a');
            ctx.fillStyle = roof;
            ctx.fillRect(0, h * 0.5, w, h);

            // HVAC/ventilation units
            ctx.fillStyle = '#1e2830';
            ctx.fillRect(w * 0.1, h * 0.35, w * 0.2, h * 0.2);
            ctx.fillRect(w * 0.6, h * 0.38, w * 0.15, h * 0.15);

            // City lights glow on horizon
            const cityGlow = ctx.createLinearGradient(0, h * 0.48, 0, h * 0.58);
            cityGlow.addColorStop(0, 'rgba(255,140,50,0.2)');
            cityGlow.addColorStop(1, 'transparent');
            ctx.fillStyle = cityGlow;
            ctx.fillRect(0, h * 0.42, w, h * 0.2);

            // Building silhouettes on horizon
            ctx.fillStyle = '#060a08';
            [[0, 0.35, 0.12, 0.18], [w * 0.15, 0.3, 0.1, 0.23], [w * 0.55, 0.32, 0.13, 0.21], [w * 0.78, 0.28, 0.15, 0.25]].forEach(([bx, byRatio, bwRatio, bhRatio]) => {
                ctx.fillRect(bx, h * byRatio, w * bwRatio, h * bhRatio);
            });

            // Antenna / pole
            ctx.strokeStyle = '#2a3530';
            ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(w * 0.85, h * 0.12); ctx.lineTo(w * 0.85, h * 0.52); ctx.stroke();
            const pulseBlink = Math.sin(frame * 0.08) > 0.3;
            ctx.fillStyle = pulseBlink ? 'rgba(255,50,50,0.9)' : 'rgba(255,50,50,0.2)';
            ctx.beginPath(); ctx.arc(w * 0.85, h * 0.12, 3, 0, Math.PI * 2); ctx.fill();

            const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.15, w / 2, h / 2, w * 0.85);
            vig.addColorStop(0, 'transparent');
            vig.addColorStop(1, 'rgba(0,0,0,0.7)');
            ctx.fillStyle = vig;
            ctx.fillRect(0, 0, w, h);
            applyFilmGrain(ctx, w, h);
        }

        function renderBoxes(bxs, detection) {
            bxs.forEach(b => {
                const bx = (b.x / 100) * canvas.width;
                const by = (b.y / 100) * canvas.height;
                const bw = (b.w / 100) * canvas.width;
                const bh = (b.h / 100) * canvas.height;

                // Box color based on detection
                const blink = Math.sin(frame * 0.15) > 0;
                const boxColor = detection?.severity === 'critical'
                    ? (blink ? '#FF4444' : '#FF000099')
                    : b.type === 'person' ? '#FF9933'
                        : b.type === 'face' ? '#9B67CA' : '#4A90E2';

                // Corner brackets
                const cs = 8;
                ctx.strokeStyle = boxColor;
                ctx.lineWidth = 1.5;
                const corners = [[bx, by], [bx + bw, by], [bx, by + bh], [bx + bw, by + bh]];
                corners.forEach(([cx, cy]) => {
                    const sx = cx === bx ? 1 : -1;
                    const sy = cy === by ? 1 : -1;
                    ctx.beginPath();
                    ctx.moveTo(cx + sx * cs, cy); ctx.lineTo(cx, cy); ctx.lineTo(cx, cy + sy * cs);
                    ctx.stroke();
                });

                // Label background
                ctx.fillStyle = `${boxColor}CC`;
                ctx.fillRect(bx, by - 14, bw, 13);
                ctx.fillStyle = '#fff';
                ctx.font = `bold ${Math.max(7, bw * 0.2)}px monospace`;
                ctx.fillText(`${b.type.toUpperCase()} ${Math.round(b.conf * 100)}%`, bx + 3, by - 3);
            });
        }

        function renderTimestamp() {
            const now = new Date();
            const ts = now.toTimeString().slice(0, 8);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(4, 4, 74, 14);
            ctx.fillStyle = '#00FF41';
            ctx.font = '8px monospace';
            ctx.fillText(`REC ${ts}`, 7, 14);
        }

        function animate() {
            drawScene(ctx, cam.id, canvas.width, canvas.height, frame);
            renderBoxes(boxes, activeDetection);
            renderTimestamp();
            frame++;
            animRef.current = requestAnimationFrame(animate);
        }
        animate();

        return () => cancelAnimationFrame(animRef.current);
    }, [cam.id, boxes, activeDetection]);

    // Randomly fire detections
    useEffect(() => {
        const t = setInterval(() => {
            const det = DETECTIONS[randomBetween(0, DETECTIONS.length - 1)];
            setActiveDetection(det);
            setBoxes(generateBoxes());
            setTimeout(() => setActiveDetection(null), 2500);
        }, randomBetween(3000, 7000));
        return () => clearInterval(t);
    }, [generateBoxes]);

    const isCritical = activeDetection?.severity === 'critical';

    return (
        <div
            onClick={onClick}
            style={{
                position: 'relative', borderRadius: '12px', overflow: 'hidden',
                border: isCritical ? '2px solid #FF4444' : isActive ? '2px solid #FF9933' : '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: isCritical ? '0 0 20px rgba(255,68,68,0.5)' : isActive ? '0 0 16px rgba(255,153,51,0.3)' : 'none',
                aspectRatio: '16/9',
            }}
        >
            <canvas ref={canvasRef} width={320} height={180} style={{ width: '100%', height: '100%', display: 'block' }} />

            {/* Camera label */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '0.75rem 0.6rem 0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', fontFamily: 'monospace' }}>{cam.icon} CAM-{cam.id.toString().padStart(2, '0')} · {cam.label}</div>
                    <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{cam.location}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }} style={{ width: '5px', height: '5px', borderRadius: '50%', background: isCritical ? '#FF4444' : '#00FF41' }} />
                    <span style={{ fontSize: '0.55rem', color: isCritical ? '#FF6666' : '#00FF41', fontFamily: 'monospace', fontWeight: 700 }}>{isCritical ? 'ALERT' : 'LIVE'}</span>
                </div>
            </div>

            {/* Detection badge */}
            <AnimatePresence>
                {activeDetection && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{
                            position: 'absolute', top: '6px', right: '6px',
                            padding: '3px 8px', borderRadius: '6px',
                            background: `${activeDetection.color}EE`,
                            fontSize: '0.6rem', fontWeight: 700, color: '#000',
                            fontFamily: 'monospace', maxWidth: '110px',
                            boxShadow: `0 0 10px ${activeDetection.color}`,
                        }}
                    >
                        {activeDetection.icon} {activeDetection.label}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* People count */}
            <div style={{ position: 'absolute', top: '20px', left: '6px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(0,0,0,0.6)', fontSize: '0.55rem', color: '#FF9933', fontFamily: 'monospace' }}>
                👤 {personCountRef.current}
            </div>
        </div>
    );
}

// ── Live Alert Feed ───────────────────────────────────────────────────────
function AlertFeed({ alerts }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '320px', overflowY: 'auto' }}>
            <div style={{ fontSize: '0.7rem', color: '#FF9933', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                ⚡ LIVE ALERT FEED
            </div>
            <AnimatePresence initial={false}>
                {alerts.map((a) => (
                    <motion.div
                        key={a.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        style={{
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            background: `${a.color}12`,
                            border: `1px solid ${a.color}33`,
                            display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                        }}
                    >
                        <span style={{ fontSize: '0.8rem', flexShrink: 0 }}>{a.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: a.color, fontFamily: 'monospace' }}>{a.label}</div>
                            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: '1px' }}>
                                CAM-{a.camId.toString().padStart(2, '0')} · {a.camLabel} · {a.time}
                            </div>
                        </div>
                        {a.severity === 'critical' && (
                            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }}
                                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4444', flexShrink: 0, marginTop: '2px' }}
                            />
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
            {alerts.length === 0 && (
                <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', textAlign: 'center', padding: '1rem' }}>Monitoring... No alerts</div>
            )}
        </div>
    );
}

// ── System Stats Panel ────────────────────────────────────────────────────
function SystemStats({ stats }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.7rem', color: '#138808', fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
                📊 SYSTEM STATUS
            </div>
            {[
                { label: 'AI Processing', value: stats.cpu, color: '#FF9933', unit: '%' },
                { label: 'Detection Rate', value: stats.det, color: '#138808', unit: '%' },
                { label: 'Network Latency', value: stats.latency, color: '#9B67CA', unit: 'ms' },
                { label: 'Active Streams', value: 6, color: '#FFD700', unit: ' cams', isStatic: true },
            ].map(s => (
                <div key={s.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>{s.label}</span>
                        <span style={{ fontSize: '0.65rem', fontWeight: 700, color: s.color, fontFamily: 'monospace' }}>{s.isStatic ? s.value : s.value.toFixed(s.unit === 'ms' ? 0 : 1)}{s.unit}</span>
                    </div>
                    {!s.isStatic && (
                        <div style={{ height: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                            <motion.div
                                animate={{ width: `${s.value}%` }}
                                transition={{ duration: 0.5 }}
                                style={{ height: '100%', background: s.color, borderRadius: '2px' }}
                            />
                        </div>
                    )}
                </div>
            ))}

            {/* Active AI Models */}
            <div style={{ marginTop: '0.25rem' }}>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginBottom: '0.4rem' }}>ACTIVE AI MODULES</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                    {AI_TAGS.map(t => (
                        <div key={t} style={{ padding: '2px 7px', borderRadius: '5px', background: 'rgba(255,153,51,0.1)', border: '1px solid rgba(255,153,51,0.2)', fontSize: '0.58rem', color: '#FF9933', fontFamily: 'monospace' }}>
                            ✓ {t}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Main Live Dashboard Component ─────────────────────────────────────────
export default function LiveDashboard() {
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const [activeCamera, setActiveCamera] = useState(1);
    const [alerts, setAlerts] = useState([]);
    const [systemStats, setSystemStats] = useState({ cpu: 72.4, det: 99.2, latency: 2 });

    // Fire random alerts
    useEffect(() => {
        const t = setInterval(() => {
            const cam = CAMERAS[randomBetween(0, CAMERAS.length - 1)];
            const det = DETECTIONS[randomBetween(0, DETECTIONS.length - 1)];
            const now = new Date().toTimeString().slice(0, 8);
            const newAlert = { id: Date.now(), camId: cam.id, camLabel: cam.label, ...det, time: now };
            setAlerts(prev => [newAlert, ...prev].slice(0, 12));
            setSystemStats({
                cpu: 65 + Math.random() * 25,
                det: 97 + Math.random() * 2.5,
                latency: 1.5 + Math.random() * 2,
            });
        }, 2200);
        return () => clearInterval(t);
    }, []);

    return (
        <section ref={ref} id="live-demo" style={{ padding: '5rem 0', position: 'relative', overflow: 'hidden' }}>
            {/* Background */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(19,136,8,0.03) 50%, transparent 100%)', pointerEvents: 'none' }} />

            <div className="container">
                {/* Section header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.25)', borderRadius: '50px', fontSize: '0.72rem', fontWeight: 700, color: '#FF6666', letterSpacing: '0.08em' }}>
                            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF4444' }} />
                            LIVE DEMO — AI CCTV HUB IN ACTION
                        </div>
                    </div>
                    <motion.h2
                        className="heading-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span style={{ color: '#fff' }}>Experience It </span>
                        <span className="text-gradient-saffron">Live</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="body-md"
                        style={{ maxWidth: '580px', margin: '0.75rem auto 0' }}
                    >
                        This is a real-time simulation of what AI CCTV Hub does to your cameras. Watch AI analyze feeds, detect threats, and fire alerts — just like the actual product.
                    </motion.p>
                </div>

                {/* Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        borderRadius: '20px',
                        border: '1px solid rgba(255,153,51,0.15)',
                        overflow: 'hidden',
                        background: 'rgba(3,5,15,0.95)',
                        boxShadow: '0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(255,153,51,0.05)',
                    }}
                >
                    {/* Dashboard top bar */}
                    <div style={{ background: 'rgba(10,12,25,0.98)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            {/* Traffic lights */}
                            {['#FF5F57', '#FFBB30', '#28C840'].map(c => (
                                <div key={c} style={{ width: '10px', height: '10px', borderRadius: '50%', background: c }} />
                            ))}
                            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)', marginLeft: '0.5rem' }}>
                                resurgenix-hub://dashboard/live-monitor
                            </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '0.65rem', color: '#138808', fontFamily: 'monospace', fontWeight: 700 }}>
                                ● 6 FEEDS ACTIVE
                            </div>
                            <div style={{ fontSize: '0.65rem', color: '#FF9933', fontFamily: 'monospace' }}>
                                AI Hub v1.0-beta
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                                {new Date().toLocaleDateString('en-IN')}
                            </div>
                        </div>
                    </div>

                    {/* Main layout */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: '500px' }}>
                        {/* Left: Camera grid */}
                        <div style={{ padding: '1rem', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                            {/* Camera grid */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                                {CAMERAS.map(cam => (
                                    <CameraTile
                                        key={cam.id}
                                        cam={cam}
                                        isActive={activeCamera === cam.id}
                                        onClick={() => setActiveCamera(cam.id)}
                                    />
                                ))}
                            </div>
                            {/* Bottom status bar */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                                <div style={{ display: 'flex', gap: '1.25rem' }}>
                                    {[
                                        { label: 'Zones Active', value: '6/6', color: '#138808' },
                                        { label: 'Today Alerts', value: alerts.length, color: '#FF9933' },
                                        { label: 'People Now', value: '47', color: '#9B67CA' },
                                    ].map(s => (
                                        <div key={s.label} style={{ fontSize: '0.65rem', fontFamily: 'monospace' }}>
                                            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}: </span>
                                            <span style={{ color: s.color, fontWeight: 700 }}>{s.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ fontSize: '0.65rem', color: 'rgba(255,153,51,0.6)', fontFamily: 'monospace' }}>
                                    AI Hub • Resurgenix Technologies
                                </div>
                            </div>
                        </div>

                        {/* Right: sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                            {/* Alert feed */}
                            <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', flex: 1, overflow: 'hidden' }}>
                                <AlertFeed alerts={alerts} />
                            </div>
                            {/* System stats */}
                            <div style={{ padding: '1rem' }}>
                                <SystemStats stats={systemStats} />
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={{ background: 'rgba(10,12,25,0.95)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '0.5rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {['People Counting ✓', 'Fire Detection ✓', 'Weapon Alert ✓', 'Behavior AI ✓', 'Real-time Alerts ✓'].map(tag => (
                                <span key={tag} style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: '5px', background: 'rgba(19,136,8,0.1)', border: '1px solid rgba(19,136,8,0.2)', color: '#22C55E', fontFamily: 'monospace' }}>{tag}</span>
                            ))}
                        </div>
                        <div style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'monospace' }}>
                            🇮🇳 Resurgenix Technologies Pvt. Ltd. | MSME | Beta
                        </div>
                    </div>
                </motion.div>

                {/* CTA below dashboard */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.7 }}
                    style={{ textAlign: 'center', marginTop: '2.5rem' }}
                >
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.875rem', marginBottom: '1.25rem' }}>
                        👆 This is a real-time simulation of what the actual AI CCTV Hub does.
                        <br />
                        <span style={{ color: '#FF9933' }}>Your existing cameras + our Hub = This intelligence.</span>
                    </p>
                    <a href="#lead-form" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
                        🚀 Get This for My Business
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
