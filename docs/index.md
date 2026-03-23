---
layout: home

hero:
  name: "RPF & RPT"
  text: "Resource Pack Tools"
  tagline: "Advanced resource pack delegation and item model management for Minecraft 1.21+"
  image:
    src: /icon.png
    alt: RPF & RPT Logo
  actions:
    - theme: brand
      text: Get Started with RPF
      link: "/rpf/getting-started"
    - theme: alt
      text: Get Started with RPT
      link: "/rpt/getting-started"
---

<FullWidthFeatures :features="[
  {
    title: 'Resource Packs Fusion (RPF)',
    details: 'Smart delegation system that allows multiple resource packs to work together seamlessly. Enables pack creators to override specific models while delegating others to lower-priority packs.',
    link: 'rpf/getting-started',
    linkText: 'Learn more about RPF',
    image: '/rpf-demo.gif'
  },
  {
    title: 'Resource Packs Tweaks (RPT)',
    details: 'Advanced templating system, variable support, and regex-based conditional models. Create dynamic item models that respond to item data without custom model data.',
    link: 'rpt/getting-started',
    linkText: 'Learn more about RPT',
    image: '/rpt-demo.gif'
  }
]" />

<WhySimple />

<ProjectsShowcase 
  title="Projects related with RPF/RPT"
  description="Discover resource and mods packs powered by our tools"
  :autoplayInterval=3000
  :projects="[
    {
      title: 'KSEPSP v9.5',
      description: 'Designed to modify the textures and models of items and entities in the game through renaming.',
      tag: 'Resource Pack',
      sponsored: true,
      icon: 'https://i.postimg.cc/7Yy6SXtc/photo-2026-03-22-21-27-27.jpg',
      banner: 'https://static.planetminecraft.com/files/image/minecraft/texture-pack/2025/912/19256762-ksepsp_l.webp',
      planetminecraft: 'https://www.planetminecraft.com/texture-pack/ksepsp-v9-optifine-cit/',
      linkText: 'Catalog',
      link: 'https://definitelyawhale.github.io/ksepsp_website/'
    },
    {
      title: 'Six Seven!!!',
      description: 'SHOW YOU LOVE TO SIX SEVEN MEME!!!',
      tag: 'Resource Pack',
      icon: 'https://cdn.modrinth.com/data/fgtfCYUw/d5b03a97f317db5393d473c514a47581c76b0466.gif',
      banner: 'https://i.postimg.cc/rwSXybHw/ezgif-2448171ea0c06b6f.gif',
      modrinth: 'https://modrinth.com/resourcepack/six-seven-for-rpt'
    },
    {
      title: 'KPBSPM',
      description: 'A modpack created specifically for the players of the SPM server',
      tag: 'Mod Pack',
      icon: 'https://cdn.modrinth.com/data/syzzS7Nd/db2b5efce9fc78c64ba1f7a75984d6deae757a21_96.webp',
      banner: 'https://cdn.modrinth.com/data/syzzS7Nd/images/52c1bbabebcffade444f97f2a626fa5129a9e4e1.png',
      modrinth: 'https://modrinth.com/modpack/kpbspm-spm-edition'
    },
    {
      title: 'Playing Cards for MoreDeco',
      description: 'Playing cards renamed, works on vanilla 1.21.5+',
      tag: 'Resource Pack',
      icon: 'https://cdn.modrinth.com/data/WVQgsows/95d2ab5ce288c198d449691e483a1bf1d48aa4ae_96.webp',
      banner: 'https://cdn.modrinth.com/data/WVQgsows/images/64ff31bb2e280ea730e6a0d7fc333f054853f9ae.png',
      modrinth: 'https://modrinth.com/resourcepack/playing-cards-for-moredeco'
    },
    {
      title: 'NSmp',
      description: 'Modpack for vanilla, private servers. An optimizing, decorating Minecraft build aimed at a vanilla and comfortable game.',
      tag: 'Mod Pack',
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

## Getting Started

::: tip Choose Your Path
- **Pack Creators**: Start with [RPF Pack Developers Guide](/rpf/pack-developers) to learn delegation
- **Advanced Pack Creators**: Add [RPT](/rpt/getting-started) for templates and variables
- **Mod Developers**: Check the API documentation for integration
:::


