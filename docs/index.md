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
    - theme: alt
      text: View Examples
      link: "/examples"
---

::: danger DOUCMENTATION UNDER DEVELOPMENT
Documentation is not full and contains some errors.
:::

<FullWidthFeatures :features="[
  {
    title: 'Resource Packs Fusion (RPF)',
    details: 'Smart delegation system that allows multiple resource packs to work together seamlessly. Enables pack creators to override specific models while delegating others to lower-priority packs.',
    link: '/rpf/getting-started',
    linkText: 'Learn more about RPF',
    image: '/rpf-demo.gif'
  },
  {
    title: 'Resource Packs Tweaks (RPT)',
    details: 'Advanced templating system, variable support, and regex-based conditional models. Create dynamic item models that respond to item data without custom model data.',
    link: '/rpt/getting-started',
    linkText: 'Learn more about RPT'
  }
]" />

<WhySimple />

<ExamplesSectionFlat />

## Getting Started

::: tip Choose Your Path
- **Pack Creators**: Start with [RPF Pack Developers Guide](/rpf/pack-developers) to learn delegation
- **Advanced Pack Creators**: Add [RPT](/rpt/getting-started) for templates and variables
- **Mod Developers**: Check the API documentation for integration
:::


