//based on a pen by @camizzilla
const pixelSize = 5;
const size = 8;
const tile = pixelSize * size;

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const WIDTH = (canvas.width = tile * size);
const HEIGHT = (canvas.height = tile * size);

const skullMap =[ [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0]
],[
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 0, 1, 1, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0]
]];
const bunMap = [[
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 0, 0, 0]
], [
  [0, 0, 1, 0, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 0, 1, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 0, 0, 0]
]];

const brickMap = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0, 0, 1, 0]
];

const heroMap = [[
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 0, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 1, 0, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0]
], [
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 0, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 0, 0],
  [1, 0, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0, 0],
  [0, 0, 1, 0, 1, 0, 0, 0]
]];

const brickLfMap = [
    [1,1,1,1,1,1,1,1],
   [1,0,0,1,0,0,0,0],
   [1,0,0,1,0,0,0,0],
   [1,0,0,1,1,1,1,1],
   [1,1,1,1,0,0,0,1],
   [1,0,0,0,0,0,0,1],
   [1,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,1]
];

const brickCenterMap = [
  [1,1,1,1,1,1,1,1],
   [0,0,0,1,0,0,0,0],
   [0,0,0,1,0,0,0,0],
   [1,0,0,1,1,1,1,1],
   [1,1,1,1,0,0,0,1],
   [0,0,0,0,0,0,0,1],
   [0,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,1]
];

const brickRtMap = [
     [1,1,1,1,1,1,1,1],
   [0,0,0,1,0,0,0,1],
   [0,0,0,1,0,0,0,1],
   [1,0,0,1,1,1,1,1],
   [1,1,1,1,0,0,0,1],
   [0,0,0,0,0,0,0,1],
   [0,0,0,0,0,0,0,1],
   [1,1,1,1,1,1,1,1]
];

let orb = [
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0]
  ],
  [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0],
    [1, 0, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0, 0]
  ]
];

const map = [
  [0, 0, 0, 0, 0, 0, 0, 8],
  [0, 6, 0, 0, 0, 0, 0, 0],
  [0, 2, 4, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 7, 0, 5, 0, 0],
  [0, 0, 0, 2, 3, 3, 4, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1]
];

class Character {
  constructor(x, y, sprite, pixelSize) {
    this.pixelSize = pixelSize;
    this.x = x;
    this.y = y;
    this.sprite = sprite;
  }

  position(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    this.sprite.forEach((row, r) =>
      row.forEach(
        (cell, c) =>
          cell &&
          ctx.fillRect(
            this.x + c * this.pixelSize,
            this.y + r * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          )
      )
    );
  }
}

class CharacterAnimate extends Character {
  constructor(x, y, sprite, pixelSize) {
    super(x, y, sprite, pixelSize);
    this.time = 0;
    this.spriteCurrent = 0;
  }

  draw() {
    const arr = this.sprite[this.spriteCurrent];
    arr.forEach((row, r) =>
      row.forEach(
        (cell, c) =>
          cell &&
          ctx.fillRect(
            this.x + c * this.pixelSize,
            this.y + r * this.pixelSize,
            this.pixelSize,
            this.pixelSize
          )
      )
    );
    if (++this.time % 30 === 0) {
      this.spriteCurrent =
        (this.spriteCurrent + 1) % this.sprite.length;
    }
  }
}

class TileMap {
  constructor(map, tile, spritesArr) {
    this.map = map;
    this.spritesArr = spritesArr;
    this.tile = tile;
  }

  drawMap() {
    this.map.forEach((row, y) =>
      row.forEach((item, x) => {
        if (item) {
          const sprite = this.spritesArr[item - 1];
          sprite.position(x * this.tile, y * this.tile);
          sprite.draw();
        }
      })
    );
  }
}

const createCharacter = (spriteArr) =>
  new Character(0, 0, spriteArr, pixelSize);

const createAnimatedCharacter = (spriteArr) =>
  new CharacterAnimate(50, 50, spriteArr, pixelSize);

const brickLf = createCharacter(brickLfMap);
const brickCenter = createCharacter(brickCenterMap);
const brickRt = createCharacter(brickRtMap);
const brick = createCharacter(brickMap);
const toporb = createAnimatedCharacter(orb);
const bunny = createAnimatedCharacter(bunMap);
const skull = createAnimatedCharacter(skullMap);
const hero = createAnimatedCharacter(heroMap);

const tileMap = new TileMap(map, tile, [
  brick,
  brickLf,
  brickCenter,
  brickRt,
  bunny,
  skull,
  hero,
  toporb,
]);

const fps = 60;
const interval = 1000 / fps;
let then = performance.now();

const loop = () => {
  const now = performance.now();
  if (now - then > interval) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    tileMap.drawMap();
    then = now - ((now - then) % interval);
  }
  requestAnimationFrame(loop);
};

requestAnimationFrame(loop);
