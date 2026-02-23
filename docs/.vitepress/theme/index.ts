// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import RotatingIcons from './components/RotatingIcons.vue'
import FullWidthFeatures from './components/FullWidthFeatures.vue'
import WhySimple from './components/WhySimple.vue'
import WhySimpleRu from './components/WhySimpleRu.vue'
import ExamplesFlat from './components/ExamplesFlat.vue'
import ExamplesSectionFlat from './components/ExamplesSectionFlat.vue'
import ExamplesSectionFlatRu from './components/ExamplesSectionFlatRu.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(RotatingIcons)
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('RotatingIcons', RotatingIcons)
    app.component('FullWidthFeatures', FullWidthFeatures)
    app.component('WhySimple', WhySimple)
    app.component('WhySimpleRu', WhySimpleRu)
    app.component('ExamplesFlat', ExamplesFlat)
    app.component('ExamplesSectionFlat', ExamplesSectionFlat)
    app.component('ExamplesSectionFlatRu', ExamplesSectionFlatRu)
  }
} satisfies Theme
