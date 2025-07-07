import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from './ui/text';

interface WeekCellProps {
  color: string;
  icon?: string;
  isLived: boolean;
  isGroupStart?: boolean;
  isGroupEnd?: boolean;
  isPartOfGroup?: boolean;
  groupIcon?: string;
  groupLabel?: string;
  onPress?: () => void;
  size?: number;
  zoomLevel?: number;
  weekIndex?: number;
}

const WeekCell: React.FC<WeekCellProps> = ({
  color,
  icon,
  isLived,
  isGroupStart,
  isGroupEnd,
  isPartOfGroup,
  groupIcon,
  groupLabel,
  onPress,
  size = 14,
  zoomLevel = 1,
  weekIndex,
}) => {
  const isZoomedOut = zoomLevel < 1;
  const showGroupLabel = isZoomedOut && isGroupStart && groupLabel;
  const showAsBar = isZoomedOut && isPartOfGroup;

  if (showAsBar) {
    if (!isGroupStart) return null; // Only render at group start

    return (
      <Pressable
        onPress={onPress}
        style={[
          styles.bar,
          {
            backgroundColor: color,
            opacity: isLived ? 1 : 0.5,
            height: size,
            borderRadius: 6,
          },
        ]}
      >
        <View style={styles.barContent}>
          {groupIcon && <Text style={styles.barIcon}>{groupIcon}</Text>}
          {groupLabel && <Text style={styles.barLabel}>{groupLabel}</Text>}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          backgroundColor: color,
          opacity: isLived ? 1 : 0.5,
          borderTopLeftRadius: isGroupStart ? 6 : isPartOfGroup ? 0 : 2,
          borderBottomLeftRadius: isGroupStart ? 6 : isPartOfGroup ? 0 : 2,
          borderTopRightRadius: isGroupEnd ? 6 : isPartOfGroup ? 0 : 2,
          borderBottomRightRadius: isGroupEnd ? 6 : isPartOfGroup ? 0 : 2,
          marginHorizontal: isGroupStart || isGroupEnd ? 2 : 0.5,
        },
      ]}
    >
      {(isGroupStart || (!isPartOfGroup && icon)) && (
        <Text style={[styles.icon, { fontSize: size * 0.6 }]}>
          {groupIcon || icon || ''}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    margin: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flex: 1,
    margin: 2,
    padding: 4,
    minWidth: 100,
  },
  barContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  barIcon: {
    fontSize: 16,
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  barLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  icon: {
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});

export default WeekCell;
