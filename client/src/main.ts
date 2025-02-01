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

kap.scene("battle_arena", () => battleArenaScene(kap));
kap.go("battle_arena");
