import type React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Dannebrog } from './Dannebrog';
import styles from './SeasonalBackground.module.scss';
import { resolveSeason, type Season } from './season';

// Tuning knobs. These are design decisions rather than content, so they live here
// instead of in the CMS.
// Particle count follows viewport width rather than being fixed, so a phone is not asked
// to render a desktop's worth of them: one particle per 32px of width gives 40 on a 1280px
// desktop. The floor exists because pure density bottoms out around 12 on a phone, which
// leaves the screen looking empty rather than restrained.
const PARTICLE_DENSITY_PX = 32;
const PARTICLE_COUNT = { min: 16, max: 60 };
const SIZE_REM = { min: 1, max: 2.5 };
const FALL_SECONDS = { min: 8, max: 18 };
const SWAY_SECONDS = { min: 3, max: 7 };
const SWAY_REM = { min: 0.5, max: 3 };
const SPIN_DEGREES = { min: 5, max: 25 };

interface IThemeItem {
  /** Relative frequency of this item among the items of its season. */
  readonly weight: number;
  readonly render: () => React.ReactNode;
}

const THEMES: Record<Season, ReadonlyArray<IThemeItem>> = {
  christmas: [
    { weight: 3, render: () => '❄️' },
    { weight: 2, render: () => '🎄' },
    { weight: 2, render: () => '🎁' },
    { weight: 1, render: () => '⭐' },
    { weight: 1, render: () => '✨' },
  ],
  birthday: [
    { weight: 8, render: () => <Dannebrog /> },
    { weight: 1, render: () => '🎂' },
    { weight: 1, render: () => '🎈' },
    { weight: 1, render: () => '🎉' },
  ],
};

interface IParticle {
  readonly render: () => React.ReactNode;
  readonly leftPercent: number;
  readonly sizeRem: number;
  readonly fallSeconds: number;
  readonly fallDelaySeconds: number;
  readonly swaySeconds: number;
  readonly swayDelaySeconds: number;
  readonly swayRem: number;
  readonly spinDegrees: number;
}

function between(min: number, max: number): number {
  return Math.round((min + Math.random() * (max - min)) * 100) / 100;
}

function particleCount(viewportWidth: number): number {
  const derived = Math.round(viewportWidth / PARTICLE_DENSITY_PX);
  return Math.min(PARTICLE_COUNT.max, Math.max(PARTICLE_COUNT.min, derived));
}

function createParticles(season: Season, count: number): ReadonlyArray<IParticle> {
  const pool = THEMES[season].flatMap((item) => Array.from({ length: item.weight }, () => item.render));

  return Array.from({ length: count }, () => {
    const fallSeconds = between(FALL_SECONDS.min, FALL_SECONDS.max);
    const swaySeconds = between(SWAY_SECONDS.min, SWAY_SECONDS.max);

    return {
      render: pool[Math.floor(Math.random() * pool.length)],
      leftPercent: between(0, 100),
      sizeRem: between(SIZE_REM.min, SIZE_REM.max),
      fallSeconds,
      // Negative delays start every particle part-way through its fall, so the field is
      // already full on the first frame — and so pausing the animation for reduced
      // motion leaves the particles scattered rather than parked above the top edge.
      fallDelaySeconds: -between(0, fallSeconds),
      swaySeconds,
      swayDelaySeconds: -between(0, swaySeconds),
      swayRem: between(SWAY_REM.min, SWAY_REM.max),
      spinDegrees: between(SPIN_DEGREES.min, SPIN_DEGREES.max),
    };
  });
}

export interface ISeasonalBackgroundProps {
  /** Forces a season instead of resolving it from the date. Used by the Storybook stories. */
  season?: Season;
}

/**
 * Decorative falling-particle backdrop: Christmas things in November and December,
 * Danish flags and birthday things the rest of the year.
 *
 * The season is resolved in the browser rather than at render time because every route
 * is prerendered to static HTML — a season baked into the build would stay wrong until
 * the next deploy. Nothing therefore renders until after mount.
 */
export function SeasonalBackground(props: ISeasonalBackgroundProps): React.JSX.Element | undefined {
  const [season, setSeason] = useState<Season | undefined>(undefined);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setSeason(props.season ?? resolveSeason(new Date()));
  }, [props.season]);

  useEffect(() => {
    const measure = () => setCount(particleCount(window.innerWidth));
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // The full pool is generated once per season and then sliced to the current count, so a
  // resize adds or removes particles from the tail instead of re-randomising the whole
  // field. Every particle already on screen keeps its position, speed, and phase.
  const pool = useMemo(() => (season ? createParticles(season, PARTICLE_COUNT.max) : []), [season]);

  if (!season || count === 0) {
    return undefined;
  }

  return (
    <div className={styles.layer} aria-hidden="true">
      {pool.slice(0, count).map((particle, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: generated once, never reordered or filtered
          key={index}
          className={styles.fall}
          style={{
            left: `${particle.leftPercent}%`,
            fontSize: `${particle.sizeRem}rem`,
            animationDuration: `${particle.fallSeconds}s`,
            animationDelay: `${particle.fallDelaySeconds}s`,
          }}
        >
          <span
            className={styles.sway}
            style={
              {
                '--sway': `${particle.swayRem}rem`,
                '--spin': `${particle.spinDegrees}deg`,
                animationDuration: `${particle.swaySeconds}s`,
                animationDelay: `${particle.swayDelaySeconds}s`,
              } as React.CSSProperties
            }
          >
            {particle.render()}
          </span>
        </div>
      ))}
    </div>
  );
}
