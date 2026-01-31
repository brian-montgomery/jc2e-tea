import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { i18nRemarkPlugin } from './remark/i18n.mjs';

const version = process.env.npm_package_version;
const basePath = 'jc2e-tea';

export default defineConfig({
	site: 'https://brian-montgomery.github.io',
	base: basePath,
	server: {
		host: "0.0.0.0",
		port: 1733,
	},
	markdown: {
		remarkPlugins: [ i18nRemarkPlugin ],
	},
	integrations: [
		starlight({
			title: `1733: Tea & Business`,
			logo: {
				src: './public/favicon.svg',
			},
			customCss: [
				'@fontsource-variable/baskervville-sc/index.css',
				'@fontsource-variable/baskervville/index.css',
				'@fontsource-variable/libre-bodoni/index.css',
				'@fontsource/great-vibes/index.css',
				'./src/assets/styles/custom.css',
			],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/brian-montgomery/jc2e-tea' },
			],
			sidebar: [
				{
					label: 'Design',
					autogenerate: { directory: 'design' },
				},
        // {
        // 	label: `Rules v${version}`,
        // 	autogenerate: { directory: 'rules' },
        // },
        {
					label: 'Components',
          items: [
            {
              label: "Colonial Acts Deck",
              link: '/decks/acts',
            },
            {
              label: "Events in America Deck",
              link: '/decks/events',
            },
          ]
				},
			],
		}),
	],
});
