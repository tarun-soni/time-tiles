import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';
import { Text } from './ui/text';
import { TLifeData } from '@/types/LifeData';
import { calcFromAge } from '@/utils/calcFromAge';

const LifeGrid: React.FC<{
  lifeData: TLifeData;
}> = ({ lifeData }) => {
  const WEEKS_PER_YEAR = 52;
  const ROWS_PER_PAGE = 10; // Number of years (rows) to display per page
  const PADDING = 16;
  const CELL_MARGIN = 2;

  // const { weeksSinceBirth, totalWeeks } = calcFromAge(
  //   lifeData.user.birth_date,
  //   lifeData.user.max_age
  // );

  const [containerWidth, setContainerWidth] = useState(
    Dimensions.get('window').width
  );

  console.log('lifeData', lifeData);
  const [currentPage, setCurrentPage] = useState(0);

  const cellSize =
    Math.floor(
      (containerWidth - 2 * PADDING - WEEKS_PER_YEAR * 2 * CELL_MARGIN) /
        WEEKS_PER_YEAR
    ) * 10;

  console.log('cellSize', cellSize);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  const startYearIndex = currentPage * ROWS_PER_PAGE;
  const endYearIndex = Math.min(
    startYearIndex + ROWS_PER_PAGE,
    Math.ceil(lifeData.weeks.length / WEEKS_PER_YEAR)
  );

  const renderRow = ({ item: year }: { item: number }) => {
    const startWeekIndex = year * WEEKS_PER_YEAR;
    const weekData = lifeData.weeks.slice(
      startWeekIndex,
      startWeekIndex + WEEKS_PER_YEAR
    );

    return (
      <View style={styles.row}>
        {weekData.map((week, index) => (
          <Pressable
            key={`week-${year}-${index}`}
            style={[
              styles.cell,
              {
                width: cellSize,
                height: cellSize,
                margin: CELL_MARGIN,
                backgroundColor: week.color || '#D1D5DB', // Default gray
              },
            ]}
          >
            {week && week.event.length > 0 ? (
              <Text style={styles.cellText}>😅</Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <FlatList
        data={Array.from(
          { length: endYearIndex - startYearIndex },
          (_, i) => startYearIndex + i
        )}
        keyExtractor={(item) => `year-${item}`}
        renderItem={renderRow}
        contentContainerStyle={{ padding: PADDING }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.pagination}>
        <Pressable
          onPress={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          <Text style={styles.pageButton}>Previous</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setCurrentPage((prev) =>
              Math.min(
                prev + 1,
                Math.ceil(
                  lifeData.weeks.length / (ROWS_PER_PAGE * WEEKS_PER_YEAR)
                ) - 1
              )
            )
          }
        >
          <Text style={styles.pageButton}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#CCC',
  },
  cellText: {
    fontSize: 10,
    color: '#333',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  pageButton: {
    fontSize: 16,
    color: 'blue',
  },
});

export default LifeGrid;
