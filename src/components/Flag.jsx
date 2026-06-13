// Bandeiras SVG inline (BR/US) — substituem a lib flag-icons (CDN render-blocking).
// viewBox padrão de bandeiras: 640x480 (proporção 4:3).

const wrapClass = "rounded-sm shrink-0";
const wrapStyle = { width: "1.4rem", height: "1.05rem" };

function BrazilFlag() {
  return (
    <svg
      viewBox="0 0 640 480"
      className={wrapClass}
      style={wrapStyle}
      aria-hidden="true"
    >
      <rect width="640" height="480" fill="#009b3a" />
      <path d="M320 48 592 240 320 432 48 240z" fill="#fedf00" />
      <circle cx="320" cy="240" r="96" fill="#002776" />
    </svg>
  );
}

function UsaFlag() {
  const stripeH = 480 / 13;
  const stripes = Array.from({ length: 7 }, (_, i) => (
    <rect key={i} y={i * 2 * stripeH} width="640" height={stripeH} fill="#b22234" />
  ));

  const cantonH = stripeH * 7;
  // 5 fileiras alternando 6 e 5 estrelas (sugere o padrão real)
  const stars = [];
  const rows = 5;
  for (let r = 0; r < rows; r++) {
    const cols = r % 2 === 0 ? 6 : 5;
    const y = (cantonH / rows) * (r + 0.5);
    for (let c = 0; c < cols; c++) {
      const step = 256 / (cols + 1);
      stars.push(<circle key={`${r}-${c}`} cx={step * (c + 1)} cy={y} r="7" fill="#fff" />);
    }
  }

  return (
    <svg
      viewBox="0 0 640 480"
      className={wrapClass}
      style={wrapStyle}
      aria-hidden="true"
    >
      <rect width="640" height="480" fill="#fff" />
      {stripes}
      <rect width="256" height={cantonH} fill="#3c3b6e" />
      {stars}
    </svg>
  );
}

export function Flag({ country }) {
  return country === "us" ? <UsaFlag /> : <BrazilFlag />;
}
