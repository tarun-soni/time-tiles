import React from 'react';
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import Canvas from 'react-native-canvas';
import {
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const LifeGrid = ({ yearsToShow = 90, customCellSize = 2 }) => {
  const WEEKS_PER_YEAR = 52;
  const padding = 16; // Total horizontal padding
  const cellMargin = 2; // Margin on each side of cell

  // Add state for container width
  const [containerWidth, setContainerWidth] = React.useState(
    Dimensions.get('window').width
  );

  // Use customCellSize if provided, otherwise calculate based on containerWidth
  const cellSize =
    customCellSize ||
    Math.floor(
      (containerWidth - 2 * padding - WEEKS_PER_YEAR * 2 * cellMargin) /
        WEEKS_PER_YEAR
    );

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = event.scale;
    },
  });

  const panHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const handleCanvas = (canvas: any) => {
    if (canvas) {
      const ctx = canvas.getContext('2d');
      canvas.width = containerWidth;
      canvas.height = yearsToShow * (cellSize + cellMargin * 2);

      for (let yearIndex = 0; yearIndex < yearsToShow; yearIndex++) {
        for (let weekIndex = 0; weekIndex < WEEKS_PER_YEAR; weekIndex++) {
          ctx.fillStyle = 'red';
          ctx.fillRect(
            weekIndex * (cellSize + cellMargin * 2),
            yearIndex * (cellSize + cellMargin * 2),
            cellSize,
            cellSize
          );
        }
      }
    }
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={[styles.canvasContainer, animatedStyle]}>
          <PanGestureHandler onGestureEvent={panHandler}>
            <Animated.View>
              <Canvas ref={handleCanvas} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  canvasContainer: {
    flex: 1,
  },
});

export default LifeGrid;
