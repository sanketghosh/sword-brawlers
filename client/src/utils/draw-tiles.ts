// packages
import { GameObj, KAPLAYCtx } from "kaplay";

// local modules
import { TiledTileLayer } from "../types";

export function drawTiles(
  kapCtx: KAPLAYCtx<{}, never>,
  map: GameObj,
  layer: TiledTileLayer,
  tileWidth: number,
  tileHeight: number
) {
  let numberOfDrawnTiles = 0;
  const tilePos = kapCtx.vec2(0, 0);

  for (const tileNumber of layer.data) {
    if (numberOfDrawnTiles % layer.width === 0) {
      tilePos.x = 0;
      tilePos.y += tileHeight;
    } else {
      tilePos.x += tileWidth;
    }

    numberOfDrawnTiles++;
    if (tileNumber === 0) continue;

    map.add([
      kapCtx.sprite("tileset", { frame: tileNumber - 1 }),
      kapCtx.pos(tilePos),
      kapCtx.offscreen(),
    ]);
  }
}
