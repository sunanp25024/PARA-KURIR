const fs = require('fs');

// SVG template for PARA logo
function createSVGIcon(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <rect width="${size}" height="${size}" rx="${size/8}" fill="#8b5cf6"/>
  <text x="50%" y="50%" text-anchor="middle" dy="0.35em" fill="white" font-family="Arial, sans-serif" font-size="${size/6}" font-weight="bold">PARA</text>
</svg>`;
}

// Convert SVG to simple base64 PNG-like format for testing
function createBase64Icon(size) {
  const svg = createSVGIcon(size);
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Creating SVG-based PWA icons...');

sizes.forEach(size => {
  const svg = createSVGIcon(size);
  fs.writeFileSync(`icon-${size}x${size}.svg`, svg);
  console.log(`Created icon-${size}x${size}.svg`);
});

console.log('All icons created successfully!');