#define PI 3.141592653589793

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;
uniform float uOffset;
uniform float uSpawnRate;
uniform float uDirection;
uniform float uMinTrail;
uniform float uMaxTrail;
uniform float uBaseStrength;
uniform float uHighlightStrength;
uniform float uWrap;
uniform float uSeed;

#define MAX_STREAKS 5

float hash1(float p) {
  return fract(sin(p * 43758.5453123) * 43758.5453123);
}

float coverageFor(float along, float head, float length, float direction, float wrap) {
  float dir = direction >= 0.0 ? 1.0 : -1.0;
  float alongDir = dir >= 0.0 ? along : 1.0 - along;
  float headDir = dir >= 0.0 ? head : 1.0 - head;

  if (wrap > 0.5) {
    headDir = fract(headDir);
    float diff = alongDir - headDir;
    if (diff > 0.5) diff -= 1.0;
    if (diff < -0.5) diff += 1.0;
    if (diff > 0.0 || diff < -length) return -1.0;
    return clamp(-diff / length, 0.0, 1.0);
  }

  float tail = headDir - length;
  if (alongDir > headDir || alongDir < tail) {
    return -1.0;
  }

  return clamp((headDir - alongDir) / length, 0.0, 1.0);
}

void main() {
  vec3 baseColor = csm_FragColor.rgb;

  float along = clamp(vUv.y, 0.0, 1.0);

  float startFade = smoothstep(0.0, 0.08, along);
  float endFade = smoothstep(0.85, 1.0, along);
  float bodyFade = startFade * (1.0 - endFade);
  if (uWrap > 0.5) {
    float loopEdge = smoothstep(0.0, 0.05, min(along, 1.0 - along));
    bodyFade = loopEdge;
  }

  float radial = pow(sin(vUv.x * PI), 1.8);

  float travel = (uTime * uSpeed + uOffset) * uSpawnRate;
  float cycle = floor(travel);
  float phase = fract(travel);
  float direction = uDirection >= 0.0 ? 1.0 : -1.0;

  float flutterBase = 0.88 + 0.12 * sin((along * 2.5 - uTime * uSpeed * 6.0) * PI + vUv.x * PI * 2.0);

  float accumulatedAlpha = 0.0;
  float glintAccumulator = 0.0;

  for (int i = 0; i < MAX_STREAKS; i++) {
    float id = cycle - float(i);
    float baseSeed = uSeed + id * 17.923 + float(i) * 3.17;
    float start = hash1(baseSeed);
    if (direction < 0.0) {
      start = 1.0 - start;
    }

    float length = mix(uMinTrail, uMaxTrail, hash1(baseSeed + 11.37));
    length = clamp(length, 0.02, 0.18);

    float entryOffset = 0.35 + hash1(baseSeed + 31.7) * 0.35;
    float headPhase = phase + entryOffset + float(i) * (0.6 + hash1(baseSeed + 2.71) * 0.7);
    float head = start + direction * headPhase;
    if (direction < 0.0) {
      head = start - headPhase;
    }

    if (uWrap < 0.5) {
      if (direction >= 0.0) {
        if (head < -(0.2 + length) || (head - length) > 1.1) {
          continue;
        }
      } else {
        if (head > 1.2 + length || (head + length) < -0.1) {
          continue;
        }
      }
    }

    float coverage = coverageFor(along, head, length, direction, uWrap);
    if (coverage < 0.0) {
      continue;
    }

    float headFactor = pow(1.0 - coverage, 1.4);
    float glint = pow(1.0 - coverage, 3.6);
    float streakStrength = mix(0.9, 1.35, hash1(baseSeed + 23.79));
    float flutter = flutterBase * (0.9 + 0.18 * hash1(baseSeed + 5.31));

    float baseContribution = uBaseStrength * headFactor;
    float highlightContribution = uHighlightStrength * glint * flutter;

    accumulatedAlpha += (baseContribution + highlightContribution) * radial * bodyFade * streakStrength;
    glintAccumulator = max(glintAccumulator, glint * streakStrength);
  }

  float alpha = clamp(accumulatedAlpha, 0.0, 1.0);
  vec3 finalColor = baseColor * (0.8 + glintAccumulator * 0.7);

  csm_FragColor = vec4(finalColor, alpha);
}
