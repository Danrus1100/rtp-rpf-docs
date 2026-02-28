# Pack Developers Guide

First, I highly recommend studying the [Items Model Definition Wiki](https://minecraft.wiki/w/Items_model_definition) to understand what's going on here.

RPT adds a variable system and tools for working with them. Below is a description of how to work with them.

## `rpt` Field

Now in each *json* file you can specify an `rpt` field, which contains flags and variables in the format shown in the code block below. They can be read through specific item models. You can read about this [here](work-with-variables.md).

```json
{
  "model": {
    ...
  },
  "rpt": {
    "custom_flags": [ // Additional flags
      "foo",
      "bar"
    ],
    "variables": { // Variables
      "strings": { // Strings
        "foo": "bar"
      },
      "numbers": { // Numbers
        "foo": 42
      },
      "flags": { // Flags (true/false)
        "hello_world": true
      },
      "models": { // Models (from the models/ folder)
        "bar": "minecraft:iron_ingot"
      }
    }
  }
}
```
