# Mathematical Expressions

## Getting Started

In addition to simple variable reading, there is a more advanced option using mathematical expressions. You can experience the full power of this method using the `rpt:expression` model.

```json{3-14}
{
    "model": {
        "type": "rpt:expression",
        "value": "foo + 1",
        "cases": [
            {
                // can specify as a single value:
                "when": [ 6 ],
                // "all" defaults to false. If true, all conditions in "when" 
                // must be met for this case to be selected:
                "all": true 
                "model":  { ... }  // This model will update because 5 + 1 = 6!
            }
        ]
    },
    "rpt": {
        "variables": {
            "numbers": {
                "foo": 5
            }
        }
    }
}
```

Besides exact matching, in `when` you can specify other expressions for comparison, constants, and functions. You can find a list of all these in the [EvalEx documentation](https://ezylang.github.io/EvalEx/references/references.html).

```json
{
    "model": {
        "type": "rpt:expression",
        "value": "SIN(5) + PI", // [!code focus]
        "cases": [
            {
                "when": [ ">=0" ], // [!code focus]
                "model": {
                    "type": "model",
                    "model": "item/diamond"
                }
            }
        ]
    }
}
```

## Game Variables
 
Along with variables from `rpt`, game variables can also be used in expressions:

### 1. Global Variables and Time
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `gameTime` | Total game time in ticks since world creation. | `0` |
| `dayTime` | Time of the current day in ticks (0 to 24000). | `0` |
| `seed` | Unique numeric seed for the current render context. | Passed from context |

### 2. Entity (Holder) Parameters
These parameters refer to the creature (player or mod) holding the item.
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `holderX` | X coordinate of the entity position in the world. | `0` |
| `holderY` | Y coordinate of the entity position in the world. | `0` |
| `holderZ` | Z coordinate of the entity position in the world. | `0` |
| `yaw` | Horizontal rotation of the entity (in degrees). | `0` |
| `pitch` | Vertical rotation of the entity (head tilt). | `0` |
| `health` | Current health amount of the entity. | `20` |
| `maxHealth` | Maximum possible health of the entity. | `20` |
| `fallDistance` | Entity fall distance. | `0` |
| `motionX` | Speed along the X axis. | `0` |
| `motionY` | Vertical speed (positive when jumping, negative when falling). | `0` |
| `motionZ` | Speed along the Z axis. | `0` |
| `speed` | Total movement speed of the entity. | `0` |
| `horizontalSpeed` | Horizontal movement speed (X and Z). | `0` |
| `onGround` | Whether the entity is on the ground (1 - yes, 0 - no). | `0` |
| `isSprinting` | Whether the entity is sprinting (1 - yes, 0 - no). | `0` |
| `isCrouching` | Whether the entity is crouching (1 - yes, 0 - no). | `0` |
| `isInWater` | Whether the entity is in water (1 - yes, 0 - no). | `0` |
| `isInLava` | Whether the entity is in lava (1 - yes, 0 - no). | `0` |
| `isSwimming` | Whether the entity is swimming (1 - yes, 0 - no). | `0` |
| `isFallFlying` | Whether the entity is flying with elytra (1 - yes, 0 - no). | `0` |
| `isAlive` | Whether the entity is alive (1 - yes, 0 - no). | `0` |
| `isOnFire` | Whether the entity is on fire (1 - yes, 0 - no). | `0` |
| `isInvisible` | Whether the entity is invisible (1 - yes, 0 - no). | `0` |
| `hurtTime` | Time since damage was received (in ticks). | `0` |
| `deathTime` | Time since death (in ticks). | `0` |
| `invulnerableTime` | Remaining invulnerability time (in ticks). | `0` |
| `age` | Entity age in ticks (relevant for passive mobs). | `0` |

### 3. Player Parameters
Available only if the item is held by a player. Otherwise, standard values are returned.
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `food` | Current player hunger level (0 - 20). | `20` |
| `saturation` | Player saturation level (hidden food scale). | `5` |
| `experienceLevel` | Current experience level (number above experience bar). | `0` |
| `xpProgress` | Progress to next experience level (0.0 to 1.0). | `0.0` |
| `totalXp` | Total player experience amount. | `0.0` |
| `armor` | Total armor points value on the player. | `0` |
| `air` | Current air supply (in ticks). | `0` |
| `maxAir` | Maximum air supply (in ticks). | `0` |
| `attackCooldown` | Current attack readiness (0.0 to 1.0). | `0.0` |
| `sleeping` | Whether the player is sleeping (1 - yes, 0 - no). | `0` |
| `attackProgress` | Animation progress of a hit from 0 to 1. | `0` |
| `usageProgress` | Animation progress of using an item from 0 to 1. | `0` |
| `isSlim` | Is player arms slim: 1 - yes, 0 - no | `0` |

### 4. Environment and Lightin
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `lightSky` | Sky lighting level at current position (0 - 15). | `0` |
| `lightBlock` | Lighting level from blocks (torches, lamps) (0 - 15). | `0` |
| `lightTotal` | Maximum value between `lightSky` and `lightBlock`. | `0` |
| `biomeTemp` | Base temperature of the biome where the entity is located. | `0` |
| `sunAngle` | Solar angle in the sky (0.0 to 1.0). | `0.0` |
| `moonPhase` | Current moon phase (integer from 0 to 7). | `0` |

