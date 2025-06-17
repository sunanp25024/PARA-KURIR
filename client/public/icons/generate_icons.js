// Simple script to generate PWA icons using Canvas
// This will be replaced with actual icon files

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create SVG icons for PWA
const createSVGIcon = (size) => {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.125}" fill="url(#grad1)"/>
  <g transform="translate(${size * 0.2}, ${size * 0.2}) scale(${size / 200})">
    <path d="M20 40h120v12H20V40zm0 20h120v12H20V60zm0 20h120v12H20V80zm0 20h80v12H20v-12z" fill="white"/>
    <circle cx="140" cy="20" r="8" fill="white"/>
    <path d="M60 120l20-20 20 20 20-20 20 20" stroke="white" stroke-width="3" fill="none"/>
  </g>
</svg>`;
};

console.log('Icon generation script ready');