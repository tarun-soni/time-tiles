import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import { Text } from '@/components/ui/text';
import Zoomable from '@/components/Zoomable';
import { COLORS } from '@/theme/colors';
import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

export default function App() {
  // const [loaded, error] = useFonts({
  //   // satisfy
  //   'Poppins-Thin': require('../assets/fonts/Poppins-Thin.ttf'), // fontWeight: "100",
  //   'Poppins-ExtraLight': require('../assets/fonts/Poppins-ExtraLight.ttf'), // fontWeight: "200",
  //   'Poppins-Light': require('../assets/fonts/Poppins-Light.ttf'), // fontWeight: "300",
  //   'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'), // fontWeight: "400",
  //   'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'), // fontWeight: "500",
  //   'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'), // fontWeight: "600",
  //   'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'), // fontWeight: "700",
  //   'Poppins-ExtraBold': require('../assets/fonts/Poppins-ExtraBold.ttf'), // fontWeight: "800",
  //   'Poppins-Black': require('../assets/fonts/Poppins-Black.ttf'), // fontWeight: "900",
  // });

  const loaded = true;
  const error = false;

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <StatusBar style="auto" />

            <Text
              size="2xl"
              style={{
                fontFamily: 'poppins',
              }}
            >
              Hello, Tarun
            </Text>

            <Zoomable />
          </View>
        </SafeAreaView>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
