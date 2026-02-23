<template>
  <ExamplesFlat :examples="examples" />
</template>

<script setup>
import ExamplesFlat from './ExamplesFlat.vue'

const examples = [
  {
    title: 'RPF Delegation',
    type: 'rpf',
    icon: '/icon.png',
    description: 'Basic delegation example - show custom model for items with NBT tag, delegate others to lower priority packs.',
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
    title: 'RPT Templates',
    type: 'rpt',
    icon: '/icon2.png',
    description: 'Reuse complex model configurations across multiple items with the template system.',
    code: [
      {
        label: 'Item model:',
        content: `{
  "model": {
    "type": "rpt:template",
    "template": "mypack:weapon_template"
  }
}`
      },
      {
        label: 'Template file (mypack/rpt/templates/weapon_template.json):',
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
