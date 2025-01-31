import { KAPLAYCtx } from "kaplay";
import { kap } from "../contexts/kaplay-context";
import { fetchMapData } from "../utils/fetch-map-data";

/**
 *
 * @param kapCtx
 */
export async function battleArenaScene(kapCtx: KAPLAYCtx<{}, never>) {
  kap.add([
    kap.sprite("background-layer-1"),
    kap.pos(0, 0),
    kap.scale(4),
    kap.fixed(),
  ]);
  kap.add([
    kap.sprite("background-layer-2"),
    kap.pos(0, 0),
    kap.scale(4),
    kap.fixed(),
  ]);
  const { tileheight, tilewidth, layer } = await fetchMapData(
    "/maps/arena.json"
  );

  const map = kap.add([kap.pos(0, 0)]);
}
