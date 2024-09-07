import PDFMerger from 'pdf-merger-js';
import path from 'path'


// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

function toArrayBuffer(buffer) {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
    }
    return arrayBuffer;
  }


async function merge(files) {

    const merger = new PDFMerger();

    for( let file of files){
        await merger.add(toArrayBuffer(file.buffer))
    }

    // const outputPath = path.join(__dirname, 'merged.pdf');
    // await merger.save(outputPath);
    const buffer = await merger.saveAsBuffer()
    merger.reset()

    return buffer

}

export {merge as merger}