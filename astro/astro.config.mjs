import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import { i18nRemarkPlugin } from './remark/i18n.mjs';
import starlightMarkdownBlocks from 'starlight-markdown-blocks';

const version = process.env.npm_package_version;
const basePath = 'jc2e-tea';

export default defineConfig({
	site: 'https://brian-montgomery.github.io',
	base: `/${basePath}`,
	server: {
		host: "0.0.0.0",
		port: 1733,
	},
	markdown: {
		remarkPlugins: [ i18nRemarkPlugin ],
	},
	integrations: [
		starlight({
			title: '1733: Colonial Tea',
			logo: {
				src: './public/favicon.svg',
			},
			customCss: [
				'@fontsource-variable/baskervville-sc/index.css',
				'@fontsource-variable/baskervville/index.css',
				'@fontsource-variable/libre-bodoni/index.css',
				'@fontsource/great-vibes/index.css',
				'./src/assets/styles/deckyard.css',
				'./src/assets/styles/custom.css',
				'./src/assets/styles/cards.css',
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/brian-montgomery/jc2e-tea' },
			],
			sidebar: [
        {
          label: `Rules v${version}`,
        	autogenerate: { directory: 'rules' },
        },
        {
          label: 'Print and Play Components',
          items: [
            {
              label: "Scenario Board",
              link: '/components/board',
            },
            {
              label: "Setup Cards",
              link: '/decks/setup',
            },
            {
              label: "Office Cards",
              link: '/decks/office',
            },
            {
              label: "Board of Trade Deck",
              link: '/decks/acts',
            },
            {
              label: "Smuggler Deck",
              link: '/decks/smuggler',
            },
            {
              label: "Events in America Deck",
              link: '/decks/events',
            },
          ]
				},
        {
          label: 'Design',
          autogenerate: { directory: 'design' },
        },
			],
      plugins: [
        starlightMarkdownBlocks({
          blocks: {
            bonus: {
              label: '£',
              render: ({ h, label, children }) =>
                h('div', { class: 'bonus sl-flex' }, [
                  h('p', { class: 'pound'}, label),
                  h('div', { class: 'text' }, children),
                ]),
            },
          },
        }),
      ],
		}),
	],
});
