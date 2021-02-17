import { PNG } from 'pngjs/browser';

export function saveSlide(pixels) {
  const png = new PNG({
    width: pixels[0].length,
    height: pixels.length
  })

  for (let y = 0; y < pixels.length; y++) {
    for (let x = 0; x < pixels[0].length; x++) {
      const idx = (pixels[0].length * (pixels.length - y) + x) << 2;

      // invert color
      png.data[idx] = pixels[y][x][0] * 255;
      png.data[idx + 1] = pixels[y][x][1] * 255;
      png.data[idx + 2] = pixels[y][x][2] * 255;
      png.data[idx + 3] = 255;
    }
  }

  const buffer = PNG.sync.write(png);
  const dataURL = 'data:image/png;base64,' + buffer.toString('base64');

  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'slide.png';

  document.body.append(a);
  a.click();
  a.remove();
}
