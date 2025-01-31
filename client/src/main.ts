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

kap.scene("battle_arena", () => battleArenaScene(kap));
kap.go("battle_arena");
