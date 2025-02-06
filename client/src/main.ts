import { kap } from "./contexts/kaplay-context";
import { battleArenaScene } from "./scenes/battle-arena-scene";

// loading assets
kap.loadSprite(
  "background-layer-1",
  "/assets/background/background_layer_1.png"
);

kap.loadSprite(
  "background-layer-2",
  "/assets/background/background_layer_2.png"
);

// shop
kap.loadSprite("shop", "/assets/shop_anim.png", {
  sliceX: 6,
  sliceY: 1,
  anims: {
    default: {
      from: 0,
      to: 5,
      loop: true,
    },
  },
});
kap.loadSprite("fence-1", "/assets/fence_1.png");
kap.loadSprite("tileset", "/assets/oak_woods_tileset.png", {
  sliceX: 31,
  sliceY: 22,
});

// load samurai
kap.loadSprite("samurai", "/assets/entities/samurai.png", {
  sliceX: 8,
  sliceY: 9,
  anims: {
    idle: {
      from: 32,
      to: 39,
      loop: true,
    },
    run: {
      from: 48,
      to: 55,
      loop: true,
    },
    attack: {
      from: 0,
      to: 5,
      speed: 16,
    },
    death: {
      from: 16,
      to: 21,
    },
    hit: {
      from: 56,
      to: 59,
    },
    jump: {
      from: 40,
      to: 41,
      loop: true,
    },
    fall: {
      from: 24,
      to: 25,
      loop: true,
    },
  },
});

// load ninja
kap.loadSprite("ninja", "/assets/entities/ninja.png", {
  sliceX: 8,
  sliceY: 8,
  anims: {
    idle: {
      from: 32,
      to: 35,
      loop: true,
    },
    run: {
      from: 48,
      to: 55,
      loop: true,
    },
    attack: {
      from: 0,
      to: 3,
    },
    death: {
      from: 16,
      to: 22,
    },
    hit: {
      from: 56,
      to: 58,
    },
    jump: {
      from: 40,
      to: 41,
      loop: true,
    },
    fall: {
      from: 24,
      to: 25,
      loop: true,
    },
  },
});

kap.scene("battle_arena", () => battleArenaScene(kap));
kap.go("battle_arena");
