import React, { Component } from 'react';
import './Home.css';
import * as FaIcon from 'react-icons/lib/fa';

import andrePortrait from '../../assets/images/placeholder/andre.png';
import lastcoilIcon from '../../assets/images/placeholder/lastcoil-icon.jpg';
import lastcoilGameplay from '../../assets/images/placeholder/lastcoil-gameplay.png';
import endlessDescentLogo from '../../assets/images/placeholder/endless-descent-logo.jpg';
import endlessDescentArt from '../../assets/images/placeholder/endless-descent-landscape.jpg';

const appStoreUrl = 'https://apps.apple.com/us/app/lastcoil-snake-battle-royale/id6758517312';
const googlePlayUrl = 'https://play.google.com/store/apps/details?id=io.lastcoil.game';
const endlessDescentAppStoreUrl = 'https://apps.apple.com/app/id6768305126';
const endlessDescentSiteUrl = 'https://endlessdescent.andreglegg.no/';
const githubUrl = 'https://github.com/andreglegg';
const linkedInUrl = 'https://www.linkedin.com/in/andre-glegg-060a3164';
const classNames = [
    'Home',
    'Hero',
    'SceneCanvas',
    'HeroWash',
    'HeroContent',
    'StatusLine',
    'StatusDot',
    'Lead',
    'HeroActions',
    'Section',
    'SectionIntro',
    'Portrait',
    'Eyebrow',
    'FocusGrid',
    'FocusItem',
    'FocusIcon',
    'Timeline',
    'LastCoil',
    'LastCoilCopy',
    'LastCoilTitle',
    'TagList',
    'ProjectLink',
    'DeviceFrame',
    'StoreLinks',
    'EndlessDescent',
    'EndlessCopy',
    'EndlessMedia',
    'EndlessLogo',
    'EndlessStatus',
    'EndlessActions',
    'ComingSoonLink',
    'Footer'
];
const classes = classNames.reduce((acc, name) => {
    acc[name] = name;
    return acc;
}, {});

const focusAreas = [
    {
        icon: <FaIcon.FaCube />,
        title: '3D product systems',
        text: 'I spent the last few years making large industrial models usable in the browser: viewers, document tools, annotations, and fast WebGL experiences.'
    },
    {
        icon: <FaIcon.FaGamepad />,
        title: 'Realtime games',
        text: 'LastCoil is live on iOS and Android. Endless Descent is now live on iOS, with Android testing underway.'
    },
    {
        icon: <FaIcon.FaCode />,
        title: 'Full-stack delivery',
        text: 'I can handle the boring important parts too: APIs, data, CI/CD, servers, hiring, mentoring, and getting features out the door.'
    }
];

const timeline = [
    'Started out in Jamaica doing web, design, Linux servers, and streaming systems for Irie FM and ZipFM.',
    'Moved to Norway in 2016 and kept building: Greenpeace first, then teaching kids code at Bitcamp.',
    'Led full-stack work at Fjong across rental flows, inventory, subscriptions, and internal tools.',
    'At Aize, worked on 3D digital twin viewers and engineering document tooling for serious industrial data.'
];

const projectTags = [
    'LastCoil',
    'iOS',
    'Android',
    'Three.js',
    'Node.js',
    'WebSockets',
    'Redis',
    'PostgreSQL',
    'Fly.io'
];

const endlessDescentTags = [
    'iOS released',
    'Android testing',
    'Godot',
    'Game Center',
    'Leaderboards',
    'Mobile arcade'
];

class BackgroundMiniGame extends Component {
    componentDidMount() {
        this.canvas = this.canvasRef;
        if (!this.canvas) {
            return;
        }

        try {
            this.context = this.canvas.getContext('2d');
        } catch (error) {
            return;
        }

        if (!this.context) {
            return;
        }

        this.pointer = { x: 0, y: 0, active: false };
        this.player = { x: 0, y: 0, vx: 0, vy: 0 };
        this.orbs = [];
        this.hazards = [];
        this.sparks = [];
        this.score = 0;
        this.time = 0;
        this.requestFrame = window.requestAnimationFrame
            ? window.requestAnimationFrame.bind(window)
            : function(callback) {
                return window.setTimeout(callback, 16);
            };
        this.cancelFrame = window.cancelAnimationFrame
            ? window.cancelAnimationFrame.bind(window)
            : window.clearTimeout.bind(window);

        window.addEventListener('resize', this.resize);
        window.addEventListener('mousemove', this.onPointerMove);
        window.addEventListener('touchmove', this.onTouchMove, { passive: true });
        this.resize();
        this.seedWorld();
        this.tick();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        window.removeEventListener('mousemove', this.onPointerMove);
        window.removeEventListener('touchmove', this.onTouchMove);

        if (this.frameId) {
            this.cancelFrame(this.frameId);
        }
    }

    setCanvasRef = (element) => {
        this.canvasRef = element;
    };

    onPointerMove = (event) => {
        this.updatePointer(event.clientX, event.clientY);
    };

    onTouchMove = (event) => {
        if (event.touches && event.touches.length) {
            this.updatePointer(event.touches[0].clientX, event.touches[0].clientY);
        }
    };

    updatePointer = (clientX, clientY) => {
        if (!this.canvas) {
            return;
        }

        const rect = this.canvas.getBoundingClientRect();
        this.pointer = {
            x: clientX - rect.left,
            y: clientY - rect.top,
            active: true
        };
    };

    resize = () => {
        const rect = this.canvas.parentNode.getBoundingClientRect();
        const ratio = window.devicePixelRatio || 1;

        this.width = rect.width;
        this.height = rect.height;
        this.canvas.width = Math.max(1, Math.floor(rect.width * ratio));
        this.canvas.height = Math.max(1, Math.floor(rect.height * ratio));
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        this.context.setTransform(ratio, 0, 0, ratio, 0, 0);

        if (!this.player.x && !this.player.y) {
            this.player.x = this.width * 0.68;
            this.player.y = this.height * 0.48;
        }

        if (this.orbs && this.orbs.length) {
            this.seedWorld();
        }
    };

    seedWorld = () => {
        this.orbs = [];
        this.hazards = [];

        for (let i = 0; i < 14; i += 1) {
            this.orbs.push(this.createOrb(i));
        }

        for (let i = 0; i < 7; i += 1) {
            this.hazards.push({
                x: this.width * (0.5 + Math.random() * 0.46),
                y: this.height * (0.14 + Math.random() * 0.76),
                z: Math.random() * 150,
                size: 24 + Math.random() * 22,
                speed: 0.35 + Math.random() * 0.42,
                phase: Math.random() * Math.PI * 2
            });
        }
    };

    createOrb = (index) => {
        return {
            x: this.width * (0.16 + Math.random() * 0.76),
            y: this.height * (0.14 + Math.random() * 0.74),
            z: 40 + Math.random() * 220,
            r: 5 + Math.random() * 5,
            hue: index % 3 === 0 ? 'gold' : 'gem',
            phase: Math.random() * Math.PI * 2
        };
    };

    project = (point) => {
        const depth = 1 - point.z / 680;
        const sway = Math.sin(this.time * 0.001 + point.z * 0.03) * 10;

        return {
            x: point.x + point.z * 0.24 + sway,
            y: point.y - point.z * 0.16,
            scale: Math.max(0.58, depth),
            depth: depth
        };
    };

    drawLine = (from, to, color, width) => {
        this.context.beginPath();
        this.context.moveTo(from.x, from.y);
        this.context.lineTo(to.x, to.y);
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        this.context.stroke();
    };

    drawBackground = () => {
        const ctx = this.context;
        const gradient = ctx.createLinearGradient(0, 0, this.width, this.height);
        gradient.addColorStop(0, '#f7f3e8');
        gradient.addColorStop(0.48, '#f0eadc');
        gradient.addColorStop(1, '#e8f0ec');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.save();
        ctx.globalAlpha = 0.42;
        ctx.translate(this.width * 0.48, this.height * 0.06);

        const spacing = 44;
        for (let i = -18; i < 26; i += 1) {
            this.drawLine(
                { x: i * spacing, y: -120 },
                { x: i * spacing - 480, y: this.height + 180 },
                'rgba(24, 32, 31, 0.08)',
                1
            );
            this.drawLine(
                { x: i * spacing, y: -120 },
                { x: i * spacing + 640, y: this.height + 180 },
                'rgba(24, 32, 31, 0.055)',
                1
            );
        }

        ctx.restore();
    };

    drawIsometricBlocks = () => {
        const ctx = this.context;

        for (let i = 0; i < 8; i += 1) {
            const x = this.width * (0.52 + (i % 4) * 0.13);
            const y = this.height * (0.26 + Math.floor(i / 4) * 0.28);
            const z = 80 + (i % 3) * 38;
            const p = this.project({ x: x, y: y, z: z });
            const w = (66 + i * 4) * p.scale;
            const h = 34 * p.scale;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y - h);
            ctx.lineTo(p.x + w, p.y);
            ctx.lineTo(p.x, p.y + h);
            ctx.lineTo(p.x - w, p.y);
            ctx.closePath();
            ctx.fillStyle = i % 2 === 0 ? 'rgba(10, 126, 116, 0.055)' : 'rgba(210, 68, 47, 0.045)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(24, 32, 31, 0.11)';
            ctx.stroke();
        }
    };

    drawOrb = (orb) => {
        const ctx = this.context;
        const p = this.project(orb);
        const lift = Math.sin(this.time * 0.003 + orb.phase) * 7;
        const radius = orb.r * p.scale;
        const color = orb.hue === 'gold' ? '#e2a428' : '#7f4fe0';

        ctx.save();
        ctx.translate(p.x, p.y + lift);
        ctx.rotate(this.time * 0.0014 + orb.phase);
        ctx.globalAlpha = 0.72;
        ctx.beginPath();
        ctx.moveTo(0, -radius * 1.7);
        ctx.lineTo(radius * 1.35, 0);
        ctx.lineTo(0, radius * 1.7);
        ctx.lineTo(-radius * 1.35, 0);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 18;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 253, 247, 0.82)';
        ctx.stroke();
        ctx.restore();
    };

    drawHazard = (hazard) => {
        const ctx = this.context;
        const p = this.project(hazard);
        const size = hazard.size * p.scale;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(this.time * 0.001 + hazard.phase);
        ctx.globalAlpha = 0.38;
        ctx.fillStyle = '#d2442f';
        ctx.strokeStyle = 'rgba(24, 32, 31, 0.2)';

        for (let i = 0; i < 4; i += 1) {
            ctx.rotate(Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(size * 0.34, -size * 0.2);
            ctx.lineTo(-size * 0.34, -size * 0.2);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(0, 0, size * 0.34, 0, Math.PI * 2);
        ctx.fillStyle = '#fff7ec';
        ctx.fill();
        ctx.restore();
    };

    drawPlayer = () => {
        const ctx = this.context;
        const bob = Math.sin(this.time * 0.004) * 5;

        ctx.save();
        ctx.translate(this.player.x, this.player.y + bob);
        ctx.rotate(Math.atan2(this.player.vy, this.player.vx || 1) * 0.25);
        ctx.shadowColor = 'rgba(10, 126, 116, 0.35)';
        ctx.shadowBlur = 18;

        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(-12, -14);
        ctx.lineTo(-7, 0);
        ctx.lineTo(-12, 14);
        ctx.closePath();
        ctx.fillStyle = '#0a7e74';
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 253, 247, 0.86)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(6, -3, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#fff7ec';
        ctx.fill();
        ctx.restore();
    };

    addSpark = (x, y, color) => {
        for (let i = 0; i < 10; i += 1) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 3.2;
            this.sparks.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 34 + Math.random() * 18,
                color: color
            });
        }
    };

    drawSparks = () => {
        const ctx = this.context;
        this.sparks = this.sparks.filter(spark => spark.life > 0);
        this.sparks.forEach(spark => {
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vy += 0.02;
            spark.life -= 1;

            ctx.beginPath();
            ctx.arc(spark.x, spark.y, 2.4, 0, Math.PI * 2);
            ctx.fillStyle = spark.color === 'gold'
                ? 'rgba(226, 164, 40, ' + Math.min(0.7, spark.life / 38) + ')'
                : 'rgba(127, 79, 224, ' + Math.min(0.7, spark.life / 38) + ')';
            ctx.fill();
        });
    };

    updateGame = () => {
        const target = this.pointer.active
            ? this.pointer
            : {
                x: this.width * (0.58 + Math.sin(this.time * 0.0008) * 0.28),
                y: this.height * (0.48 + Math.cos(this.time * 0.0007) * 0.23)
            };

        this.player.vx += (target.x - this.player.x) * 0.018;
        this.player.vy += (target.y - this.player.y) * 0.018;
        this.player.vx *= 0.82;
        this.player.vy *= 0.82;
        this.player.x += this.player.vx;
        this.player.y += this.player.vy;

        this.orbs.forEach((orb, index) => {
            const p = this.project(orb);
            const dx = p.x - this.player.x;
            const dy = p.y - this.player.y;
            const hitRadius = 28 + orb.r;

            if (dx * dx + dy * dy < hitRadius * hitRadius) {
                this.score += 1;
                this.addSpark(p.x, p.y, orb.hue);
                this.orbs[index] = this.createOrb(index);
            }
        });

        this.hazards.forEach(hazard => {
            hazard.y += hazard.speed;
            hazard.x += Math.sin(this.time * 0.001 + hazard.phase) * 0.22;
            if (hazard.y > this.height + 90) {
                hazard.y = -80;
                hazard.x = this.width * (0.48 + Math.random() * 0.48);
            }
        });
    };

    drawScore = () => {
        const ctx = this.context;
        ctx.save();
        ctx.globalAlpha = 0.72;
        ctx.font = '700 12px Lato, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillStyle = '#44504c';
        const score = this.score < 10 ? '0' + this.score : String(this.score);
        ctx.fillText('ENERGY ' + score, this.width - 28, this.height - 30);
        ctx.restore();
    };

    tick = () => {
        this.time += 16;
        this.updateGame();
        this.drawBackground();
        this.drawIsometricBlocks();

        this.orbs
            .slice()
            .sort((a, b) => b.z - a.z)
            .forEach(this.drawOrb);

        this.hazards.forEach(this.drawHazard);
        this.drawSparks();
        this.drawPlayer();
        this.drawScore();
        this.frameId = this.requestFrame(this.tick);
    };

    render() {
        return <canvas className={classes.SceneCanvas} ref={this.setCanvasRef} aria-hidden="true" />;
    }
}

class Home extends Component {
    render() {
        return (
            <main className={classes.Home}>
                <section className={classes.Hero}>
                    <BackgroundMiniGame />
                    <div className={classes.HeroWash} />
                    <div className={classes.HeroContent}>
                        <div className={classes.StatusLine}>
                            <span className={classes.StatusDot} />
                            Site rebuild in progress
                        </div>
                        <h1>André Glegg</h1>
                        <p className={classes.Lead}>
                            I'm rebuilding the site properly. Short version for now: I'm a
                            Jamaican-born, Norway-based developer who builds 3D tools, realtime
                            systems, mobile games, and clean web apps.
                        </p>
                        <div className={classes.HeroActions}>
                            <a href="#endless-descent">
                                <FaIcon.FaGamepad />
                                See the games
                            </a>
                            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaGithub />
                                GitHub
                            </a>
                            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaLinkedin />
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </section>

                <section className={classes.Section}>
                    <div className={classes.SectionIntro}>
                        <img src={andrePortrait} alt="Andre Glegg" className={classes.Portrait} />
                        <div>
                            <p className={classes.Eyebrow}>Background</p>
                            <h2>Self-taught, practical, and a little stubborn about making things feel good.</h2>
                            <p>
                                I grew up in Jamaica and started by figuring things out myself: design,
                                websites, servers, streaming, apps, all of it. These days I live in Norway
                                and work across full-stack product engineering, 3D visualization, and game
                                systems.
                            </p>
                        </div>
                    </div>

                    <div className={classes.FocusGrid}>
                        {focusAreas.map(item => (
                            <article className={classes.FocusItem} key={item.title}>
                                <span className={classes.FocusIcon}>{item.icon}</span>
                                <h3>{item.title}</h3>
                                <p>{item.text}</p>
                            </article>
                        ))}
                    </div>

                    <div className={classes.Timeline}>
                        {timeline.map(item => (
                            <p key={item}>{item}</p>
                        ))}
                    </div>
                </section>

                <section className={classes.EndlessDescent} id="endless-descent">
                    <div className={classes.EndlessMedia}>
                        <img src={endlessDescentArt} alt="Endless Descent key art" />
                    </div>
                    <div className={classes.EndlessCopy}>
                        <p className={classes.Eyebrow}>Featured iOS release</p>
                        <img src={endlessDescentLogo} alt="Endless Descent" className={classes.EndlessLogo} />
                        <div className={classes.EndlessStatus}>
                            <span><FaIcon.FaApple /> Available on iOS</span>
                            <span><FaIcon.FaAndroid /> Android testing, coming soon</span>
                        </div>
                        <p>
                            Endless Descent is my one-thumb mobile arcade descent game. Wall-kick
                            through a collapsing tower, dodge traps, collect coins, unlock auras,
                            and chase your deepest run on the leaderboards. The iOS version is out
                            now, and the Android build is in testing.
                        </p>
                        <div className={classes.TagList}>
                            {endlessDescentTags.map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                        <div className={classes.EndlessActions}>
                            <a className={classes.ProjectLink} href={endlessDescentAppStoreUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaApple />
                                App Store
                            </a>
                            <a className={classes.ProjectLink} href={endlessDescentSiteUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaExternalLink />
                                Game site
                            </a>
                            <span className={classes.ComingSoonLink}>
                                <FaIcon.FaAndroid />
                                Google Play soon
                            </span>
                        </div>
                    </div>
                </section>

                <section className={classes.LastCoil} id="lastcoil">
                    <div className={classes.LastCoilCopy}>
                        <p className={classes.Eyebrow}>Also live</p>
                        <div className={classes.LastCoilTitle}>
                            <img src={lastcoilIcon} alt="LastCoil app icon" />
                            <div>
                                <h2>LastCoil</h2>
                                <p>Fast snake battle royale for iOS and Android.</p>
                            </div>
                        </div>
                        <p>
                            LastCoil is my modern take on snake: quick matches, tight mobile controls,
                            realtime multiplayer, cosmetics, bots, leaderboards, and that one-more-round
                            feeling. It is built with TypeScript, Three.js, Node.js WebSockets, Redis,
                            PostgreSQL, and Fly.io.
                        </p>
                        <div className={classes.TagList}>
                            {projectTags.map(tag => <span key={tag}>{tag}</span>)}
                        </div>
                        <div className={classes.StoreLinks}>
                            <a className={classes.ProjectLink} href={appStoreUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaApple />
                                App Store
                            </a>
                            <a className={classes.ProjectLink} href={googlePlayUrl} target="_blank" rel="noopener noreferrer">
                                <FaIcon.FaAndroid />
                                Google Play
                            </a>
                        </div>
                    </div>
                    <div className={classes.DeviceFrame}>
                        <img src={lastcoilGameplay} alt="LastCoil gameplay screenshot" />
                    </div>
                </section>

                <footer className={classes.Footer}>
                    <span>Full site coming soon.</span>
                    <div>
                        <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href={endlessDescentSiteUrl} target="_blank" rel="noopener noreferrer">Endless Descent</a>
                        <a href={appStoreUrl} target="_blank" rel="noopener noreferrer">LastCoil</a>
                    </div>
                </footer>
            </main>
        );
    }
}

export default Home;
