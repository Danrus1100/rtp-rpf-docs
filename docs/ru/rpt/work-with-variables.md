# Работа с переменными

## Модель `rpt:variable`

Эта модель рисует блок-модель (которая находится в *models/*) из переменных по ключу, указанному в её поле `variable`

```json
{
    "model": {
        "type": "rpt:variable",
        "variable": "foo"
    },
    "rpt": {
        "variables" : {
            "models": {
                "foo": "item/apple"
            }
        }
    }
}

```

## Свойство `rpt:has_flag` для модели `minecraft:condition`

Проверяет, существует ли доп. флаг в `rpt`

```json
{
    "model": {
        "type": "condition",
        "property": "rpt:has_flag",
        "flag": "test",
        "on_false": {
            "type": "model",
            "model": "item/diamond_sword"
        },
        "on_true": { // Сработает эта модель!
            "type": "model",
            "model": "item/diamond"
        }
    },
    "rpt": {
        "custom_flags": [
            "test"
        ]
    }
}
```

## Свойство `rpt:variable` для модели `minecraft:select`

Выполняет обновление только той модели, в которой поле `when` равно переменной типа из `var_type` и по ключу `var_name`

```json
{
    "model": {
        "type": "select",
        "property": "rpt:variable",
        "var_type": "string",
        "var_name": "egg_type",
        "cases": [
            {
                "when": "chicken",
                "model": {
                    "type": "model",
                    "model": "item/egg"
                }
            }, 
            {
                "when": "turtle",
                "model": {
                    "type": "model",
                    "model": "item/turtle_egg"
                }
            }
        ]
    },
    "rpt": {
        "variables": {
            "strings": {
                "egg_type": "chicken"
            } 
        }
    }
        
}