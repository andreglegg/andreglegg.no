varying vec3 csm_vPositionW;

uniform float uTime;
uniform float uWaterLevel;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;
uniform float uFoamDepth;
uniform vec3 uMossColor;
uniform vec3 uFoamColor;

void main() {
    
    // Set the current color as the base color
    vec3 baseColor = csm_DiffuseColor.rgb;

    // Paint lower Y with a different color to simulate moss
    float mossFactor = smoothstep(uWaterLevel + 0.3, uWaterLevel - 0.05, csm_vPositionW.y);
    baseColor = mix(baseColor, uMossColor, mossFactor);

    // Foam Effect
    // Get the y position based on sine function, oscillating up and down over time
    float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;

    // The current dynamic water height
    float currentWaterHeight = uWaterLevel + sineOffset;

    float stripe = smoothstep(currentWaterHeight + 0.01, currentWaterHeight - 0.01, csm_vPositionW.y)
                 - smoothstep(currentWaterHeight + uFoamDepth + 0.01, currentWaterHeight + uFoamDepth - 0.01, csm_vPositionW.y);

    vec3 finalColor = mix(baseColor - stripe, uFoamColor, stripe);
    
    // Output the final color
    csm_DiffuseColor = vec4(finalColor, 1.0);
    
}
