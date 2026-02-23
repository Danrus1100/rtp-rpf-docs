---
layout: home

hero:
  name: "RPF & RPT"
  text: "Инструменты для ресурспаков"
  tagline: "Продвинутое делегирование ресурспаков и управление моделями предметов для Minecraft 1.21+"
  image:
    src: /icon.png
    alt: RPF & RPT Logo
  actions:
    - theme: brand
      text: Начать с RPF
      link: "/ru/rpf/getting-started"
    - theme: alt
      text: Начать с RPT
      link: "/ru/rpt/getting-started"
    - theme: alt
      text: Посмотреть примеры
      link: "/ru/examples"
---

::: danger ДОКУМЕТАЦИЯ В РАЗРАБОТКЕ
Документация не полна и содержит ошибки. Приношу извинения за неудобства
:::

<FullWidthFeatures :features="[
  {
    title: 'Resource Packs Fusion (RPF)',
    details: 'Умная система делегирования, позволяющая нескольким ресурспакам работать вместе без конфликтов. Позволяет создателям паков переопределять определённые модели, делегируя остальные пакам с более низким приоритетом.',
    link: '/ru/rpf/getting-started',
    linkText: 'Узнать больше о RPF',
    image: '/rpf-demo.gif'
  },
  {
    title: 'Resource Packs Tweaks (RPT)',
    details: 'Продвинутая система шаблонов, поддержка переменных и условных моделей на основе regex. Создавайте динамические модели предметов, реагирующие на данные предмета без custom model data.',
    link: '/ru/rpt/getting-started',
    linkText: 'Узнать больше о RPT'
  }
]" />

<WhySimpleRu />

<ExamplesSectionFlatRu />

## Начало работы

::: tip Выберите свой путь
- **Создатели паков**: Начните с [Руководства для создателей паков RPF](/ru/rpf/pack-developers), чтобы изучить делегирование
- **Продвинутые создатели паков**: Добавьте [RPT](/ru/rpt/getting-started) для использования шаблонов и переменных
- **Разработчики модов**: Ознакомьтесь с документацией API для интеграции
:::

