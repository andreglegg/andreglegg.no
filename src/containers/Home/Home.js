import React, { Component } from 'react';
import './Home.css';
import * as FaIcon from 'react-icons/lib/fa';

// Refreshed from Medium by scripts/fetch-writing.js on every build.
import writing from '../../data/writing.json';

import andrePortrait from '../../assets/images/andre-portrait.jpg';
import lastcoilIcon from '../../assets/images/placeholder/lastcoil-icon.jpg';
import lastcoilGameplay from '../../assets/images/placeholder/lastcoil-gameplay.png';
import endlessDescentLogo from '../../assets/images/placeholder/endless-descent-logo.jpg';
import endlessDescentArt from '../../assets/images/placeholder/endless-descent-landscape.jpg';

const appStoreUrl = 'https://apps.apple.com/us/app/lastcoil-snake-battle-royale/id6758517312';
const googlePlayUrl = 'https://play.google.com/store/apps/details?id=io.lastcoil.game';
const endlessDescentAppStoreUrl = 'https://apps.apple.com/app/id6768305126';
const endlessDescentGooglePlayUrl = 'https://play.google.com/store/apps/details?id=no.andreglegg.endlessdescent';
const endlessDescentSiteUrl = 'https://endlessdescent.andreglegg.no/';
const githubUrl = 'https://github.com/andreglegg';
const linkedInUrl = 'https://www.linkedin.com/in/andre-glegg-060a3164';
const toolsSiteUrl = 'https://tools.andreglegg.no/';
const mediumUrl = 'https://medium.com/@andreglegg';
const email = 'andreglegg@me.com';
const treegenConnectCommand = 'claude mcp add --transport http treegen https://mcp.andreglegg.no/treegen';

const external = { target: '_blank', rel: 'noopener noreferrer' };

const posts = writing.posts || [];
const postCount = posts.length;

// Everything shipped and reachable today. Doubles as the hero's navigation, so
// each row has to lead somewhere real. The post count comes from the feed data
// so it cannot go stale when a new article lands.
const liveWork = [
    { name: 'Endless Descent', meta: 'iOS · Android', href: endlessDescentAppStoreUrl, external: true },
    { name: 'LastCoil', meta: 'iOS · Android', href: appStoreUrl, external: true },
    { name: 'treegen', meta: 'Public MCP server', href: toolsSiteUrl, external: true },
    {
        name: 'Writing',
        meta: postCount === 1 ? 'One post on Medium' : postCount + ' posts on Medium',
        href: '#writing',
        external: false
    }
].filter(entry => entry.name !== 'Writing' || postCount > 0);
const classNames = [
    'Home',
    'Nav',
    'NavName',
    'NavLinks',
    'NavContact',
    'Kicker',
    'Manifest',
    'ManifestLabel',
    'ManifestName',
    'ManifestMeta',
    'ManifestGo',
    'Writing',
    'WritingInner',
    'WritingIntro',
    'PostList',
    'PostDate',
    'PostBody',
    'PostTags',
    'PostGo',
    'WritingMore',
    'FooterInner',
    'FooterLead',
    'FooterMail',
    'FooterLinks',
    'FooterHeading',
    'FooterFine',
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
    'Experience',
    'ExperienceLabel',
    'Games',
    'GamesInner',
    'GamesIntro',
    'GamesGrid',
    'GameCard',
    'GameCardFeatured',
    'GameMedia',
    'GameMediaLastCoil',
    'GameContent',
    'GameHeader',
    'GameIcon',
    'GameLogo',
    'GameStatus',
    'GameActions',
    'TagList',
    'ProjectLink',
    'ComingSoonLink',
    'Tools',
    'ToolsInner',
    'ToolsIntro',
    'ToolsGrid',
    'ToolCard',
    'ToolCardHead',
    'ToolIcon',
    'ToolBadge',
    'ToolBadgePrivate',
    'ToolBody',
    'ToolActions',
    'Connect',
    'ConnectLabel',
    'ConnectRow',
    'ConnectCommand',
    'CopyButton',
    'ToolNote',
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
        text: 'LastCoil and Endless Descent are live on iOS and Android, each with a tight arcade loop and the backend pieces needed to support them.'
    },
    {
        icon: <FaIcon.FaCode />,
        title: 'Full-stack delivery',
        text: 'I can handle the boring important parts too: APIs, data, CI/CD, servers, hiring, mentoring, and getting features out the door.'
    }
];

// Most recent first — anyone scanning a CV reads top-down and stops early.
// Only claims already made on the site; no dates beyond the stated 2016 move.
const experience = [
    {
        org: 'Aize',
        work: '3D digital twin viewers and engineering document tooling for serious industrial data.'
    },
    {
        org: 'Fjong',
        work: 'Led full-stack work across rental flows, inventory, subscriptions, and internal tools.'
    },
    {
        org: 'Bitcamp',
        work: 'Taught kids to code.'
    },
    {
        org: 'Greenpeace',
        work: 'First role after moving to Norway in 2016.'
    },
    {
        org: 'Irie FM · ZipFM',
        work: 'Where it started, in Jamaica: web, design, Linux servers, and streaming systems.'
    }
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
    'Android released',
    'Godot',
    'Game Center',
    'Google Play',
    'Leaderboards',
    'Mobile arcade'
];

const tools = [
    {
        id: 'treegen',
        icon: <FaIcon.FaCubes />,
        name: 'treegen',
        status: 'Open to everyone',
        badge: 'Public',
        summary: 'Generates stylized low-poly trees as game-ready GLB or OBJ. Deterministic, so a seed always rebuilds the same tree, with triangle budgets from roughly 1k to 7k.',
        tags: ['MCP server', 'Three.js', 'GLB / OBJ', 'Procedural', 'Node.js'],
        links: [
            { href: toolsSiteUrl, label: 'Try it in the browser', icon: <FaIcon.FaExternalLink /> },
            { href: 'https://github.com/andreglegg/treegen', label: 'Source', icon: <FaIcon.FaGithub /> }
        ]
    },
    {
        id: 'assetcut',
        icon: <FaIcon.FaCut />,
        name: 'assetcut',
        status: 'Private for now',
        badge: 'Private',
        summary: 'Cuts backgrounds off game sprites and exports real transparent PNGs, with slicing and atlas support. It takes arbitrary image uploads, so it stays behind an auth gate rather than running strangers’ files on my hardware.',
        tags: ['Python', 'OpenCV', 'Sprite atlas', 'Alpha cutout'],
        links: [
            { href: 'https://github.com/andreglegg/assetcut', label: 'Source', icon: <FaIcon.FaGithub /> }
        ]
    }
];

// Small clipboard helper. execCommand is the fallback because this site still
// serves visitors on browsers without the async clipboard API.
class CopyCommand extends Component {
    state = { copied: false };

    componentWillUnmount() {
        if (this.timer) {
            window.clearTimeout(this.timer);
        }
    }

    flash = () => {
        this.setState({ copied: true });
        this.timer = window.setTimeout(() => this.setState({ copied: false }), 1800);
    };

    copy = () => {
        const { value } = this.props;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(value).then(this.flash, this.legacyCopy);
            return;
        }

        this.legacyCopy();
    };

    legacyCopy = () => {
        const field = document.createElement('textarea');
        field.value = this.props.value;
        field.setAttribute('readonly', '');
        field.style.position = 'absolute';
        field.style.left = '-9999px';
        document.body.appendChild(field);
        field.select();

        try {
            document.execCommand('copy');
            this.flash();
        } catch (error) {
            // Clipboard is unavailable; the command stays selectable on screen.
        }

        document.body.removeChild(field);
    };

    render() {
        const { copied } = this.state;

        return (
            <div className={classes.ConnectRow}>
                <code className={classes.ConnectCommand}>{this.props.value}</code>
                <button
                    type="button"
                    className={classes.CopyButton}
                    onClick={this.copy}
                    aria-label="Copy the connect command"
                >
                    {copied ? <FaIcon.FaCheck /> : <FaIcon.FaClipboard />}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
        );
    }
}

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
        // The score readout is deliberately not drawn: with no visible game
        // around it, "ENERGY 04" in the corner of a CV reads as debug output.
        // The drifting shapes stay as ambient texture.
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
                <nav className={classes.Nav}>
                    <a className={classes.NavName} href="#top">André Glegg</a>
                    <div className={classes.NavLinks}>
                        <a href="#work">Work</a>
                        <a href="#games">Games</a>
                        <a href="#tools">Tools</a>
                        <a href="#writing">Writing</a>
                        <a className={classes.NavContact} href={`mailto:${email}`}>Get in touch</a>
                    </div>
                </nav>

                <section className={classes.Hero} id="top">
                    <BackgroundMiniGame />
                    <div className={classes.HeroWash} />
                    <div className={classes.HeroContent}>
                        <p className={classes.Kicker}>Full-stack &amp; 3D engineer · Oslo</p>
                        <h1>André Glegg</h1>
                        <p className={classes.Lead}>
                            Jamaican-born, Oslo-based. I build 3D tools for industrial data,
                            realtime systems, and mobile games — and I ship them.
                        </p>

                        {/* The manifest: what is actually running right now, doubling as
                            navigation. Evidence beats adjectives on a portfolio. */}
                        <div className={classes.Manifest}>
                            <p className={classes.ManifestLabel}>
                                <span className={classes.StatusDot} />
                                Live right now
                            </p>
                            <ul>
                                {liveWork.map(entry => (
                                    <li key={entry.name}>
                                        <a href={entry.href} {...(entry.external ? external : {})}>
                                            <span className={classes.ManifestName}>{entry.name}</span>
                                            <span className={classes.ManifestMeta}>{entry.meta}</span>
                                            <span className={classes.ManifestGo} aria-hidden="true">→</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={classes.HeroActions}>
                            <a href={`mailto:${email}`}>
                                <FaIcon.FaEnvelope />
                                Hire me
                            </a>
                            <a href={githubUrl} {...external}>
                                <FaIcon.FaGithub />
                                GitHub
                            </a>
                            <a href={linkedInUrl} {...external}>
                                <FaIcon.FaLinkedin />
                                LinkedIn
                            </a>
                            <a href={mediumUrl} {...external}>
                                <FaIcon.FaMedium />
                                Medium
                            </a>
                        </div>
                    </div>
                </section>

                <section className={classes.Section} id="work">
                    <div className={classes.SectionIntro}>
                        <img
                            src={andrePortrait}
                            alt="André Glegg"
                            className={classes.Portrait}
                            width="640"
                            height="640"
                            loading="lazy"
                        />
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

                    <div className={classes.Experience}>
                        <p className={classes.ExperienceLabel}>Where I have worked</p>
                        <dl>
                            {experience.map(role => (
                                <div key={role.org}>
                                    <dt>{role.org}</dt>
                                    <dd>{role.work}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </section>

                <section className={classes.Games} id="games">
                    <div className={classes.GamesInner}>
                        <div className={classes.GamesIntro}>
                            <div>
                                <p className={classes.Eyebrow}>Games</p>
                                <h2>Released mobile games with sharp loops and the systems to support them.</h2>
                            </div>
                            <p>
                                Endless Descent leads the lineup now that it is out on iOS and Android.
                                LastCoil remains visible as the established multiplayer project.
                            </p>
                        </div>

                        <div className={classes.GamesGrid}>
                            <article className={`${classes.GameCard} ${classes.GameCardFeatured}`} id="endless-descent">
                                <div className={classes.GameMedia}>
                                    <img src={endlessDescentArt} alt="Endless Descent key art" />
                                </div>
                                <div className={classes.GameContent}>
                                    <p className={classes.Eyebrow}>Featured mobile release</p>
                                    <img src={endlessDescentLogo} alt="Endless Descent" className={classes.GameLogo} />
                                    <div className={classes.GameStatus}>
                                        <span><FaIcon.FaApple /> Available on iOS</span>
                                        <span><FaIcon.FaAndroid /> Available on Android</span>
                                    </div>
                                    <p>
                                        Endless Descent is my one-thumb mobile arcade descent game. Wall-kick
                                        through a collapsing tower, dodge traps, collect coins, unlock auras,
                                        and chase your deepest run on the leaderboards.
                                    </p>
                                    <div className={classes.TagList}>
                                        {endlessDescentTags.map(tag => <span key={tag}>{tag}</span>)}
                                    </div>
                                    <div className={classes.GameActions}>
                                        <a className={classes.ProjectLink} href={endlessDescentAppStoreUrl} target="_blank" rel="noopener noreferrer">
                                            <FaIcon.FaApple />
                                            App Store
                                        </a>
                                        <a className={classes.ProjectLink} href={endlessDescentGooglePlayUrl} target="_blank" rel="noopener noreferrer">
                                            <FaIcon.FaAndroid />
                                            Google Play
                                        </a>
                                        <a className={classes.ProjectLink} href={endlessDescentSiteUrl} target="_blank" rel="noopener noreferrer">
                                            <FaIcon.FaExternalLink />
                                            Game site
                                        </a>
                                    </div>
                                </div>
                            </article>

                            <article className={classes.GameCard} id="lastcoil">
                                <div className={`${classes.GameMedia} ${classes.GameMediaLastCoil}`}>
                                    <img src={lastcoilGameplay} alt="LastCoil gameplay screenshot" />
                                </div>
                                <div className={classes.GameContent}>
                                    <p className={classes.Eyebrow}>Also live</p>
                                    <div className={classes.GameHeader}>
                                        <img src={lastcoilIcon} alt="LastCoil app icon" className={classes.GameIcon} />
                                        <div>
                                            <h3>LastCoil</h3>
                                            <p>Fast snake battle royale for iOS and Android.</p>
                                        </div>
                                    </div>
                                    <div className={classes.GameStatus}>
                                        <span><FaIcon.FaApple /> iOS</span>
                                        <span><FaIcon.FaAndroid /> Android</span>
                                    </div>
                                    <p>
                                        LastCoil is my modern take on snake: quick matches, tight mobile controls,
                                        realtime multiplayer, cosmetics, bots, leaderboards, and that one-more-round
                                        feeling.
                                    </p>
                                    <div className={classes.TagList}>
                                        {projectTags.map(tag => <span key={tag}>{tag}</span>)}
                                    </div>
                                    <div className={classes.GameActions}>
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
                            </article>
                        </div>
                    </div>
                </section>

                <section className={classes.Tools} id="tools">
                    <div className={classes.ToolsInner}>
                        <div className={classes.ToolsIntro}>
                            <div>
                                <p className={classes.Eyebrow}>Tools</p>
                                <h2>Tools I built for my own work, hosted so anyone can use them.</h2>
                            </div>
                            <p>
                                These run as remote MCP servers, so an AI coding client like Claude or
                                Codex can call them straight over HTTPS with nothing to install. I wrote
                                the generators, the protocol layer, and the self-hosted infrastructure
                                they run on.
                            </p>
                        </div>

                        <div className={classes.Connect}>
                            <p className={classes.ConnectLabel}>
                                <FaIcon.FaTerminal />
                                Connect treegen in one command
                            </p>
                            <CopyCommand value={treegenConnectCommand} />
                            <p className={classes.ToolNote}>
                                No key needed. Generated meshes come back as download links, so a
                                600&nbsp;KB file never lands in the model's context. The playground at{' '}
                                <a href={toolsSiteUrl} target="_blank" rel="noopener noreferrer">
                                    tools.andreglegg.no
                                </a>{' '}
                                runs entirely in your browser, so you can try it without connecting
                                anything.
                            </p>
                        </div>

                        <div className={classes.ToolsGrid}>
                            {tools.map(tool => (
                                <article className={classes.ToolCard} key={tool.id} id={tool.id}>
                                    <div className={classes.ToolCardHead}>
                                        <span className={classes.ToolIcon}>{tool.icon}</span>
                                        <div>
                                            <h3>{tool.name}</h3>
                                            <p>{tool.status}</p>
                                        </div>
                                        <span
                                            className={
                                                tool.badge === 'Private'
                                                    ? `${classes.ToolBadge} ${classes.ToolBadgePrivate}`
                                                    : classes.ToolBadge
                                            }
                                        >
                                            {tool.badge}
                                        </span>
                                    </div>

                                    <div className={classes.ToolBody}>
                                        <p>{tool.summary}</p>
                                        <div className={classes.TagList}>
                                            {tool.tags.map(tag => <span key={tag}>{tag}</span>)}
                                        </div>
                                    </div>

                                    <div className={classes.ToolActions}>
                                        {tool.links.map(link => (
                                            <a
                                                className={classes.ProjectLink}
                                                href={link.href}
                                                key={link.label}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {link.icon}
                                                {link.label}
                                            </a>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {postCount > 0 && (
                    <section className={classes.Writing} id="writing">
                        <div className={classes.WritingInner}>
                            <div className={classes.WritingIntro}>
                                <div>
                                    <p className={classes.Eyebrow}>Writing</p>
                                    <h2>Notes on building software with language models.</h2>
                                </div>
                                <p>
                                    Mostly what I learn the hard way — where agents actually break,
                                    why tool design outranks prompt wording, and what happens when
                                    you run models on your own hardware.
                                </p>
                            </div>

                            <ol className={classes.PostList}>
                                {posts.map(post => (
                                    <li key={post.url}>
                                        <a href={post.url} {...external}>
                                            <time className={classes.PostDate} dateTime={post.published}>
                                                {post.label}
                                            </time>
                                            <div className={classes.PostBody}>
                                                <h3>{post.title}</h3>
                                                {post.summary && <p>{post.summary}</p>}
                                                {post.tags.length > 0 && (
                                                    <div className={classes.PostTags}>
                                                        {post.tags.map(tag => (
                                                            <span key={tag}>{tag.replace(/-/g, ' ')}</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <span className={classes.PostGo} aria-hidden="true">→</span>
                                        </a>
                                    </li>
                                ))}
                            </ol>

                            <a className={classes.WritingMore} href={mediumUrl} {...external}>
                                <FaIcon.FaMedium />
                                Read everything on Medium
                            </a>
                        </div>
                    </section>
                )}

                <footer className={classes.Footer} id="contact">
                    <div className={classes.FooterInner}>
                        <div className={classes.FooterLead}>
                            <p className={classes.Eyebrow}>Get in touch</p>
                            <h2>Open to interesting work.</h2>
                            <p>
                                Best reached by email. I read everything and reply to anything
                                that is not a template.
                            </p>
                            <a className={classes.FooterMail} href={`mailto:${email}`}>
                                <FaIcon.FaEnvelope />
                                {email}
                            </a>
                        </div>

                        <div className={classes.FooterLinks}>
                            <div>
                                <p className={classes.FooterHeading}>Elsewhere</p>
                                <a href={githubUrl} {...external}>GitHub</a>
                                <a href={linkedInUrl} {...external}>LinkedIn</a>
                                <a href={mediumUrl} {...external}>Medium</a>
                            </div>
                            <div>
                                <p className={classes.FooterHeading}>Projects</p>
                                <a href={endlessDescentSiteUrl} {...external}>Endless Descent</a>
                                <a href={appStoreUrl} {...external}>LastCoil</a>
                                <a href={toolsSiteUrl} {...external}>Tools</a>
                            </div>
                        </div>
                    </div>
                    <p className={classes.FooterFine}>Built and hosted by me · Oslo, Norway</p>
                </footer>
            </main>
        );
    }
}

export default Home;
