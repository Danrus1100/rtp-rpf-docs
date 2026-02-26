# Experimental Features

RPT includes some experimental features that are not currently stable. They should not be used as a foundation for core mechanics or similar, but they are definitely worth a try!

## Arm Rotation

You can set the arm rotation for the item the player is holding! This is done by "wrapping" your model in the `rpt:arm_transform` model:

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

In the example above, we specified the arm rotation used in the vanilla game when a player holds an item. Below is a list of vanilla rotations:
 - `empty` - Player is holding nothing.
 - `item` - Player is holding an item that doesn't trigger specific rotations below.
 - `block` - Player is raising a shield.
 - `bow_and_arrow` - Player is pulling a bowstring.
 - `throw_trident` - Player is preparing to throw a trident.
 - `crossbow_charge` - Player is charging a crossbow.
 - `crossbow_hold` - Player is holding a charged crossbow.
 - `spyglass` - Player is looking through a spyglass.
 - `toot_horn` - Player is blowing a goat horn.
 - `brush` - Player is waving a brush.
 - `spear` - Player is using a spear as a kinetic weapon (For 1.21.11 and above).

In addition to vanilla rotations, you can define your own or modify certain settings of the vanilla ones: 


```json
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": {
            // axis rotation
            "x": 0, 
            "y": 0,
            "z": 0,
            "bob": true, // whether to apply the "breathing" animation
            "swing": true, // whether to apply the arm swing animation when walking
            "to_head": false, // whether to lock the arm rotation to the head
            "type": "item" // vanilla animation type
        },
        "model": { ... }
    }
}
```

Note: If you specify a `type` in the entry above, the axis rotations will **NOT** be applied!

---
### Simple Example:
![rpt-demo-arm](https://i.postimg.cc/mgw33F3T/rpt-demo-arm.gif)

```json
{
    "model": {
        "type": "rpt:arm_transform",
        "transform": {
            "x": -90,
            "swing": false,
            "to_head": true
        },
        "model": {
            "type": "model",
            "model": "item/diamond_pickaxe"
        }
    }
}
```