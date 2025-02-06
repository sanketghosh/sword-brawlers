// packages
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";

// local modules
import { fighterProps, setFighterControls } from "./fighter";
import { Directions } from "../types";

export function makeNinja(
  kapCtx: KAPLAYCtx<{}, never>,
  parentGameObj: GameObj,
  ninjaPosition: Vec2
) {
  let ninjaObject = parentGameObj.add([
    kapCtx.sprite("ninja", { anim: "idle" }),
    kapCtx.pos(ninjaPosition),
    kapCtx.area({
      shape: new kapCtx.Rect(kapCtx.vec2(0, 6), 20, 40),
      collisionIgnore: ["samurai"],
    }),
    kapCtx.anchor("center"),
    kapCtx.body(),
    kapCtx.health(fighterProps.maxHp),
    kapCtx.opacity(),
    "ninja",
    {
      ...fighterProps,
      direction: Directions.LEFT,
    },
  ]);

  ninjaObject.flipX = true;

  return {
    gameObj: ninjaObject,
    setControls: () => {
      setFighterControls(kapCtx, ninjaObject, {
        LEFT: "left",
        RIGHT: "right",
        DOWN: "down",
        UP: "up",
      });
    },
  };
}
