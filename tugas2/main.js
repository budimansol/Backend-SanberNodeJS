// main.js
const math = require('./mathOperation');

const a = 10;
const b = 5;

console.log(`Tambah: ${a} + ${b} = ${math.tambah(a, b)}`);
console.log(`Kurang: ${a} - ${b} = ${math.kurang(a, b)}`);
console.log(`Kali: ${a} * ${b} = ${math.kali(a, b)}`);
console.log(`Bagi: ${a} / ${b} = ${math.bagi(a, b)}`);
