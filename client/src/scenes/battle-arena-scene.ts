// packages
import { KAPLAYCtx } from "kaplay";

// local modules
import { drawTiles, fetchMapData } from "../utils";
import { makeSamurai } from "../entities/samurai";
import { Directions, Entity, TiledLayer } from "../types";
import { makeNinja } from "../entities/ninja";
import { healthBar } from "../ui/health-bar";

/**
 * @description creates a new scene
 * @param kapCtx
 */
export async function battleArenaScene(kapCtx: KAPLAYCtx<{}, never>) {
  kapCtx.setGravity(2000);

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

  const entities: { [key: string]: Entity | null } = {
    player1: null,
    player2: null,
  };

  const map = kapCtx.add([kapCtx.pos(0, 0)]);

  let layer: TiledLayer;
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

    //
    if (layer.name === "Boundaries" && layer.type === "objectgroup") {
      for (const object of layer.objects) {
        map.add([
          kapCtx.area({
            shape: new kapCtx.Rect(kapCtx.vec2(0), object.width, object.height),
          }),
          kapCtx.pos(object.x, object.y + tileheight),
          kapCtx.body({
            isStatic: true,
          }),
          // kapCtx.anchor("botleft"),
        ]);
      }
      continue;
    }

    //
    if (layer.name === "SpawnPoints" && layer.type === "objectgroup") {
      for (const object of layer.objects) {
        switch (object.name) {
          case "player-1":
            entities.player1 = makeSamurai(
              kapCtx,
              map,
              kapCtx.vec2(object.x, object.y)
            );
            break;
          case "player-2":
            entities.player2 = makeNinja(
              kapCtx,
              map,
              kapCtx.vec2(object.x, object.y)
            );
            break;
          default:
            break;
        }
      }
    }

    if (layer.type === "tilelayer") {
      drawTiles(kapCtx, map, layer, tilewidth, tileheight);
    }
  }
  kapCtx.camPos(kapCtx.center().x - 450, kapCtx.center().y - 160);
  kapCtx.camScale(4, 4);

  entities.player1?.setControls();
  entities.player2?.setControls();

  if (entities.player1?.gameObj)
    healthBar(kapCtx, Directions.LEFT, entities.player1.gameObj);

  if (entities.player2?.gameObj)
    healthBar(kapCtx, Directions.RIGHT, entities.player2.gameObj);
}
