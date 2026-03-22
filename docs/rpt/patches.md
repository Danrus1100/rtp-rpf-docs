# Patch System
If you want your resource pack to work in vanilla Minecraft as well, you can use the patch system: it allows you to insert templates instead of any model. The idea behind patches is that vanilla model types should be kept in the `items` folder, while those added by the mod should be in `rpt/templates`.

## Usage
RPT can read an optional `rpt$patch` field, which points to a patch template link:
```json
{
    "model": {
        "type": "minecraft:select",
        "property": "minecraft:component",
        "component": "custom_name",
        "cases": [
            {
                "when": ["cool", "name"],
                "model": {
                    "rpt$patch": "foo:path/to/patch/template", // [!code focus]
                    "type": "model",
                    "model": "foo:bar"
                }
            }
        ]
    }   
}
```

In this case, if we have a template like this...

```json
{
    "model": {
        "type": "select",
        // some parameters...
        "cases": [
            {...}
        ]
    }
}
```

...then "under the hood" of the game, the item model will turn into this:

```json
{
    "model": {
        "type": "minecraft:select",
        "property": "minecraft:component",
        "component": "custom_name",
        "cases": [
            {
                "when": ["cool", "name"],
                "model": {
                    "type": "select",
                    // some parameters...
                    "cases": [
                        {...}
                    ]
                }
            }
        ]
    }   
}
```
