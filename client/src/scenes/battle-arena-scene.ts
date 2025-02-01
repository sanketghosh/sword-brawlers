import { KAPLAYCtx } from "kaplay";
import { fetchMapData } from "../utils/fetch-map-data";
import { drawTiles } from "../utils/draw-tiles";

/**
 *
 * @param kapCtx
 */
export async function battleArenaScene(kapCtx: KAPLAYCtx<{}, never>) {
  kapCtx.add([
    kapCtx.sprite("background-layer-1"),
    kapCtx.pos(0, 0),
    kapCtx.scale(4),
    kapCtx.fixed(),
  ]);
  kapCtx.add([
    kapCtx.sprite("background-layer-2"),
    kapCtx.pos(0, 0),
    kapCtx.scale(4),
    kapCtx.fixed(),
  ]);
  const { tileheight, tilewidth, layers } = await fetchMapData(
    "/maps/arena.json"
  );

  const map = kapCtx.add([kapCtx.pos(0, 0)]);

  let layer;
  for (layer of layers) {
    if (
      layer.name === "DecorationSpawnPoints" &&
      layer.type === "objectgroup"
    ) {
      for (const obj of layer.objects) {
        switch (obj.name) {
          case "shop":
            map.add([
              kapCtx.sprite("shop", { anim: "default" }),
              kapCtx.pos(obj.x, obj.y),
              kapCtx.area(),
              kapCtx.anchor("center"),
            ]);
            break;
          case "fence-1":
            map.add([
              kapCtx.sprite("fence-1"),
              kapCtx.pos(obj.x, obj.y + 6),
              kapCtx.area(),
              kapCtx.anchor("center"),
            ]);
            break;
          default:
        }
      }

      continue;
    }
    if (layer.type === "tilelayer") {
      drawTiles(kapCtx, map, layer, tilewidth, tileheight);
    }
  }
  kapCtx.camPos(kapCtx.center().x - 450, kapCtx.center().y - 160);
  kapCtx.camScale(4, 4);
}
