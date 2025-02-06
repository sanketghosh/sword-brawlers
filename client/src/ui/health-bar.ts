// packages
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";

// local modules
import { Directions } from "../types";

export function healthBar(
  kapCtx: KAPLAYCtx<{}, never>,
  direction: Directions,
  owner: GameObj
) {
  const healthContainerPosition: { [key: string]: Vec2 } = {
    LEFT: kapCtx.vec2(310, 40),
    RIGHT: kapCtx.vec2(972, 40),
  };

  const healthContainer = kapCtx.add([
    kapCtx.rect(600, 50),
    kapCtx.color(200, 0, 0),
    kapCtx.area(),
    kapCtx.anchor("center"),
    kapCtx.outline(4),
    kapCtx.pos(healthContainerPosition[direction]),
    kapCtx.fixed(),
  ]);

  const healthDisplay = healthContainer.add([
    kapCtx.rect(600, 46),
    kapCtx.color(0, 200, 0),
    kapCtx.pos(-300, -23),
    kapCtx.rotate(0),
  ]);

  if (direction === Directions.RIGHT) {
    healthDisplay.rotateBy(180);
    healthDisplay.pos = kapCtx.vec2(300, 23);
  }

  const reduceWidthBy = healthDisplay.width / owner.maxHp;
  kapCtx.onUpdate(() => {
    if (owner.hp() === owner.previousHp) return;

    owner.previousHp = owner.hp();
    if (owner.hp() !== 0) {
      kapCtx.tween(
        healthDisplay.width,
        healthDisplay.width - reduceWidthBy,
        0.1,
        (newWidth) => (healthDisplay.width = newWidth),
        kapCtx.easings.linear
      );

      return;
    }

    kapCtx.tween(
      healthDisplay.width,
      0,
      0.1,
      (newWidth) => (healthDisplay.width = newWidth),
      kapCtx.easings.linear
    );
  });
}
