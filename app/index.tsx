import { StatusBar } from 'expo-status-bar';
import '@/global.css';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SafeAreaView } from '@/components/ui/safe-area-view';
import LifeGrid from '@/components/LifeGrid';
import { Text } from '@/components/ui/text';

export default function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider mode="light">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <LifeGrid />
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
    backgroundColor: '#fff',
  },
});
