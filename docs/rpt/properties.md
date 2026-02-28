# Properties

**RPT** adds new properties for `select` and `condition` models:

## Select Properties
 1. `rpt:biome` - the biome the item holder is currently in
 2. `rpt:weather` - the current weather in the world. Can be `none` (if the item is rendered outside the world), `clear`, or `rain`. ~~`thunder` technically exists as well, but it cannot be detected by the vanilla game client~~
 3. `rpt:difficulty` - the current game difficulty. Can be `none` (if the item is rendered outside the world), `hardcore`, `peaceful`, `easy`, `normal`, or `hard`

## Condition Properties
 1. `in_fluid` - whether the item holder is currently in a fluid
 2. `entity_flag` - accepts a `flag` parameter, which can be:
    - `on_fire` - whether the entity is currently on fire.
    - `sneaking` - whether the entity is sneaking (crouching).
    - `sprinting` - whether the entity is sprinting.
    - `swimming` - whether the entity is swimming.
    - `gliding` - whether the entity is gliding (using Elytra).
    - `climbing` - whether the entity is climbing (e.g., a ladder or vine).
    - `is_player` - whether the entity is a player.
