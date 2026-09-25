function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function mutationBit(digest) {
  return ((digest[1] & 0x1f) << 3) | (digest[2] & 0x07);
}

function hammingDistance(left, right) {
  let distance = 0;
  for (let index = 0; index < 32; index += 1) {
    let value = left[index] ^ right[index];
    while (value !== 0) {
      distance += value & 1;
      value >>>= 1;
    }
  }
  return distance;
}

function floorSub(value, amount) {
  return value < amount ? 0 : value - amount;
}

function saturatingAdd(value, amount, maximum) {
  return value > maximum - amount ? maximum : value + amount;
}

function pulseCost(elapsed, digestByte) {
  return elapsed * (3 + (digestByte & 7));
}

function pulseStatus(energy, vitality) {
  if (vitality === 0) return 'dead';
  if (energy === 0 || energy < 256 || vitality < 256) return 'dormant';
  return 'alive';
}

function crossover(parentA, parentB, mask) {
  return (parentA & mask) | (parentB & (~mask & 0xff));
}

const zeros = new Uint8Array(32);
const ones = new Uint8Array(32).fill(0xff);
assert(hammingDistance(zeros, zeros) === 0, 'identical genomes must have distance 0');
assert(hammingDistance(zeros, ones) === 256, 'opposite genomes must have distance 256');
assert(256 - hammingDistance(zeros, ones) === 0, 'opposite genomes must have compatibility 0');
assert(256 - hammingDistance(zeros, zeros) === 256, 'identical genomes must have compatibility 256');
assert(crossover(0xaa, 0x55, 0xf0) === 0xa5, 'crossover mask failed');
assert(crossover(0xaa, 0x55, 0x00) === 0x55, 'crossover lower parent failed');
assert(crossover(0xaa, 0x55, 0xff) === 0xaa, 'crossover upper parent failed');

for (let first = 0; first < 256; first += 1) {
  for (const second of [0, 1, 7, 255]) {
    const digest = new Uint8Array(32);
    digest[1] = first;
    digest[2] = second;
    const bit = mutationBit(digest);
    assert(bit >= 0 && bit <= 255, `mutation bit out of genome bounds: ${bit}`);
  }
}
assert(mutationBit(Uint8Array.from([0, 0xff, 0xff])) === 255, 'mutation bit max must be 255');

assert(floorSub(10, 3) === 7, 'floor subtraction normal case failed');
assert(floorSub(3, 10) === 0, 'floor subtraction underflow failed');
assert(saturatingAdd(1000, 24, 1024) === 1024, 'saturating add cap failed');
assert(saturatingAdd(1000, 2, 1024) === 1002, 'saturating add normal case failed');
assert(pulseCost(1, 0) === 3, 'minimum pulse cost failed');
assert(pulseCost(256, 0xff) === 2560, 'maximum bounded pulse cost failed');
assert(pulseStatus(1, 300) === 'dormant', 'low-energy status failed');
assert(pulseStatus(300, 255) === 'dormant', 'low-vitality status failed');
assert(pulseStatus(300, 0) === 'dead', 'zero-vitality status failed');
assert(pulseStatus(300, 256) === 'alive', 'alive threshold failed');

console.log('Cambrian model boundary tests passed.');
