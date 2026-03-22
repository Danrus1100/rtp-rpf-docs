# Система патчей
Если вы хотите, чтобы ваш набор ресурсов мог работать и в ванилле, то вы можете использовать систему патчей: она позволяет вставлять шаблоны вместо любой модели. Идея патчей заключается в том, что ванильные типы моделей стоит держать в папке `items`, а те, что добавляет мод — в `rpt/templates`.

## Использование
RPT умеет читать необязательное поле `rpt$patch`, которое будет указывать на ссылку шаблона-патча:
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

В данном случае, если у нас будет такой шаблон...

```json
{
    "model": {
        "type": "select",
        // какие-то параметры...
        "cases": [
            {...}
        ]
    }
}
```

...то где-то "под капотом" игры модель предмета превратится в это:

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
                    // какие-то параметры...
                    "cases": [
                        {...}
                    ]
                }
            }
        ]
    }   
}
```