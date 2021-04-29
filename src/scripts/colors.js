const PALETTE = ["primary", "success", "info", "warning", "danger", "dark"];

export default {
  isColorStyle(color) {
    return PALETTE.includes(color);
  },
  createPalette(hex) {
    const ex = /^#([\da-f]{3}){1,2}$/i;
    if (ex.test(hex)) {
      const { h, s, l } = hexToHSL(hex);

      const lightness = (100 - l) / 5;
      const darkness = l / 7;

      const paletteHex = {
        50: hslToHex({ h, s, l: Math.round(l + lightness * 4.5) }),
        100: hslToHex({ h, s, l: Math.round(l + lightness * 4) }),
        200: hslToHex({ h, s, l: Math.round(l + lightness * 3) }),
        300: hslToHex({ h, s, l: Math.round(l + lightness * 2) }),
        400: hslToHex({ h, s, l: Math.round(l + lightness) }),
        500: hslToHex({ h, s, l }),
        600: hslToHex({ h, s, l: Math.round(l - darkness) }),
        700: hslToHex({ h, s, l: Math.round(l - darkness * 2) }),
        800: hslToHex({ h, s, l: Math.round(l - darkness * 3) }),
        900: hslToHex({ h, s, l: Math.round(l - darkness * 3.75) }),
      };

      paletteHex[
        "gradient-default"
      ] = `linear-gradient(90deg, ${paletteHex[600]} 0%, ${paletteHex[400]} 100%)`;

      paletteHex[
        "gradient-hover"
      ] = `linear-gradient(270deg, ${paletteHex[500]} 0%, ${paletteHex[300]} 100%)`;

      return paletteHex;
    } else return null;
  },
  colorInversion(elem) {
    setTimeout(() => {
      const elemColor = window.getComputedStyle(elem).color;
      const elemBackground = window.getComputedStyle(elem).background;

      const start = elemBackground.indexOf("rgb(");
      const end = elemBackground.indexOf(")", start);

      const rgb = elemBackground.slice(start, end + 1);

      elem.style.color = rgb;
      elem.style.background = elemColor;
    });
  },
};

function hexToHSL(H) {
  let ex = /^#([\da-f]{3}){1,2}$/i;
  if (ex.test(H)) {
    // convert hex to RGB first
    let r = 0;
    let g = 0;
    let b = 0;

    if (H.length == 4) {
      r = Number("0x" + H[1] + H[1]);
      g = Number("0x" + H[2] + H[2]);
      b = Number("0x" + H[3] + H[3]);
    } else if (H.length == 7) {
      r = Number("0x" + H[1] + H[2]);
      g = Number("0x" + H[3] + H[4]);
      b = Number("0x" + H[5] + H[6]);
    }
    // then to HSL
    r /= 255;
    g /= 255;
    b /= 255;

    let cmin = Math.min(r, g, b);
    let cmax = Math.max(r, g, b);
    let delta = cmax - cmin;

    let h = 0;
    let s = 0;
    let l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return { h, s, l };
  } else {
    return null;
  }
}

function hslToHex(hsl) {
  let { h, s, l } = hsl;
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
