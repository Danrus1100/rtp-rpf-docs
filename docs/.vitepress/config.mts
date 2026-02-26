import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "RPF & RPT Docs",
  description: "Documentation for Resource Packs Fusion and Resource Packs Tools - Minecraft mods for advanced resource pack delegation and item model management",
  
  // Base URL for GitHub Pages (replace 'rtp-rpf-docs' with your repo name if different)
  base: '/rtp-rpf-docs/',
  
  // Ignore dead links during build (useful while docs are still being written)
  ignoreDeadLinks: true,
  
  head: [
    ['link', { rel: 'icon', href: '/rtp-rpf-docs/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#49C963' }]
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        logo: '/site_logo.png',
        
        nav: [
          { text: 'Home', link: '/' },
          { 
            text: 'RPF', 
            items: [
              { text: 'Getting Started', link: '/rpf/getting-started' },
              { text: 'Pack Developers', link: '/rpf/pack-developers' }
            ]
          },
          { 
            text: 'RPT', 
            items: [
              { text: 'Getting Started', link: '/rpt/getting-started' },
              { text: 'Pack Developers', link: '/rpt/pack-developers' }
            ]
          },
        ],

        sidebar: {
          '/rpf/': [
            {
              text: 'RPF - Resource Packs Fusion',
              items: [
                { text: 'Getting Started', link: '/rpf/getting-started' },
                { text: 'How It Works', link: '/rpf/how-it-works' },
                { text: 'Delegation System', link: '/rpf/delegation' },
                { text: 'Pack Developers Guide', link: '/rpf/pack-developers' }
              ]
            }
          ],
          '/rpt/': [
            {
              text: 'RPT - Resource Packs Tools',
              items: [
                { text: 'Getting Started', link: '/rpt/getting-started' },
                { text: 'Pack Developers Guide', link: '/rpt/pack-developers' },
                { text: 'Templates System', link: '/rpt/templates' },
                { text: 'Working with Variables', link: '/rpt/work-with-variables' },
                { text: 'Regular Expressions', link: '/rpt/regex' },
                { text: 'Experimental Features', link: '/rpt/experimental' },
                { text: 'Java API', link: '/rpt/java-api' }
              ]
            }
          ],
          // '/examples/': [
          //   {
          //     text: 'Examples',
          //     items: [
          //       // { text: 'Overview', link: '/examples/' },
          //       // { text: 'Basic Delegation', link: '/examples/basic-delegation' },
          //       // { text: 'Custom Models', link: '/examples/custom-models' },
          //       // { text: 'Dynamic Weapons', link: '/examples/dynamic-weapons' }
          //     ]
          //   }
          // ]
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/Danrus1100/rtp-rpf-docs' }
        ],

        footer: {
          message: 'Released under the MIT License.',
          copyright: 'Copyright © 2026-present Danrus110'
        }
      }
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        logo: '/site_logo.png',
        
        nav: [
          { text: 'Главная', link: '/ru/' },
          { 
            text: 'RPF', 
            items: [
              { text: 'Начало работы', link: '/ru/rpf/getting-started' },
              { text: 'Для создателей', link: '/ru/rpf/pack-developers' },
              // { text: 'Как это работает', link: '/ru/rpf/how-it-works' }
            ]
          },
          { 
            text: 'RPT', 
            items: [
              { text: 'Начало работы', link: '/ru/rpt/getting-started' },
              { text: 'Для создателей', link: '/ru/rpt/pack-developers' },
              // { text: 'Шаблоны', link: '/ru/rpt/templates' },
              // { text: 'Переменные', link: '/ru/rpt/variables' }
            ]
          },
          // { text: 'Примеры', link: '/ru/examples/' }
        ],

        sidebar: {
          '/ru/rpf/': [
            {
              text: 'RPF - Resource Packs Fusion',
              items: [
                { text: 'Начало работы', link: '/ru/rpf/getting-started' },
                { text: 'Как это работает', link: '/ru/rpf/how-it-works' },
                { text: 'Система делегирования', link: '/ru/rpf/delegation' },
                { text: 'Руководство для создателей наборов', link: '/ru/rpf/pack-developers' },
                { text: 'Java API', link: '/ru/rpf/java-api' }
                // { text: 'Система делегирования', link: '/ru/rpf/delegation' },
                // { text: 'Типы моделей', link: '/ru/rpf/model-types' },
                // { text: 'Отладка и логирование', link: '/ru/rpf/debug' }
              ]
            }
          ],
          '/ru/rpt/': [
            {
              text: 'RPT - Resource Packs Tools',
              items: [
                { text: 'Начало работы', link: '/ru/rpt/getting-started' },
                { text: 'Руководство для создателей наборов', link: '/ru/rpt/pack-developers' },
                { text: 'Система шаблонов', link: '/ru/rpt/templates' },
                { text: 'Работа с переменными', link: '/ru/rpt/work-with-variables' },
                // { text: 'Система шаблонов', link: '/ru/rpt/templates' },
                // { text: 'Переменные', link: '/ru/rpt/variables' },
                { text: 'Экспериментальные функции', link: '/ru/rpt/experimental' },
                { text: 'Регулярные выражения', link: '/ru/rpt/regex' },
                // { text: 'Условные свойства', link: '/ru/rpt/conditional' }
              ]
            }
          ]
        },

        socialLinks: [
          { icon: 'github', link: 'https://github.com/danrus' }
        ],

        footer: {
          message: 'Выпущено под лицензией MIT.',
          copyright: 'Copyright © 2026-present Danrus110'
        },

        docFooter: {
          prev: 'Предыдущая страница',
          next: 'Следующая страница'
        },

        outline: {
          label: 'На этой странице'
        },

        lastUpdated: {
          text: 'Обновлено'
        },

        darkModeSwitchLabel: 'Оформление',
        lightModeSwitchTitle: 'Переключить на светлую тему',
        darkModeSwitchTitle: 'Переключить на тёмную тему',
        sidebarMenuLabel: 'Меню',
        returnToTopLabel: 'Вернуться к началу',
        langMenuLabel: 'Изменить язык'
      }
    }
  },

  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          ru: {
            translations: {
              button: {
                buttonText: 'Поиск',
                buttonAriaLabel: 'Поиск'
              },
              modal: {
                noResultsText: 'Нет результатов для',
                resetButtonTitle: 'Сбросить поиск',
                footer: {
                  selectText: 'выбрать',
                  navigateText: 'перейти',
                  closeText: 'закрыть'
                }
              }
            }
          }
        }
      }
    }
  }
})
