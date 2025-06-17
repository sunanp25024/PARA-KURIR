// Simple icon generator for PWA
// This creates SVG-based icons that can be converted to PNG

const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="80" fill="url(#grad)"/>
  <g fill="white" transform="translate(128, 128)">
    <!-- Package/Box Icon -->
    <rect x="50" y="50" width="156" height="156" rx="12" stroke="white" stroke-width="8" fill="#ffffff20"/>
    <path d="M128 80 L128 30 L178 30 L178 80" stroke="white" stroke-width="6" fill="none"/>
    <circle cx="128" cy="128" r="8" fill="white"/>
    <!-- Truck/Delivery Icon -->
    <rect x="20" y="180" width="80" height="40" rx="8" fill="white"/>
    <rect x="100" y="190" width="40" height="30" rx="4" fill="white"/>
    <circle cx="40" cy="235" r="15" fill="white"/>
    <circle cx="120" cy="235" r="15" fill="white"/>
    <!-- Mobile/App Element -->
    <rect x="170" y="30" width="60" height="100" rx="12" stroke="white" stroke-width="4" fill="none"/>
    <rect x="180" y="45" width="40" height="2" fill="white"/>
    <rect x="180" y="55" width="25" height="2" fill="white"/>
    <rect x="180" y="65" width="35" height="2" fill="white"/>
  </g>
</svg>`;

console.log('SVG Icon for INSAN Mobile generated');
console.log('Use online tools to convert this SVG to PNG in different sizes:');
console.log('- 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512');
console.log('SVG Content:');
console.log(iconSvg);