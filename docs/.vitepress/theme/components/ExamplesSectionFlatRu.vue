<template>
  <ExamplesFlat :examples="examples" />
</template>

<script setup>
import ExamplesFlat from './ExamplesFlat.vue'

const examples = [
  {
    title: 'RPF Делегирование',
    type: 'rpf',
    icon: '/icon.png',
    description: 'Базовое делегирование - показывать кастомную модель для предметов с NBT тегом, делегировать остальные пакам с низким приоритетом.',
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
