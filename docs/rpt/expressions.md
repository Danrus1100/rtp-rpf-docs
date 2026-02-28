# Math Expressions

## Getting Started

Beyond simply reading variables, there is a more advanced way to work with them using math expressions. You can experience the full power of this approach with the `rpt:expression` model:

```json{3-10}
{
    "model": {
        "type": "rpt:expression",
        "value": "foo + 1",
        "cases": [
            {
                "when": [ 6 ], 
                "model":  { ... }  // This model will be used because 5 + 1 = 6!
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

In addition to exact comparisons, you can use other comparison expressions, constants, and functions in `when`. You can find a full list in the [EvalEx documentation](https://ezylang.github.io/EvalEx/references/references.html).

```json
{
    "model": {
        "type": "rpt:expression",
        "value": "SIN(5) + PI", // [!code focus]
        "cases": [
            {
                "when": [ ">=0" ], // [!code focus]
                "all": true,
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
 
Along with variables from `rpt`, you can also use game variables in expressions:

### 1. Global Variables and Time
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `gameTime` | Total game time in ticks since the world was created. | `0` |
| `dayTime` | Time of the current day in ticks (0 to 24000). | `0` |
| `seed` | Unique numeric seed for the current render context. | Passed from context |

### 2. Entity (Holder) Parameters
These parameters relate to the entity (player or mob) holding the item.
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `holderX` | X coordinate of the entity's position in the world. | `0` |
| `holderY` | Y coordinate of the entity's position in the world. | `0` |
| `holderZ` | Z coordinate of the entity's position in the world. | `0` |
| `yaw` | Horizontal rotation of the entity (in degrees). | `0` |
| `pitch` | Vertical rotation of the entity (head tilt). | `0` |
| `health` | Current health of the entity. | `20` |
| `maxHealth` | Maximum possible health of the entity. | `20` |
| `motionY` | Vertical velocity (positive when jumping, negative when falling). | `0` |
| `age` | Age of the entity in ticks (relevant for passive mobs). | `0` |

### 3. Player Parameters
Only available if the item is held by a player. Otherwise, default values are returned.
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `food` | Current hunger level of the player (0–20). | `20` |
| `saturation` | Saturation level of the player (hidden food scale). | `5` |
| `experienceLevel` | Current experience level (number above the XP bar). | `0` |
| `armor` | Total armor points on the player. | `0` |

### 4. Environment and Lighting
| Variable | Description | Default Value |
| :--- | :--- | :--- |
| `lightSky` | Sky light level at the current position (0–15). | `0` |
| `lightBlock` | Block light level (torches, lamps, etc.) (0–15). | `0` |
| `lightTotal` | Maximum value between `lightSky` and `lightBlock`. | `0` |
| `biomeTemp` | Base temperature of the biome the entity is in. | `0` |
| `sunAngle` | Sun angle in the sky (0.0 to 1.0). | `0.0` |
| `moonPhase` | Current moon phase (integer from 0 to 7). | `0` |
