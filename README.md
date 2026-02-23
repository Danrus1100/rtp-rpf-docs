# RPF & RPT Documentation

VitePress documentation site for RPF (Resource Packs Fusion) and RPT (Resource Packs Tools) Minecraft mods.

## Development

```bash
npm install
npm run docs:dev
```

## Build

```bash
npm run docs:build
```

## Deployment

The site is automatically deployed to GitHub Pages via `.github/workflows/deploy.yml` on push to main branch.

## Adding Examples

Edit `docs/.vitepress/theme/components/ExamplesSectionFlat.vue` (English) or `ExamplesSectionFlatRu.vue` (Russian).

Add new example to the `examples` array:

```javascript
{
  title: 'Example Name',
  type: 'rpf',  // 'rpf' or 'rpt'
  icon: '/icon.png',  // '/icon.png' for RPF, '/icon2.png' for RPT
  description: 'Description text',
  code: [
    {
      label: 'Optional label:',
      content: `your JSON code here`
    }
  ],
  media: '/path/to/image.gif'  // optional
}
```

## Structure

- `docs/` - Documentation content
- `docs/.vitepress/theme/components/` - Vue components
- `docs/public/` - Static assets (icons, images)
