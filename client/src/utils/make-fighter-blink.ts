import { GameObj, KAPLAYCtx } from "kaplay";

export async function makeFighterBlink(
  kapCtx: KAPLAYCtx<{}, never>,
  fighter: GameObj
) {
  await kapCtx.tween(
    fighter.opacity,
    0,
    0.5,
    (newOpacity) => (fighter.opacity = newOpacity),
    kapCtx.easings.linear
  );
  kapCtx.tween(
    fighter.opacity,
    1,
    0.5,
    (newOpacity) => (fighter.opacity = newOpacity),
    kapCtx.easings.linear
  );
}
