// packages
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";

// local modules
import { fighterProps, setFighterControls } from "./fighter";
import { Directions } from "../types";

/**
 *
 * @param kapCtx
 * @param parentGameObj
 * @param samuraiPosition
 * @returns
 */

export function makeSamurai(
  kapCtx: KAPLAYCtx<{}, never>,
  parentGameObj: GameObj,
  samuraiPosition: Vec2
) {
  let samuraiObject = parentGameObj.add([
    kapCtx.sprite("samurai", { anim: "idle" }),
    kapCtx.pos(samuraiPosition),
    kapCtx.area({
      shape: new kapCtx.Rect(kapCtx.vec2(0), 20, 40),
      collisionIgnore: ["ninja"],
    }),
    kapCtx.anchor("center"),
    kapCtx.body(),
    kapCtx.health(fighterProps.maxHp),
    kapCtx.opacity(),
    "samurai",
    {
      ...fighterProps,
      direction: Directions.RIGHT,
    },
  ]);

  // samuraiObject.direction = Directions.RIGHT;

  return {
    gameObj: samuraiObject,
    setControls: () => {
      setFighterControls(kapCtx, samuraiObject, {
        LEFT: "a",
        RIGHT: "d",
        UP: "w",
        DOWN: "s",
      });
    },
  };
}
