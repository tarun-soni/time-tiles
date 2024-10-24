const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const { resolveConfig } = require('@babel/core');

// First, get the default config
const config = getDefaultConfig(__dirname);

// Then, wrap it with both configurations
// Note: The order matters - Reanimated should be the outer wrapper

module.exports = withNativeWind(config, { input: './global.css' });
