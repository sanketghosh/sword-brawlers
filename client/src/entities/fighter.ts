// packages
import { GameObj, KAPLAYCtx, Vec2 } from "kaplay";

// local modules
import { Directions, KeysTypes } from "../types";
import { makeFighterBlink } from "../utils";

// properties used by both the brawlers
export const fighterProps = {
  speed: 200,
  // direction: null,
  isDead: false,
  isCoolDownActive: false,
  maxHp: 10,
  previousHp: 10,
};

/**
 *
 * @param kapCtx
 * @param fighter
 * @param keys
 */
export function setFighterControls(
  kapCtx: KAPLAYCtx<{}, never>,
  fighter: GameObj,
  keys: KeysTypes
) {
  /**
 onKeyDownListener is only for when the key is pressed (kept pressed) we will register only the left-right movements through this not up/down
  */
  const onKeyDownController = kapCtx.onKeyDown((key) => {
    if (fighter.curAnim() === "attack") return;

    switch (key) {
      case keys.LEFT:
        fighter.flipX = true;
        fighter.move(-fighter.speed, 0);
        fighter.direction = Directions.LEFT;
        if (fighter.curAnim() !== "run" && fighter.curAnim() !== "jump") {
          fighter.play("run");
        }
        break;
      case keys.RIGHT:
        fighter.flipX = false;
        fighter.move(fighter.speed, 0);
        fighter.direction = Directions.RIGHT;
        if (fighter.curAnim() !== "run" && fighter.curAnim() !== "jump") {
          fighter.play("run");
        }
        break;
      default:
        break;
    }
  });

  /****
   *
   *
   *
   */
  const onKeyReleaseController = kapCtx.onKeyRelease((key) => {
    if (
      (key === keys.LEFT || key === keys.RIGHT) &&
      fighter.curAnim() !== "idle" &&
      fighter.curAnim() !== "attack"
    ) {
      fighter.play("idle");
    }
  });

  /**
   *
   *
   */
  const onKeyPressController = kapCtx.onKeyPress((key) => {
    if (
      key === keys.UP &&
      fighter.isGrounded() &&
      fighter.curAnim() !== "jump"
    ) {
      fighter.jump();
      fighter.play("jump");
      return;
    }

    if (key === keys.DOWN && !fighter.isCoolDownActive) {
      fighter.isCoolDownActive = true;
      kapCtx.wait(0.7, () => (fighter.isCoolDownActive = false));

      function updateHitBoxPos() {
        const hitBoxPos: { [key: string]: Vec2 } = {
          LEFT: kapCtx.vec2(fighter.pos.x - 50, fighter.pos.y),
          RIGHT: kapCtx.vec2(fighter.pos.x + 50, fighter.pos.y),
        };

        return hitBoxPos[fighter.direction];
      }

      const attackHitBox = kapCtx.add([
        kapCtx.area({ shape: new kapCtx.Rect(kapCtx.vec2(0), 50, 50) }),
        kapCtx.anchor("center"),
        kapCtx.pos(updateHitBoxPos()),
      ]);

      const attackUpdateController = kapCtx.onUpdate(() => {
        attackHitBox.pos = updateHitBoxPos();
      });

      const enemyTag = fighter.is("samurai") ? "ninja" : "samurai";
      attackHitBox.onCollide(enemyTag, (enemy) => {
        kapCtx.wait(0.1, () => (enemy.previousHp = enemy.hp()));
        if (enemy.hp() !== 0) enemy.hurt(1);
      });

      if (fighter.curAnim !== "attack") fighter.play("attack");

      kapCtx.wait(0.3, () => {
        kapCtx.destroy(attackHitBox);
        attackUpdateController.cancel();
      });
    }
  });

  /**
   *
   *
   */
  fighter.on("hurt", () => {
    makeFighterBlink(kapCtx, fighter);
    if (fighter.hp() > 0 && fighter.curAnim() !== "hit") {
      fighter.play("hit");
      return;
    }
    if (fighter.curAnim() !== "death" && fighter.hp() === 0) {
      fighter.isDead = true;
      onKeyDownController.cancel();
      onKeyReleaseController.cancel();
      onKeyPressController.cancel();
      fighter.play("death");

      const enemyTag = fighter.is("samurai") ? "ninja" : "samurai";
      const enemy = kapCtx.get(enemyTag, { recursive: true })[0];

      const enemyStatus = kapCtx.add([
        kapCtx.text("WINNER", { size: 12 }),
        kapCtx.area(),
        kapCtx.anchor("center"),
        kapCtx.pos(),
      ]);

      const fighterStatus = kapCtx.add([
        kapCtx.text("LOST", { size: 12 }),
        kapCtx.area(),
        kapCtx.anchor("center"),
        kapCtx.pos(),
      ]);

      kapCtx.onUpdate(() => {
        enemyStatus.pos = kapCtx.vec2(enemy.pos.x, enemy.pos.y - 40);

        // so that text align with dead ninja body more closely
        if (fighter.is("ninja") && fighter.isDead) {
          fighterStatus.pos = kapCtx.vec2(
            fighter.pos.x - 25,
            fighter.pos.y - 5
          );
          return;
        }
        fighterStatus.pos = kapCtx.vec2(fighter.pos.x, fighter.pos.y - 40);
      });

      kapCtx.wait(5, () => kapCtx.go("battle_arena"));
    }
  });

  /**
   *
   *
   */
  kapCtx.onUpdate(() => {
    if (
      !fighter.isJumping() &&
      !fighter.isGrounded() &&
      fighter.curAnim() !== "fall" &&
      fighter.curAnim() !== "attack"
    ) {
      fighter.play("fall");
      return;
    }

    if (fighter.curAnim() === "fall" && fighter.isGrounded()) {
      fighter.play("idle");
      return;
    }

    if (
      fighter.curAnim() !== "idle" &&
      fighter.curAnim() !== "jump" &&
      fighter.curAnim() !== "attack" &&
      fighter.curAnim() !== "hit" &&
      fighter.curAnim() !== "fall" &&
      fighter.curAnim() !== "run" &&
      !fighter.isDead
    ) {
      fighter.play("idle");
    }
  });
}
