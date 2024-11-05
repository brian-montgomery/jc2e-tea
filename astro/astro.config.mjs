import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';


const version = process.env.npm_package_version;

export default defineConfig({
  server: {
    host: "0.0.0.0",
  },
	integrations: [
		starlight({
			title: `1733: Tea & Business`,
		  logo: {
		    src: './public/favicon.svg',
		  },
      customCss: [
        '@fontsource/baskervville-sc/400.css',
        // '@fontsource/baskervville/400.css',
        // Possible font: Cormorant
        '@fontsource-variable/cormorant/index.css',
        '@fontsource/great-vibes/400.css',
        // '@fontsource/pinyon-script/400.css',
        // '@fontsource/luxurious-script/400.css',
        './src/assets/styles/custom.css',
      ],
			social: {
				github: 'https://github.com/brian-montgomery/jc2e-tea',
			},
			sidebar: [
				{
					label: 'Design',
					autogenerate: { directory: 'design' },
				},
				// {
				// 	label: `Rules v${version}`,
				// 	autogenerate: { directory: 'rules' },
				// },
			],
		}),
	],
});
