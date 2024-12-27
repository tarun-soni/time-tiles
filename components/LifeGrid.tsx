import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  Animated,
  Pressable,
} from 'react-native';
import { Text } from './ui/text';

const LifeGrid = ({ yearsToShow = 90, customCellSize = 10 }) => {
  const WEEKS_PER_YEAR = 52;
  const padding = 16;
  const cellMargin = 2;

  const [containerWidth, setContainerWidth] = React.useState(
    Dimensions.get('window').width
  );

  // Add state for pressed cells
  const [pressedCells, setPressedCells] = React.useState<Set<string>>(
    new Set()
  );

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

  const toggleCell = (cellId: string) => {
    console.log('toggleCell', cellId);
    setPressedCells((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cellId)) {
        newSet.delete(cellId);
      } else {
        newSet.add(cellId);
      }
      return newSet;
    });
  };

  return (
    <Animated.View style={[styles.container]}>
      <ScrollView onLayout={onLayout}>
        <View style={[styles.grid, { padding: padding / 2 }]}>
          {[...Array(yearsToShow)].map((_, yearIndex) => (
            <View key={`year-${yearIndex}`} style={styles.row}>
              {[...Array(WEEKS_PER_YEAR)].map((_, weekIndex) => {
                const cellId = `${yearIndex}-${weekIndex}`;
                const isPressed = pressedCells.has(cellId);

                return (
                  <Pressable
                    key={`week-${cellId}`}
                    onPress={() => toggleCell(cellId)}
                    style={[
                      styles.cell,
                      {
                        width: cellSize,
                        height: cellSize,
                        margin: cellMargin,
                        backgroundColor: isPressed ? 'blue' : 'red',
                      },
                    ]}
                  />
                );
              })}
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
