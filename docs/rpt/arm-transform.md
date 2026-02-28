# Arm Rotation

### Vanilla Rotations
You can set the arm rotation for an item the player is holding! This is done by "wrapping" your model in the `rpt:arm_transform` model:

```json{3-4}
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": "item",
        "model": {
            "type": "model",
            "model": "item/diamond_pickaxe"
        }
    }
}
```

In the example above we specified the arm rotation used in vanilla when the player holds an item. Below is the list of vanilla rotations:
 - `empty` - the player is holding nothing
 - `item` - the player is holding an item that does not trigger any of the rotations below
 - `block` - the player is raising a shield
 - `bow_and_arrow` - the player is drawing a bow
 - `throw_trident` - the player is winding up a trident
 - `crossbow_charge` - the player is loading a crossbow
 - `crossbow_hold` - the player is holding a loaded crossbow
 - `spyglass` - the player is looking through a spyglass
 - `toot_horn` - the player is blowing a goat horn
 - `brush` - the player is using a brush
 - `spear` - the player is using a spear as a kinetic weapon (for 1.21.11 and above)

In addition to vanilla rotations, you can define your own or override some settings of vanilla ones:

### Creating a Custom Rotation

```json
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": {
            // rotation along axes
            "x": 0, 
            "y": 0,
            "z": 0,
            "bob": true, // whether to apply the "breathing" animation
            "swing": true, // whether to apply the arm-swing animation while walking
            "type": "item" // vanilla animation type
        },
        "model": { ... }
    }
}
```
::: info Note
If you specify `type` in the object above, axis rotations will **NOT** be applied!
:::

In addition to numbers, axes support expressions (see [`Math Expressions`](expressions.md) for details):

```json
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": {
            "x": "sin(time*0.75) * 45 - 90", // [!code focus] The player will wave their hand in front of their face
            "swing": false
        },
        "model": {
            "type": "model",
            "model": "item/bell"
        }
    }
}
```
RPT also provides some variables you can use:

 - `time` - game time in ticks
 - `hx/hy/hz` - head rotation along axes
 - `arm` - the hand holding the item: `1` for right hand, `-1` for left hand

::: warning Note
The variables described in [`Math Expressions`](expressions.md) will **not** work inside `rpt:arm_transform`!
:::

---
### Simple Example:
<CodeMediaBlock 
  mediaSrc="https://i.postimg.cc/mgw33F3T/rpt-demo-arm.gif" 
  altText="rpt-demo-arm" 
  :reverse="true" 
  mediaWidth="40%" 
  objectFit="cover"
>

```json
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": {
            "x": "hx - 90",
            "y": "hy",
            "swing": false
        },
        "model": {
            "type": "model",
            "model": "item/diamond_pickaxe"
        }
    }
}
```
</CodeMediaBlock>
