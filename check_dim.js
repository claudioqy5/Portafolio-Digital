
const fs = require('fs');

function getPNGDimensions(path) {
    const buffer = fs.readFileSync(path);
    const width = buffer.readInt32BE(16);
    const height = buffer.readInt32BE(20);
    return { width, height };
}

try {
    const dim = getPNGDimensions('c:\\Users\\ADMIN\\Desktop\\MIS PROYECTOS\\spectral-granule\\src\\assets\\milogo.png');
    console.log(`Dimensions: ${dim.width}x${dim.height}`);
} catch (e) {
    console.error(e);
}
