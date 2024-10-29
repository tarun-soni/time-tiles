import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  Animated,
} from 'react-native';
import { Text } from './ui/text';

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

  return (
    <Animated.View style={[styles.container]}>
      <ScrollView onLayout={onLayout}>
        <View style={[styles.grid, { padding: padding / 2 }]}>
          {[...Array(yearsToShow)].map((_, yearIndex) => (
            <View key={`year-${yearIndex}`} style={styles.row}>
              {[...Array(WEEKS_PER_YEAR)].map((_, weekIndex) => (
                <View
                  key={`week-${yearIndex}-${weekIndex}`}
                  style={[
                    styles.cell,
                    {
                      width: cellSize,
                      height: cellSize,
                      margin: cellMargin,
                      backgroundColor: 'red',
                    },
                  ]}
                ></View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    // padding is now dynamic
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cell: {
    borderWidth: 0.5,
    borderColor: '#000',
    // width, height, and margin are now dynamic
  },
});

export default LifeGrid;
