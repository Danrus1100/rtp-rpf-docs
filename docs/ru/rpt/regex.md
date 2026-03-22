# Регулярные выражения

## Работа с регулярными выражениями

Теперь у вас есть 2 инструмента для работы с регулярными выражениями:

1) Свойство `rpt:match` для модели `minecraft:condition`

вызывает `on_true`, когда компонент `custom_name` сходится с регулярным выражением, указанным в `regex`:

```json
{
  "model": {
        "type": "condition",
        "property": "rpt:match",
        "regex": "^Hello", // Все строки, начинающиеся с "Hello"
        "on_true": {
            ...
        },
        "on_false": {
            ...
        }
    }
}
```

2) модель `rpt:regex`

Проверяет, есть ли совпадения с регулярным выражением в списке `when` с компонентом `custom_name`. Здесь синтаксис очень похож на `minecraft:select`:

```json
{
  "model": {
        "type": "rpt:regex",
        "cases": [
            {
                "when": ["^Hello", "^Привет"],
                "model": {
                    "type": "model",
                    "model": "item/diamond"
                }
            },
            {
                "when": ["123"],
                "model": {
                    "type": "model",
                    "model": "item/raw_iron"
                }
            }
        ]
    }
}
```