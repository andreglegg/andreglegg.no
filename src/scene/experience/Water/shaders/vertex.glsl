varying vec2 csm_vUv;
varying vec3 vWorldPosition;

uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveAmplitude;

void main() {
  
  // Send the uv coordinates to fragmentShader
  csm_vUv = uv;

  // Modify the y position based on sine function, oscillating up and down over time
  float sineOffset = sin(uTime * uWaveSpeed) * uWaveAmplitude;

  // Apply the sine offset to the y component of the position
  vec3 modifiedPosition = position;
  modifiedPosition.z += sineOffset; // z used as y because element is rotated
  
  csm_Position = modifiedPosition;
  vWorldPosition = (modelMatrix * vec4(modifiedPosition, 1.0)).xyz;
  
}
