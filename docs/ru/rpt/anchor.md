# Якроные точки
Вы можете задавать то, к какой части тела будет приклеплен предмет с помощью модели предмета `rpt:anchor`:

```json
{
    "model": {
        "type": "rpt:anchor",
        "anchor": "body" // часть тела к которй нужно прикрепить
        "model": {...}
    }
}
```
Типы частей тела:
 - `right_hand`
 - `left_hand`
 - `body`
 - `head`
 - `left_leg`
 - `right_leg`