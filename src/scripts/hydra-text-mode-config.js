import { textmode } from 'textmode.js';
const canvas = document.getElementById('hydra-canvas');

const tm = textmode.create({ canvas, overlay: true });
const title = canvas.dataset.title || '.÷ôÇ€';
tm.setup(() => {
  tm.fontSize(20);
  tm.overlay
    .characters(title.toUpperCase())
    .cellColorMode('fixed')
    .cellColor(0, 0, 0)
    .charColorMode('sampled')
    .background(0, 0, 0, 255);
});

tm.draw(() => {
  tm.background(0);
  tm.image(tm.overlay, tm.grid.cols, tm.grid.rows);
});

let toggle = false;
addEventListener('click', () => {
  if(toggle) {
    tm.fontSize(1);
  }else {
    tm.fontSize(20);
   
  }  toggle = !toggle;  
});


console.log(Array.from({ length: 60 }, () => '*').join(''));
console.log('Shootout to Flor de Fuego for the initial hydra sketch');
console.log(Array.from({ length: 60 }, () => '*').join(''));
