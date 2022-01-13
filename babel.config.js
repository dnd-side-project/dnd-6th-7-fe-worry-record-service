module.exports = {
	presets: [
		'module:metro-react-native-babel-preset',
		'@babel/preset-react',
		'@babel/preset-typescript',
	],
	plugins: [
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
				},
			},
		],
	],
};
