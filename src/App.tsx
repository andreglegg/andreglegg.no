import { useEffect } from 'react'
import './App.css'

const APPLE_ID = '6768305126'
const storeUrls = {
  apple: `https://apps.apple.com/app/id${APPLE_ID}`,
}

const features = [
  {
    icon: '⚡',
    label: 'One-tap kicks',
  },
  {
    icon: '✦',
    label: 'Auras to unlock',
  },
  {
    icon: '★',
    label: 'Weekly leaderboards',
  },
  {
    icon: '⬇',
    label: 'Endless depth',
  },
]

const preview = {
  poster: '/endless-descent/endless-descent-gameplay-preview-poster.jpg',
  video: '/endless-descent/endless-descent-gameplay-preview.mp4',
}

const screenshots = [
  {
    src: '/endless-descent/screenshots/endless-descent-ios-descend-into-chaos.jpg',
    alt: 'Endless Descent iPhone screenshot showing the player descending through a fiery tower.',
    label: 'Descend into chaos',
  },
  {
    src: '/endless-descent/screenshots/endless-descent-ios-master-wall-kicks.jpg',
    alt: 'Endless Descent iPhone screenshot showing wall-kick movement between tower walls.',
    label: 'Master wall kicks',
  },
  {
    src: '/endless-descent/screenshots/endless-descent-ios-dodge-deadly-traps.jpg',
    alt: 'Endless Descent iPhone screenshot showing traps and hazards in the tower.',
    label: 'Dodge deadly traps',
  },
  {
    src: '/endless-descent/screenshots/endless-descent-ios-chase-coins-build-combos.jpg',
    alt: 'Endless Descent iPhone screenshot showing coins, combos, and arcade scoring.',
    label: 'Chase coins',
  },
  {
    src: '/endless-descent/screenshots/endless-descent-ios-climb-the-leaderboards.jpg',
    alt: 'Endless Descent iPhone screenshot showing leaderboard competition.',
    label: 'Climb leaderboards',
  },
]

const sparkIndexes = Array.from({ length: 20 }, (_, index) => index)

function App() {
  useEffect(() => {
    const referrer = document.referrer
    const fromShare = referrer !== '' && !referrer.includes(location.host)

    if (!fromShare) {
      return
    }

    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      location.replace(storeUrls.apple)
      return
    }

  }, [])

  return (
    <main className="landing">
      <div className="sparks" aria-hidden="true">
        {sparkIndexes.map((index) => (
          <span key={index} />
        ))}
      </div>

      <section className="stage" aria-labelledby="title">
        <p className="wordmark">Endless Descent</p>

        <h1 id="title">
          <img
            src="/assets/logo.webp"
            alt="Endless Descent"
            width="1185"
            height="761"
          />
        </h1>

        <p className="tagline">
          Slide down the walls of an infinite tower. Kick to dodge hazards,
          collect coins, unlock auras, and chase depth.
        </p>

        <div className="stores" aria-label="Store links">
          <a className="store-btn" href={storeUrls.apple}>
            <span className="glyph" aria-hidden="true">
              
            </span>
            <span className="label-stack">
              <span className="top">Download on the</span>
              <span className="bot">App Store</span>
            </span>
          </a>
          <span className="store-btn store-btn--pending" aria-disabled="true">
            <span className="glyph" aria-hidden="true">
              ▶
            </span>
            <span className="label-stack">
              <span className="top">Android</span>
              <span className="bot">Coming soon</span>
            </span>
          </span>
        </div>

        <div className="features" aria-label="Game features">
          {features.map((feature) => (
            <div className="feature" key={feature.label}>
              <span className="icon" aria-hidden="true">
                {feature.icon}
              </span>
              {feature.label}
            </div>
          ))}
        </div>

        <p className="badge">
          <span className="dot" aria-hidden="true" />
          Available now on iOS
        </p>
      </section>

      <section className="media-showcase" aria-labelledby="media-title">
        <div className="media-copy">
          <p className="eyebrow">iOS launch preview</p>
          <h2 id="media-title">See the descent before you drop in</h2>
          <p>
            A 30-second gameplay preview and five App Store screenshots from
            the iPhone launch build.
          </p>
        </div>

        <div className="media-layout">
          <figure className="preview-frame">
            <video
              autoPlay
              controls
              loop
              muted
              playsInline
              poster={preview.poster}
              preload="metadata"
              width="444"
              height="960"
              aria-label="Endless Descent iPhone gameplay preview"
            >
              <source src={preview.video} type="video/mp4" />
            </video>
            <figcaption>
              Wall-kick through the tower, dodge traps, and keep falling.
            </figcaption>
          </figure>

          <div className="shot-strip" aria-label="iPhone screenshots">
            {screenshots.map((screenshot) => (
              <figure className="shot" key={screenshot.src}>
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  loading="lazy"
                  width="424"
                  height="920"
                />
                <figcaption>{screenshot.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <footer className="foot">
        <span>
          by <a href="https://andreglegg.no/">Andre Glegg</a>
        </span>
        <span className="sep" aria-hidden="true">
          ·
        </span>
        <a href="/privacy/">Privacy</a>
        <span className="sep" aria-hidden="true">
          ·
        </span>
        <a href="/terms/">Terms</a>
        <span className="sep" aria-hidden="true">
          ·
        </span>
        <a href="/delete/">Delete data</a>
        <span className="sep" aria-hidden="true">
          ·
        </span>
        <a href="mailto:contact@lastcoil.com">contact@lastcoil.com</a>
      </footer>
    </main>
  )
}

export default App
