# Template System

You can create template *json* files in `assets/{namespace}/rpt/templates/` with any names and use them later. Their structure is similar to items from the `items` folder, with the only exception that you cannot specify `hand_animation_on_swap` and `oversized_in_gui` in them.

---

In the `minecraft/items` folder:
```json
{
  "model": {
    "type": "rpt:template",
    "template": "namespace:my_template"
  }
}
```
In the `namespace/rpt/templates` folder:

```json
{
    "model": {
        "type": "rpt:variable",
        "variable": "bell_model"
    }, 
    "rpt": {
        "variables" : {
            "models": {
                "bell_model": "item/totem_of_undying"
            }
        }
    }
}
```

Template files themselves can be named anything and can even be nested within each other! So you won't have to write [11 thousand(!)](https://modrinth.com/resourcepack/more-clocks) lines of tangled objects anymore!

::: warning Note
Templates can override values from the item's `rpt` field, so use distinct variable and flag names to avoid conflicts.
:::
