import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import LifeGrid from './LifeGrid';

export default function Zoomable() {
  return (
    <View style={styles.container}>
      <View style={{ flexShrink: 1, height: '100%', width: '100%' }}>
        <ReactNativeZoomableView
          // maxZoom={30}
          maxZoom={10}
          minZoom={0.5}
          // Give these to the zoomable view so it can apply the boundaries around the actual content.
          // Need to make sure the content is actually centered and the width and height are
          // dimensions when it's rendered naturally. Not the intrinsic size.
          // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
          // Therefore, we'll feed the zoomable view the 300x150 size.
          contentWidth={300}
          contentHeight={150}
          doubleTapZoomToCenter={true}
          bindToBorders={false}
        >
          <LifeGrid />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
