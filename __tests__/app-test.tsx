/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '~/App';

// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';

it('renders correctly', async () => {
	act(() => {
		renderer.create(<App />);
	});
});
