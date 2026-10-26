/**
 * Generates the illustrative SVG artwork in public/illustrations.
 *
 * No photography of the Sirjan Branch was available, so the site uses abstract artwork in the
 * institutional palette instead of stock photos that could be mistaken for the real campus.
 * Run `pnpm illustrations` after editing; replace files with official photography when supplied.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'illustrations');
mkdirSync(out, { recursive: true });

const W = 1600;
const H = 1000;
const C = {
  navy: '#12345A', blue: '#155AA8', blue2: '#2878C8', sky: '#DCE8F6', light: '#F1F6FC',
  mid: '#A9C4E6', white: '#FFFFFF', red: '#C62836', sand: '#E9E2D4', sand2: '#D9CDB6',
};

function rng(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

const svg = (body, defs = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><defs>${defs}</defs>${body}</svg>\n`;

const sky = (id, a, b) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`;

function mountains(r, baseY, color, amp, step = 160) {
  let d = `M0 ${H} L0 ${baseY}`;
  for (let x = 0; x <= W + step; x += step) d += ` L${x} ${baseY - r() * amp}`;
  return `<path d="${d} L${W} ${H} Z" fill="${color}"/>`;
}

function grid(color, gap = 80, opacity = 0.35) {
  let p = '';
  for (let x = 0; x <= W; x += gap) p += `M${x} 0V${H}`;
  for (let y = 0; y <= H; y += gap) p += `M0 ${y}H${W}`;
  return `<path d="${p}" stroke="${color}" stroke-width="1" opacity="${opacity}" fill="none"/>`;
}

function building(x, y, w, h, cols, fill = C.white, line = C.navy) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}"/>`;
  s += `<path d="M${x - 30} ${y} L${x + w / 2} ${y - h * 0.32} L${x + w + 30} ${y} Z" fill="${C.navy}"/>`;
  s += `<rect x="${x - 30}" y="${y}" width="${w + 60}" height="18" fill="${C.blue}"/>`;
  const gap = w / cols;
  for (let i = 0; i < cols; i++) s += `<rect x="${x + i * gap + gap * 0.3}" y="${y + 40}" width="${gap * 0.4}" height="${h - 70}" fill="${C.sky}" stroke="${line}" stroke-opacity=".15"/>`;
  s += `<rect x="${x - 40}" y="${y + h - 12}" width="${w + 80}" height="24" fill="${C.navy}" opacity=".9"/>`;
  return s;
}

function tree(x, y, s, color = C.blue) {
  return `<rect x="${x - 4 * s}" y="${y - 40 * s}" width="${8 * s}" height="${40 * s}" fill="${C.navy}"/><circle cx="${x}" cy="${y - 60 * s}" r="${36 * s}" fill="${color}" opacity=".85"/>`;
}

const scenes = {
  campus() {
    const r = rng(7);
    return svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="1240" cy="250" r="110" fill="${C.white}" opacity=".7"/>` +
        mountains(r, 640, C.mid, 140) + mountains(r, 720, '#8DB0DB', 90, 120) +
        `<rect y="780" width="${W}" height="${H - 780}" fill="${C.sand}"/>` +
        building(470, 470, 660, 320, 7) + building(140, 600, 260, 190, 3) + building(1230, 590, 280, 200, 3) +
        tree(90, 800, 1.2) + tree(430, 810, 1) + tree(1180, 810, 1.1) + tree(1540, 805, 1.3) +
        `<rect y="790" width="${W}" height="10" fill="${C.sand2}"/><path d="M560 1000 L760 800 L840 800 L1040 1000 Z" fill="${C.sand2}"/>`,
      sky('s', '#BFD5F0', C.light),
    );
  },
  desert() {
    const r = rng(11);
    return svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/><circle cx="420" cy="300" r="140" fill="${C.white}" opacity=".75"/>` +
        mountains(r, 560, '#9DB9DF', 220, 200) + mountains(r, 660, '#7FA3D4', 160, 150) + mountains(r, 760, C.blue2, 90, 110) +
        `<rect y="820" width="${W}" height="${H - 820}" fill="${C.sand}"/>` + mountains(r, 860, C.sand2, 40, 90),
      sky('s', '#C9DBF2', C.light),
    );
  },
  library() {
    const r = rng(3);
    let books = '';
    for (let shelf = 0; shelf < 4; shelf++) {
      const y = 180 + shelf * 200;
      books += `<rect x="120" y="${y + 160}" width="${W - 240}" height="16" fill="${C.navy}"/>`;
      let x = 140;
      while (x < W - 160) {
        const w = 28 + r() * 34;
        const h = 100 + r() * 55;
        const col = [C.blue, C.navy, C.blue2, C.mid, C.white, C.sky][Math.floor(r() * 6)];
        const lean = r() > 0.93 ? ` transform="rotate(-8 ${x} ${y + 160})"` : '';
        books += `<rect x="${x}" y="${y + 160 - h}" width="${w}" height="${h}" fill="${col}" stroke="${C.navy}" stroke-opacity=".2"${lean}/>`;
        if (r() > 0.85) books += `<rect x="${x}" y="${y + 160 - h + 18}" width="${w}" height="6" fill="${C.red}" opacity=".8"/>`;
        x += w + 4;
      }
    }
    return svg(`<rect width="${W}" height="${H}" fill="${C.light}"/><rect x="100" y="140" width="${W - 200}" height="${H - 220}" fill="${C.sky}"/>${books}`);
  },
  lab() {
    const flask = (x, y, s, liquid) =>
      `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-30 -160 h60 v70 l70 150 a20 20 0 0 1 -18 30 h-164 a20 20 0 0 1 -18 -30 l70 -150 z" fill="${C.white}" stroke="${C.navy}" stroke-width="6"/><path d="M-62 0 h124 l28 60 a20 20 0 0 1 -18 30 h-144 a20 20 0 0 1 -18 -30 z" fill="${liquid}"/><rect x="-40" y="-176" width="80" height="18" rx="4" fill="${C.navy}"/></g>`;
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.light}"/>${grid(C.mid, 64, 0.5)}<rect y="760" width="${W}" height="240" fill="${C.navy}"/><rect y="740" width="${W}" height="24" fill="${C.blue}"/>` +
        flask(420, 650, 1.3, C.blue2) + flask(760, 660, 1, C.mid) + flask(1080, 640, 1.5, C.blue) +
        `<circle cx="1360" cy="560" r="70" fill="none" stroke="${C.navy}" stroke-width="6"/><rect x="1352" y="630" width="16" height="110" fill="${C.navy}"/><circle cx="1360" cy="560" r="30" fill="${C.red}" opacity=".7"/>`,
    );
  },
  research() {
    const r = rng(19);
    const nodes = Array.from({ length: 26 }, () => [120 + r() * (W - 240), 120 + r() * (H - 240), 10 + r() * 26]);
    let lines = '';
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
      if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 330) lines += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${C.mid}" stroke-width="3"/>`;
    }));
    const circles = nodes.map(([x, y, s], i) => `<circle cx="${x}" cy="${y}" r="${s}" fill="${i % 7 === 0 ? C.red : i % 2 ? C.blue : C.navy}"/>`).join('');
    return svg(`<rect width="${W}" height="${H}" fill="url(#s)"/>${lines}${circles}`, sky('s', C.light, C.sky));
  },
  engineering() {
    const gear = (cx, cy, rOuter, teeth, color) => {
      let d = '';
      for (let i = 0; i < teeth * 2; i++) {
        const a = (i / (teeth * 2)) * Math.PI * 2;
        const rr = i % 2 ? rOuter : rOuter * 0.82;
        d += `${i ? 'L' : 'M'}${(cx + rr * Math.cos(a)).toFixed(1)} ${(cy + rr * Math.sin(a)).toFixed(1)}`;
      }
      return `<path d="${d}Z" fill="${color}"/><circle cx="${cx}" cy="${cy}" r="${rOuter * 0.35}" fill="${C.navy}"/>`;
    };
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.navy}"/>${grid(C.blue2, 50, 0.35)}` +
        gear(520, 520, 230, 14, C.blue) + gear(860, 330, 150, 10, C.blue2) + gear(900, 720, 120, 9, C.mid) +
        `<path d="M1080 820 L1260 260 L1440 820 Z M1170 540 H1350" fill="none" stroke="${C.white}" stroke-width="10"/><circle cx="1260" cy="260" r="16" fill="${C.red}"/>`,
    );
  },
  ceremony() {
    let chairs = '';
    for (let row = 0; row < 5; row++) for (let i = 0; i < 16; i++) {
      const x = 130 + i * 86 + (row % 2) * 30;
      const y = 600 + row * 80;
      chairs += `<rect x="${x}" y="${y}" width="56" height="44" rx="6" fill="${row % 2 ? C.blue : C.navy}"/>`;
    }
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.light}"/><rect x="300" y="120" width="1000" height="360" fill="${C.navy}"/><rect x="340" y="160" width="920" height="240" fill="${C.blue}"/>` +
        `<rect x="250" y="480" width="1100" height="40" fill="${C.blue2}"/><rect x="760" y="400" width="80" height="80" fill="${C.white}"/>` +
        `<rect x="130" y="140" width="70" height="360" fill="${C.red}" opacity=".85"/><rect x="1400" y="140" width="70" height="360" fill="${C.red}" opacity=".85"/>${chairs}`,
    );
  },
  graduation() {
    const cap = (x, y, s, c) =>
      `<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -60 L160 0 L0 60 L-160 0 Z" fill="${c}"/><path d="M-90 30 v60 q90 40 180 0 v-60 L0 60 Z" fill="${C.navy}"/><path d="M120 15 v90" stroke="${C.red}" stroke-width="8"/><circle cx="120" cy="110" r="12" fill="${C.red}"/></g>`;
    return svg(`<rect width="${W}" height="${H}" fill="url(#s)"/>` + cap(500, 420, 1.6, C.navy) + cap(1080, 360, 1.2, C.blue) + cap(820, 700, 1, C.blue2) + cap(1340, 720, 0.8, C.navy), sky('s', C.sky, C.light));
  },
  students() {
    const r = rng(23);
    let people = '';
    for (let i = 0; i < 9; i++) {
      const x = 160 + i * 160 + r() * 30;
      const s = 0.8 + r() * 0.5;
      const col = [C.navy, C.blue, C.blue2][i % 3];
      people += `<g transform="translate(${x} ${820}) scale(${s})"><circle cx="0" cy="-330" r="56" fill="${col}"/><path d="M-90 0 v-170 a90 90 0 0 1 180 0 v170 z" fill="${col}"/>${i % 4 === 1 ? `<rect x="20" y="-180" width="60" height="80" fill="${C.white}" stroke="${C.navy}" stroke-width="4"/>` : ''}</g>`;
    }
    return svg(`<rect width="${W}" height="${H}" fill="${C.light}"/><circle cx="800" cy="420" r="360" fill="${C.sky}"/><rect y="820" width="${W}" height="180" fill="${C.sand}"/>${people}`);
  },
  innovation() {
    let circuit = '';
    const r = rng(31);
    for (let i = 0; i < 18; i++) {
      const y = 100 + i * 48;
      const x1 = r() * 400;
      circuit += `<path d="M${x1} ${y} H${x1 + 120 + r() * 200} l40 40 H${x1 + 500}" stroke="${C.blue2}" stroke-width="4" fill="none" opacity=".6"/><circle cx="${x1 + 500}" cy="${y + 40}" r="8" fill="${C.mid}"/>`;
    }
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.navy}"/>${circuit}<g transform="translate(1000 0) scale(-1 1) translate(-1000 0)" opacity=".7">${circuit}</g>` +
        `<circle cx="800" cy="420" r="200" fill="${C.white}"/><circle cx="800" cy="420" r="150" fill="${C.sky}"/><rect x="720" y="610" width="160" height="90" rx="12" fill="${C.mid}"/><rect x="740" y="710" width="120" height="40" rx="10" fill="${C.blue}"/>` +
        `<path d="M740 470 L800 380 L860 470" stroke="${C.red}" stroke-width="14" fill="none"/>`,
    );
  },
  conference() {
    let heads = '';
    for (let row = 0; row < 3; row++) for (let i = 0; i < 14; i++) heads += `<circle cx="${110 + i * 105 + (row % 2) * 50}" cy="${740 + row * 90}" r="34" fill="${row === 1 ? C.blue : C.navy}"/>`;
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.light}"/><rect x="260" y="90" width="1080" height="480" fill="${C.navy}"/><rect x="300" y="130" width="1000" height="400" fill="${C.white}"/>` +
        `<rect x="360" y="200" width="420" height="30" fill="${C.blue}"/><rect x="360" y="260" width="300" height="20" fill="${C.mid}"/><rect x="860" y="200" width="380" height="270" fill="${C.sky}"/>` +
        `<path d="M890 440 L980 340 L1060 400 L1200 250" stroke="${C.red}" stroke-width="10" fill="none"/>${heads}`,
    );
  },
  lecture() {
    let desks = '';
    for (let row = 0; row < 3; row++) for (let i = 0; i < 5; i++) desks += `<rect x="${180 + i * 270}" y="${640 + row * 110}" width="200" height="40" fill="${C.blue}"/><circle cx="${280 + i * 270}" cy="${610 + row * 110}" r="26" fill="${C.navy}"/>`;
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.light}"/><rect x="240" y="100" width="1120" height="420" fill="#1E4E40"/><rect x="250" y="110" width="1100" height="400" fill="#2C6150"/>` +
        `<path d="M340 220 h500 M340 290 h380 M340 360 h460" stroke="${C.white}" stroke-width="10" opacity=".8"/><circle cx="1120" cy="320" r="110" fill="none" stroke="${C.white}" stroke-width="8" opacity=".8"/>${desks}`,
    );
  },
  law() {
    return svg(
      `<rect width="${W}" height="${H}" fill="url(#s)"/>` +
        [260, 420, 1180, 1340].map((x) => `<rect x="${x - 40}" y="300" width="80" height="520" fill="${C.white}" stroke="${C.navy}" stroke-opacity=".2"/>`).join('') +
        `<path d="M160 300 L800 120 L1440 300 Z" fill="${C.navy}"/><rect x="140" y="820" width="1320" height="40" fill="${C.navy}"/>` +
        `<rect x="790" y="300" width="20" height="440" fill="${C.navy}"/><rect x="560" y="320" width="480" height="14" fill="${C.navy}"/>` +
        `<path d="M600 334 L540 520 h120 Z M1000 334 L940 520 h120 Z" fill="none" stroke="${C.navy}" stroke-width="5"/><path d="M530 520 a70 30 0 0 0 140 0 Z" fill="${C.blue}"/><path d="M930 520 a70 30 0 0 0 140 0 Z" fill="${C.blue}"/>` +
        `<rect x="700" y="740" width="200" height="30" fill="${C.red}"/>`,
      sky('s', C.light, C.sky),
    );
  },
  management() {
    const bars = [260, 380, 320, 480, 560, 520, 640].map((h, i) => `<rect x="${260 + i * 150}" y="${860 - h}" width="96" height="${h}" fill="${i === 6 ? C.blue : i % 2 ? C.blue2 : C.mid}"/>`).join('');
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.light}"/>${grid(C.sky, 100, 1)}${bars}` +
        `<path d="M300 640 L460 520 L610 560 L760 420 L910 340 L1060 380 L1220 220" stroke="${C.navy}" stroke-width="10" fill="none"/>` +
        `<circle cx="1220" cy="220" r="18" fill="${C.red}"/><rect x="200" y="860" width="1200" height="8" fill="${C.navy}"/>`,
    );
  },
  sport() {
    let lanes = '';
    for (let i = 0; i < 6; i++) lanes += `<ellipse cx="800" cy="560" rx="${700 - i * 60}" ry="${330 - i * 40}" fill="none" stroke="${C.white}" stroke-width="4"/>`;
    return svg(
      `<rect width="${W}" height="${H}" fill="${C.sky}"/><ellipse cx="800" cy="560" rx="720" ry="350" fill="${C.blue}"/>${lanes}<ellipse cx="800" cy="560" rx="340" ry="110" fill="#3E8E5E"/>` +
        `<circle cx="800" cy="560" r="50" fill="${C.white}"/><path d="M760 540 q40 30 80 0 M760 580 q40 -30 80 0" stroke="${C.navy}" stroke-width="5" fill="none"/>`,
    );
  },
};

for (const [name, render] of Object.entries(scenes)) {
  writeFileSync(join(out, `${name}.svg`), render());
}
console.log(`Wrote ${Object.keys(scenes).length} illustrations to ${out}`);
