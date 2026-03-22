<template>
  <ExamplesFlat 
    title="Примеры" 
    description="Изучите примеры возможностей RPF и RPT"
    :examples="examples" 
  />
</template>

<script setup>
import ExamplesFlat from './ExamplesFlat.vue'

const examples = [
  {
    title: 'RPF Делегирование',
    type: 'rpf',
    icon: '/icon.png',
    description: 'По умолчанию у select и range_select параметр delegate всегда равен true, что означает, что если ни один из кейсов не сработал, модель будет делегирована паку с более низким приоритетом. В этом примере мы отключаем делегирование и показываем кастомную модель только для предметов с определенным NBT тегом.',
    code: [
      {
        content: `{
  "type": "select",
  "property": "minecraft:custom_data",
  "cases": [
    {
      "when": { "special_sword": true },
      "model": { "type": "minecraft:model", "model": "item/special_sword" }
    }
  ],
  "delegate": false
}`
      }
    ]
  },
  {
    title: 'RPT Шаблоны',
    type: 'rpt',
    icon: '/icon2.png',
    description: 'Повторное использование сложных конфигураций моделей для нескольких предметов с системой шаблонов.',
    code: [
      {
        label: 'Модель предмета:',
        content: `{
  "model": {
    "type": "rpt:template",
    "template": "mypack:weapon_template"
  }
}`
      },
      {
        label: 'Файл шаблона (mypack/rpt/templates/weapon_template.json):',
        content: `{
  "model": {
    "type": "model",
    "model": "minecraft:stone"
  }
}`
      }
    ]
  }
]
</script>
