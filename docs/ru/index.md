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
---

<FullWidthFeatures :features="[
  {
    title: 'Resource Packs Fusion (RPF)',
    details: 'Умная система делегирования, позволяющая нескольким ресурспакам работать вместе без конфликтов. Позволяет создателям паков переопределять определённые модели, делегируя остальные пакам с более низким приоритетом.',
    link: 'rpf/getting-started',
    linkText: 'Узнать больше о RPF',
    image: '/rpf-demo.gif'
  },
  {
    title: 'Resource Packs Tweaks (RPT)',
    details: 'Продвинутая система шаблонов, поддержка переменных и условных моделей на основе regex. Создавайте динамические модели предметов, реагирующие на данные предмета без custom model data.',
    link: 'rpt/getting-started',
    linkText: 'Узнать больше о RPT',
    image: '/rpt-demo.gif'
  }
]" />

<WhySimpleRu />

<ProjectsShowcase 
  title="Проекты, связанные с RPF/RPT"
  description="Изучите наобры ресурсов и сборки модов, использующие наши инструменты"
  :isRussian=true
  :autoplayInterval=3000
  :projects="[
    {
      title: 'КСЭПСП v9.5',
      description: 'Предназначен для изменения текстур и моделей предметов и сущностей в игре путём их переименования.',
      tag: 'Набор Ресурсов',
      sponsored: true,
      icon: 'https://i.postimg.cc/7Yy6SXtc/photo-2026-03-22-21-27-27.jpg',
      banner: 'https://static.planetminecraft.com/files/image/minecraft/texture-pack/2025/912/19256762-ksepsp_l.webp',
      planetminecraft: 'https://www.planetminecraft.com/texture-pack/ksepsp-v9-optifine-cit/',
      linkText: 'Каталог',
      link: 'https://definitelyawhale.github.io/ksepsp_website/'
    },
    {
      title: 'Six Seven!!!',
      description: 'ПОКАЖИ СВОЮ ЛЮБОВЬ К СИКС СЕВЕН!!!',
      tag: 'Набор Ресурсов',
      icon: 'https://cdn.modrinth.com/data/fgtfCYUw/d5b03a97f317db5393d473c514a47581c76b0466.gif',
      banner: 'https://i.postimg.cc/rwSXybHw/ezgif-2448171ea0c06b6f.gif',
      modrinth: 'https://modrinth.com/resourcepack/six-seven-for-rpt'
    },
    {
      title: 'КПБСПМ',
      description: 'Сборка модов созданная специально для игроков сервера СПм',
      tag: 'Сборка',
      icon: 'https://cdn.modrinth.com/data/syzzS7Nd/db2b5efce9fc78c64ba1f7a75984d6deae757a21_96.webp',
      banner: 'https://cdn.modrinth.com/data/syzzS7Nd/images/52c1bbabebcffade444f97f2a626fa5129a9e4e1.png',
      modrinth: 'https://modrinth.com/modpack/kpbspm-spm-edition'
    },
    {
      title: 'Playing Cards for MoreDeco',
      description: 'Игральные карты по переименованию, работает на ваниле 1.21.5+',
      tag: 'Набор Ресурсов',
      icon: 'https://cdn.modrinth.com/data/WVQgsows/95d2ab5ce288c198d449691e483a1bf1d48aa4ae_96.webp',
      banner: 'https://cdn.modrinth.com/data/WVQgsows/images/64ff31bb2e280ea730e6a0d7fc333f054853f9ae.png',
      modrinth: 'https://modrinth.com/resourcepack/playing-cards-for-moredeco'
    },
    {
      title: 'NSmp',
      description: 'Оптимизированная и эстетичная ванильная сборка для приватных сервера NetherSword Для Minecraft 1.21.8+',
      tag: 'Сборка',
      icon: 'https://cdn.modrinth.com/data/RDlCZ5F9/3343f46fb661eeb7f1ec602fb5a862b16b7dbd20_96.webp',
      banner: 'https://cdn.modrinth.com/data/RDlCZ5F9/images/2dc1a42cd3e4025cbd7ca402c095a29358baf928.jpeg',
      modrinth: 'https://modrinth.com/modpack/nsp'
    },
    {
      title: 'Der Wohlstand',
      description: 'Custom entities & items for RP purposes, thematically based on Der Wohlstand.',
      tag: 'Resource Pack',
      banner: 'https://cdn.modrinth.com/data/cached_images/0eefa39c5a5f5637639264f618852f84c734acae_0.webp',
      icon: 'https://cdn.modrinth.com/data/PtBnrZDH/05b5d81d63c780826a3c95a11bb753bb5fd6c085_96.webp',
      modrinth: 'https://modrinth.com/resourcepack/der-wohlstand'
    }
  ]"
/>

## Начало работы

::: tip Выберите свой путь
- **Создатели паков**: Начните с [Руководства для создателей паков RPF](/ru/rpf/pack-developers), чтобы изучить делегирование
- **Продвинутые создатели паков**: Добавьте [RPT](/ru/rpt/getting-started) для использования шаблонов и переменных
- **Разработчики модов**: Ознакомьтесь с документацией API для интеграции
:::

