# Система Шаблонов

Вы можете создавать *json* файлы шалбонов в `asstest/{namespace}/rpt/templates/` с любыми названиям и в дальнешем использовать их. В целом, их структура похожа на предметы из папки `items`, но за единственным исключением, что в них нельзя указать `hand_animation_on_swap` и `oversized_in_gui`

---

В папке `minecraft/items`:
```json
{
  "model": {
    "type": "rpt:template",
    "template": "namespace:my_template"
  }
}
```
В папке `namespace/rpt/templates`:

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

Сами файлы шаблонов могут называться как угодно, и даже быть вложенны дург в друга! Так что не придётся больше городить [11 тыс(!)](https://modrinth.com/resourcepack/more-clocks) строк запутанных объектов!

::: warning Обратите внимание
Шаблоны могут "перетирать" значения из поля `rpt` предмета, поэтому стоит использовать разные названия переменных и флагов, чтобы не происходило конфликтов
:::
