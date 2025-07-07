import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { TLifeData } from '@/types/LifeData';
import WeekCell from './WeekCell';

const LifeGrid: React.FC<{
  lifeData: TLifeData;
}> = ({ lifeData }) => {
  const WEEKS_PER_YEAR = 52;
  const CELL_SIZE = 14;
  const CELL_MARGIN = 1;
  const screenWidth = Dimensions.get('window').width;
  const [currentZoom, setCurrentZoom] = useState(1);

  const calculateWeeksLived = (birthDate: string) => {
    const birth = new Date(birthDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birth.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };

  const weeksLived = calculateWeeksLived(lifeData.user.birth_date);
  const totalYears = Math.ceil(lifeData.weeks.length / WEEKS_PER_YEAR);

  const getGroupLabel = (weekIndex: number, category: string) => {
    if (category === 'Education') {
      if (weekIndex >= 260 && weekIndex < 520) return 'Primary School';
      if (weekIndex >= 520 && weekIndex < 780) return 'High School';
      if (weekIndex >= 780 && weekIndex < 1040) return 'University';
    }
    return category;
  };

  const getGroupLength = (weekIndex: number, category: string): number => {
    if (!category || category === 'Default') return 1;

    let length = 0;
    let currentIndex = weekIndex;

    while (
      currentIndex < lifeData.weeks.length &&
      lifeData.weeks[currentIndex].category === category
    ) {
      length++;
      currentIndex++;
    }

    return length;
  };

  const isPartOfGroup = (weekIndex: number, category: string) => {
    if (!category || category === 'Default') return false;

    const prevWeek = lifeData.weeks[weekIndex - 1];
    const nextWeek = lifeData.weeks[weekIndex + 1];

    return (
      (prevWeek && prevWeek.category === category) ||
      (nextWeek && nextWeek.category === category)
    );
  };

  const isGroupStart = (weekIndex: number, category: string) => {
    if (!category || category === 'Default') return false;

    const prevWeek = lifeData.weeks[weekIndex - 1];
    return !prevWeek || prevWeek.category !== category;
  };

  const isGroupEnd = (weekIndex: number, category: string) => {
    if (!category || category === 'Default') return false;

    const nextWeek = lifeData.weeks[weekIndex + 1];
    return !nextWeek || nextWeek.category !== category;
  };

  const renderYearGrid = () => {
    return Array.from({ length: totalYears }, (_, yearIndex) => {
      const startWeekIndex = yearIndex * WEEKS_PER_YEAR;
      const weekData = lifeData.weeks.slice(
        startWeekIndex,
        startWeekIndex + WEEKS_PER_YEAR
      );

      return (
        <View key={yearIndex} style={styles.yearContainer}>
          <View style={styles.weekRow}>
            {weekData.map((week, weekIndex) => {
              const absoluteWeekIndex = startWeekIndex + weekIndex;
              const isInGroup = isPartOfGroup(absoluteWeekIndex, week.category);
              const groupStart = isGroupStart(absoluteWeekIndex, week.category);
              const groupLength = groupStart
                ? getGroupLength(absoluteWeekIndex, week.category)
                : 0;

              return (
                <View
                  key={`week-${yearIndex}-${weekIndex}`}
                  style={[
                    currentZoom < 1 && groupStart && { flex: groupLength },
                  ]}
                >
                  <WeekCell
                    color={week.color || '#E8ECF0'}
                    icon={week.icon}
                    isLived={absoluteWeekIndex < weeksLived}
                    isPartOfGroup={isInGroup}
                    isGroupStart={groupStart}
                    isGroupEnd={isGroupEnd(absoluteWeekIndex, week.category)}
                    groupIcon={isInGroup ? undefined : week.icon}
                    groupLabel={
                      groupStart
                        ? getGroupLabel(absoluteWeekIndex, week.category)
                        : undefined
                    }
                    size={CELL_SIZE}
                    zoomLevel={currentZoom}
                    weekIndex={absoluteWeekIndex}
                  />
                </View>
              );
            })}
          </View>
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ReactNativeZoomableView
        maxZoom={3}
        minZoom={0.5}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        contentWidth={screenWidth}
        contentHeight={totalYears * (CELL_SIZE + CELL_MARGIN * 2)}
        style={styles.zoomContainer}
        onZoomAfter={(event: any) => setCurrentZoom(event?.zoomLevel || 1)}
      >
        <View style={styles.gridContainer}>{renderYearGrid()}</View>
      </ReactNativeZoomableView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  zoomContainer: {
    flex: 1,
  },
  gridContainer: {
    padding: 4,
    backgroundColor: '#F0F4F8',
  },
  yearContainer: {
    marginBottom: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'nowrap',
  },
});

export default LifeGrid;
