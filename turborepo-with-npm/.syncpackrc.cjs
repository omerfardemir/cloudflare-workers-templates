// @ts-check
/** @type {import("syncpack").RcFile} */
const config = {
	indent: '\t',
	lintFormatting: false, // handled by prettier
	versionGroups: [
		{
			label: 'local packages',
			packages: ['**'],
			dependencies: ['@monocf/*'],
			dependencyTypes: ['!local'], // Exclude the local package itself
			pinVersion: '*',
		},
		{
			label: 'pin typescript for eslint',
			dependencies: ['typescript'],
			pinVersion: '5.8.3',
		},
		{
			label: `pin eslint and all it's plugins for eslint v9`,
			dependencies: [
				'eslint',
				'@types/eslint',
				'eslint-config-prettier',
				'eslint-plugin-react-hooks',
				'eslint-plugin-unused-imports',
				'@typescript-eslint/eslint-plugin',
				'@typescript-eslint/parser',
			],
			// snapTo removes it from syncpack update list, which is the main goal
			snapTo: ['@monocf/eslint-config'],
		},
    {
      label: 'pin zod for all packages',
      dependencies: ['zod'],
      pinVersion: '3.25.76'
    },
    {
      label: 'pin hono for all packages',
      dependencies: ['hono'],
      pinVersion: '4.9.8'
    },
    {
      label: `pin hono and its dependencies for @monocf/hono`,
      dependencies: [
        'hono',
        'hono-openapi',
        'workers-tagged-logger',
        'zod'
      ],
      // snapTo removes it from syncpack update list, which is the main goal
      snapTo: ['@monocf/hono'],
    },
	],
	semverGroups: [
		{
			label: 'pin all deps',
			range: '',
			dependencies: ['**'],
			packages: ['**'],
		},
	],
}

module.exports = config
