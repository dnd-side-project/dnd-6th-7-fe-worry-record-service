module.exports = {
	presets: [
		'module:metro-react-native-babel-preset',
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module:react-native-dotenv',
			{
				moduleName: '@env',
				path: '.env',
				blocklist: null,
				allowlist: null,
				safe: false,
				allowUndefined: true,
				verbose: false,
			},
		],
		[
			'module-resolver',
			{
				root: ['.'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
				],
				alias: {
					'~': './src',
					'@assets': './src/assets',
					'@components': './src/components',
					'@containers': './src/containers',
					'@hooks': './src/hooks',
					'@lib': './src/lib',
					'@page': './src/page',
					'@types': './src/types',
					'@service': './src/service',
					'@context': './src/context',
				},
			},
		],
		['babel-plugin-styled-components'],
	],
};
