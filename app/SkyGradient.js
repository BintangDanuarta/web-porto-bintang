"use client";

import { useEffect, useRef, useState } from "react";

const THEMES = {
  night: {
    name: "Night sky",
    stops: ["#B9C8F2", "#6E7FBF", "#4A5AA0", "#33406E"],
    tones: { main: [0.43137254901960786, 0.4980392156862745, 0.7490196078431373], low: [0.2, 0.25098039215686274, 0.43137254901960786], mid: [0.2901960784313726, 0.35294117647058826, 0.6274509803921569], high: [0.7254901960784313, 0.7843137254901961, 0.9490196078431372] },
    speed: 14,
    startT: 54.429663680003344,
    distortion: 46,
  },
  day: {
    name: "Blue sky",
    stops: ["#E6F2FF", "#B3D9FF", "#80B3FF", "#6699E6"],
    tones: { main: [0.7019607843137254, 0.8509803921568627, 1], low: [0.4, 0.6, 0.9019607843137255], mid: [0.5019607843137255, 0.7019607843137254, 1], high: [0.9019607843137255, 0.9490196078431372, 1] },
    speed: 22,
    startT: 50.58701168000202,
    distortion: 50,
  },
};
function currentThemeKey() {
  return typeof document !== "undefined" && document.documentElement.dataset.theme === "light" ? "day" : "night";
}
const VERTEX_SHADER = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAGMENT_SHADER = "precision highp float;\nuniform vec2 u_res;\nuniform float u_t;\nuniform vec3 u_main;\nuniform vec3 u_low;\nuniform vec3 u_mid;\nuniform vec3 u_high;\nuniform float u_wind;\nuniform float u_warp;\nuniform float u_nscale;\nuniform sampler2D u_noise;\n\nconst float FBM_STRENGTH = 0.912;\nconst float BLUR_RADIUS = 1.2673;\nconst float ZOOM = 0.3971;\nconst float GRAIN_SCALE = 2.5;\nconst float GRAIN_STRENGTH = 0.014;\n\nvec3 burn(vec3 base, vec3 blend, float op){\n  return max(base + blend - vec3(1.0), vec3(0.0))*op + base*(1.0-op);\n}\nfloat rand2(vec2 n){ return fract(sin(dot(n, vec2(12.9898, 4.1414)))*43758.5453); }\nfloat noise2(vec2 p){\n  vec2 ip = floor(p); vec2 u = fract(p);\n  u = u*u*(3.0-2.0*u);\n  float m = mix(mix(rand2(ip), rand2(ip+vec2(1.,0.)), u.x), mix(rand2(ip+vec2(0.,1.)), rand2(ip+vec2(1.,1.)), u.x), u.y);\n  return m*m;\n}\nfloat fbm4(vec2 x){\n  float v = 0.0; float a = 0.5;\n  vec2 shift = vec2(100.0);\n  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));\n  for (int i = 0; i < 4; i++) { v += a*noise2(x); x = rot*x*2.0 + shift; a *= 0.5; }\n  return v;\n}\nvec4 permute4(vec4 x){ return mod((x*34.0 + 1.0)*x, 289.0); }\nvec4 tisqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314*r; }\nvec3 fade3(vec3 t){ return t*t*t*(t*(t*6.0-15.0)+10.0); }\nfloat cnoise(vec3 P){\n  vec3 Pi0 = floor(P); vec3 Pi1 = Pi0 + vec3(1.0);\n  Pi0 = mod(Pi0, 289.0); Pi1 = mod(Pi1, 289.0);\n  vec3 Pf0 = fract(P); vec3 Pf1 = Pf0 - vec3(1.0);\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.z); vec4 iz1 = vec4(Pi1.z);\n  vec4 ixy = permute4(permute4(ix) + iy);\n  vec4 ixy0 = permute4(ixy + iz0); vec4 ixy1 = permute4(ixy + iz1);\n  vec4 gx0 = ixy0/7.0; vec4 gy0 = fract(floor(gx0)/7.0) - 0.5; gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0); vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0*(step(vec4(0.0), gx0) - 0.5); gy0 -= sz0*(step(vec4(0.0), gy0) - 0.5);\n  vec4 gx1 = ixy1/7.0; vec4 gy1 = fract(floor(gx1)/7.0) - 0.5; gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1); vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1*(step(vec4(0.0), gx1) - 0.5); gy1 -= sz1*(step(vec4(0.0), gy1) - 0.5);\n  vec3 g000 = vec3(gx0.x, gy0.x, gz0.x); vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n  vec3 g010 = vec3(gx0.z, gy0.z, gz0.z); vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n  vec3 g001 = vec3(gx1.x, gy1.x, gz1.x); vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n  vec3 g011 = vec3(gx1.z, gy1.z, gz1.z); vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n  vec4 n0 = tisqrt(vec4(dot(g000,g000), dot(g010,g010), dot(g100,g100), dot(g110,g110)));\n  g000 *= n0.x; g010 *= n0.y; g100 *= n0.z; g110 *= n0.w;\n  vec4 n1 = tisqrt(vec4(dot(g001,g001), dot(g011,g011), dot(g101,g101), dot(g111,g111)));\n  g001 *= n1.x; g011 *= n1.y; g101 *= n1.z; g111 *= n1.w;\n  float n000 = dot(g000, Pf0); float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z)); float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z)); float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz)); float n111 = dot(g111, Pf1);\n  vec3 fx = fade3(Pf0);\n  vec4 nz = mix(vec4(n000,n100,n010,n110), vec4(n001,n101,n011,n111), fx.z);\n  vec2 ny = mix(nz.xy, nz.zw, fx.y);\n  return 2.2*mix(ny.x, ny.y, fx.x);\n}\nuniform vec2 u_dirv;\nvoid main(){\n  vec2 st = gl_FragCoord.xy/u_res - 0.5;\n  st.x *= u_res.x/u_res.y;\n  st = mat2(u_dirv.x, u_dirv.y, -u_dirv.y, u_dirv.x)*st;\n  float time = u_t*0.85;\n  vec2 uv = st*(1.0/(2.0*ZOOM)) + 0.5;\n  float noiseX = cnoise(vec3(uv*u_nscale + vec2(0.0, 74.8572), time*0.3));\n  float noiseY = cnoise(vec3(uv*u_nscale + vec2(203.91282, 10.0), time*0.3));\n  uv += vec2(noiseX*2.0, noiseY)*u_warp;\n  float noiseA = cnoise(vec3(uv*18.0 + vec2(344.91282, 0.0), time*0.3))\n               + cnoise(vec3(uv*39.6 + vec2(723.937, 0.0), time*0.4))*0.5;\n  uv += noiseA*0.02;\n  uv.y -= 0.09;\n  float xf = (sin(time) + 1.0)*0.5;\n  vec2 texUv = uv*GRAIN_SCALE;\n  float d0 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  texUv += vec2(63.861, 368.937);\n  float d1 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  texUv += vec2(453.163, 1649.808);\n  float d3 = mix(texture2D(u_noise, texUv).r - 0.5, texture2D(u_noise, vec2(texUv.x, 1.0-texUv.y)).g - 0.5, xf)*GRAIN_STRENGTH;\n  uv += d0;\n  vec2 stF = uv*u_nscale;\n  vec2 q = vec2(fbm4(stF*0.5 + u_wind*time));\n  vec2 r = vec2(fbm4(stF + q + vec2(0.3, 9.2) + 0.15*time), fbm4(stF + q + vec2(8.3, 0.8) + 0.126*time));\n  float fv = fbm4(stF + r - q);\n  float full = (fv + 0.6*fv*fv + 0.7*fv + 0.5)*0.5;\n  full = pow(full, 0.55)*FBM_STRENGTH;\n  float blurR = BLUR_RADIUS*1.5;\n  vec2 uvA = uv + vec2((full-0.5)*1.2) + vec2(0.0, 0.025) + d0;\n  float snA = noise2(uvA*2.0 + vec2(0.0, time*0.5))*3.0;\n  float lA = pow(smoothstep(snA - 1.2*blurR, snA + 1.2*blurR, (uvA.y - 0.5)*5.0 + 0.5), 0.8);\n  vec2 uvB = uv + vec2((full-0.5)*0.85) + vec2(0.0, 0.025) + d1;\n  float snB = noise2(uvB*4.0 + vec2(293.0, time))*2.8;\n  float lB = pow(smoothstep(snB - 0.9*blurR, snB + 0.9*blurR, (uvB.y - 0.6)*5.0 + 0.5), 0.9);\n  vec2 uvC = uv + vec2((full-0.5)*1.1) + d3;\n  float snC = noise2(uvC*6.0 + vec2(153.0, time*1.2))*2.6;\n  float lC = smoothstep(snC - 0.7*blurR, snC + 0.7*blurR, (uvC.y - 0.9)*6.0 + 0.5);\n  vec3 col = burn(u_main, u_low, 1.0 - lA);\n  col = burn(col, mix(u_main, u_mid, 1.0 - lB), lA);\n  col = mix(col, mix(u_main, u_high, 1.0 - lC), lA*lB);\n  gl_FragColor = vec4(col, 1.0);\n}";

const SCALE = 53;

const SWIRL = 69;
const DIRECTION = 0;
const BLUR = 6;
const FLOW_SPEED_RATE = 1.2;
const MAX_WIDTH = 2560;

function compile(gl, kind, source) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error("Could not create the Sky shader.");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Sky shader failed to compile.";
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

export default function SkyGradient({ className, style, speed, paused = false }) {
  const canvasRef = useRef(null);
  const controlsRef = useRef({ speed, paused });
  controlsRef.current = { speed, paused };
  const [failed, setFailed] = useState(false);
  const [themeKey, setThemeKey] = useState("night");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setThemeKey(currentThemeKey());
    const gl = canvas.getContext("webgl", { alpha: false, antialias: false }) ||
      canvas.getContext("experimental-webgl", { alpha: false, antialias: false });
    if (!gl) { setFailed(true); return; }

    let program = null, buffer = null, texture = null;
    let frame = 0, last = 0, t = THEMES[currentThemeKey()].startT, visible = true, lost = false, disposed = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const destroy = () => {
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      if (program) gl.deleteProgram(program);
      buffer = texture = program = null;
    };
    const effectiveSpeed = () => controlsRef.current.speed ?? THEMES[currentThemeKey()].speed;
    const setup = () => {
      const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
      const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
      program = gl.createProgram();
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.bindAttribLocation(program, 0, "p");
      gl.linkProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Sky program failed to link.");
      }
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      const noise = new Uint8Array(256 * 256 * 4);
      for (let i = 0; i < 256 * 256; i++) {
        const value = (Math.random() * 256) | 0;
        noise[i * 4] = value; noise[i * 4 + 1] = value; noise[i * 4 + 2] = value; noise[i * 4 + 3] = 255;
      }
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noise);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.uniform1i(gl.getUniformLocation(program, "u_noise"), 0);
      const tones = THEMES[currentThemeKey()].tones;
      gl.uniform3fv(gl.getUniformLocation(program, "u_main"), tones.main);
      gl.uniform3fv(gl.getUniformLocation(program, "u_low"), tones.low);
      gl.uniform3fv(gl.getUniformLocation(program, "u_mid"), tones.mid);
      gl.uniform3fv(gl.getUniformLocation(program, "u_high"), tones.high);
      gl.uniform1f(gl.getUniformLocation(program, "u_nscale"), 0.35 + SCALE / 100 * 1.15);
      gl.uniform1f(gl.getUniformLocation(program, "u_warp"), THEMES[currentThemeKey()].distortion / 100 * 0.47);
      gl.uniform1f(gl.getUniformLocation(program, "u_wind"), SWIRL / 100 * 0.36);
      const angle = (DIRECTION % 4) * Math.PI / 2;
      gl.uniform2f(gl.getUniformLocation(program, "u_dirv"), Math.cos(angle), Math.sin(angle));
    };

    const paint = () => {
      if (!program || lost || disposed || canvas.width < 1 || canvas.height < 1) return;
      gl.useProgram(program);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(gl.getUniformLocation(program, "u_res"), canvas.width, canvas.height);
      gl.uniform1f(gl.getUniformLocation(program, "u_t"), t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const active = () => !disposed && !lost && !!program && visible && !document.hidden &&
      !motion.matches && !controlsRef.current.paused && effectiveSpeed() > 0;
    const tick = (now) => {
      frame = 0;
      if (!active()) { last = 0; return; }
      if (last) t += Math.min(0.05, (now - last) / 1000) *
        (Math.min(100, Math.max(0, effectiveSpeed())) / 100) * FLOW_SPEED_RATE;
      last = now;
      paint();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (!active()) { if (frame) cancelAnimationFrame(frame); frame = 0; last = 0; paint(); }
      else if (!frame) { last = 0; paint(); frame = requestAnimationFrame(tick); }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(3, window.devicePixelRatio || 1);
      const scale = Math.min(1, MAX_WIDTH / Math.max(1, rect.width * dpr));
      const width = Math.max(1, Math.round(rect.width * dpr * scale));
      const height = Math.max(1, Math.round(rect.height * dpr * scale));
      if (canvas.width !== width) canvas.width = width;
      if (canvas.height !== height) canvas.height = height;
      paint();
    };
    const onLost = (event) => { event.preventDefault(); lost = true; setFailed(true); };
    const onRestored = () => {
      lost = false;
      try { setup(); setFailed(false); resize(); sync(); }
      catch (error) { console.warn("Sky WebGL restore failed:", error); setFailed(true); }
    };
    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resize);
    observer?.observe(canvas);
    window.addEventListener("resize", resize);
    const intersection = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersection?.observe(canvas);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);

    try { setup(); setFailed(false); resize(); sync(); }
    catch (error) { console.warn("Sky WebGL unavailable:", error); setFailed(true); }

    const themeObserver = new MutationObserver(() => {
      setThemeKey(currentThemeKey());
      last = 0;
      if (lost) return;
      try { t = THEMES[currentThemeKey()].startT; destroy(); setup(); setFailed(false); resize(); sync(); }
      catch (error) { console.warn("Sky theme switch failed:", error); setFailed(true); }
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => {
      disposed = true;
      themeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      intersection?.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      canvas.removeEventListener("webglcontextrestored", onRestored);
      destroy();
    };
  }, []);

  return (
    <div className={className} data-sky-state={failed ? "fallback" : "webgl"} style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%", background: themeKey === "day" ? "#B3D9FF" : "#33406E", ...style }}>
      <canvas ref={canvasRef} role="img" aria-label={THEMES[themeKey].name} style={{
        position: "absolute", inset: 0, display: "block", width: "100%", height: "100%",
        visibility: failed ? "hidden" : "visible",
        transform: BLUR > 0 ? "scale(" + (1 + BLUR / 200) + ")" : undefined,
        filter: BLUR > 0 ? "blur(" + BLUR + "px)" : undefined,
      }} />
    </div>
  );
}

