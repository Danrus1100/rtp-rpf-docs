# Anchor Points
You can specify which body part an item should be attached to using the `rpt:anchor` item model:

```json
{
    "model": {
        "type": "rpt:anchor",
        "anchor": "body", // body part to attach to
        "model": {...}
    }
}
```

Body part types:
 - `right_hand`
 - `left_hand`
 - `body`
 - `head`
 - `left_leg`
 - `right_leg`
