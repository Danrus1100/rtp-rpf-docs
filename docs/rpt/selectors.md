# Selector System

Selectors are JSON files that can select and apply objects. Currently, there are 2 types:
 - Texture swappers (`rpt/swappers`)
 - First-person transformations (`rpt/first_person`)

## Texture Swappers

Texture swappers allow you to substitute certain textures in the game depending on the associated item.

At the time of writing, swappers can change 3 types of textures:
 - Player armor (`textures\entity\equipment\humanoid`)
 - Spyglass glass
 - Overlay texture (in vanilla, only Carved Pumpkin exists)

Swapper files must be located in `assets\namespace\rpt\swappers`. A swapper **JSON** file should be placed in the same path as the texture you want to replace (for example, for diamond outer armor, it would be `assets\minecraft\rpt\swappers\textures\entity\equipment\humanoid\diamond.json` from the root of the pack).

A Swapper object is a path to a texture (e.g., `namespace:full/path/to/texture.png`).

::: warning Please Note
While it is technically possible to specify a `fallback` for swappers (see ["Syntax"](#syntax)), they will be ignored to allow other packs to work as well. Please avoid using them!
:::

## First-Person Transformations

First-person transformations allow you to override how items are positioned on your screen when viewed in first person. Applicable to any item.

Transformation files are located in `assets\namespace\rpt\first_person`. You need to place a **JSON** file in the same namespace and name of the item model from the item component you want to change (for example, for a diamond, it would be `assets\minecraft\rpt\first_person\diamond.json`).

A transformation object is a JSON object with this syntax:

```json
{
    "main": {
        "rotation": [ // Rotation
            "1+1",
            0,
            2
        ],
        "translation": [ // Position
            // Same as rotation
        ],
        "scale": [ // Size
            // Same as rotation
        ]
    },
    "offhand": {
        // Same as "main"
    }
}
```

Values support [mathematical expressions](expressions.md), and you can also use 2 additional game variables here:
 - `drawProgress`: Item equip progress from 0 to 1
 - `rightHand`: 1 if the item is in the right hand, 0 otherwise

::: warning Please Note
These transformations will not adapt to which hand the item is held in. If you want the item to be displayed correctly in each hand, you must manually define both types of transformations for each hand.
:::

## Syntax

Selector syntax resembles item models but has different types:

 - `rpt:apply` applies the object from `value` without checks:

```json
{
    "type": "rpt:apply",
    "value": ...
}
```
 - `rpt:component` checks a component of the item associated with the texture (similar to the item model `select` type):

```json    
{
    "type": "rpt:component",
    "component": "custom_name",
    "cases": [
        {
            "when": "hi",
            "child": {...}
        }
    ],
    "fallback": {...}
}
```
If nothing is specified in `fallback`, an empty swapper will be used.

 - `rpt:empty` - an empty swapper 

 ```json
 {
    "type": "rpt:empty"
 }
 ```

 - `rpt:expression` - expressions. The same variables as in the [Mathematical Expressions](expressions.md#game-variables) section.

 ```json
 {
    "type": "rpt:expression",
    "value": "1 + 2",
    "cases": [
        {
            "when": 2,
            "child": {...}
        },
        {
            "when": [ "<4" , ">=3" ],
            "all": true,
            "child": {...}
        }
    ],
    "fallback": {...}
 }
 ```

  - `rpt:composite` - apply multiple swappers simultaneously

  ```json
  {
    "type": "rpt:composite",
    "children": [
        {...},
        {...}
    ]
  }
  ```

 Note that this selector type may not work correctly in some cases: for armor swappers, ONLY either the first or the last texture will be rendered. This function should be used for overlay textures (including the spyglass) as it was originally designed for them.
