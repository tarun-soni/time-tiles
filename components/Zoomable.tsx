import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import LifeGrid from './LifeGrid';
import { TLifeData } from '@/types/LifeData';
import { TWeek } from '@/types/Week';

export default function Zoomable() {
  // const lifeData: TLifeData = {
  //   user: {
  //     id: '12345',
  //     name: 'John Doe',
  //     birth_date: '1995-06-15',
  //     max_age: 90,
  //   },
  //   weeks: [
  //     {
  //       week_id: 1,
  //       date_range: '1995-06-15 to 1995-06-21',
  //       category: 'Education',
  //       event: ['Born'],
  //       color: '#FFC107',
  //       icon: '🎉',
  //       notes: 'The beginning of it all!',
  //     },
  //     {
  //       week_id: 572,
  //       date_range: '2006-09-01 to 2006-09-07',
  //       category: 'Education',
  //       event: ['Started High School'],
  //       color: '#FFC107',
  //       icon: '🎓',
  //       notes: 'First day of high school!',
  //     },
  //     {
  //       week_id: 1040,
  //       date_range: '2014-09-01 to 2014-09-07',
  //       category: 'Education',
  //       event: ['Started University'],
  //       color: '#FFC107',
  //       icon: '🎓',
  //       notes: 'Began studying Computer Science.',
  //     },
  //     {
  //       week_id: 1652,
  //       date_range: '2023-01-01 to 2023-01-07',
  //       category: 'Career',
  //       event: ['First Job'],
  //       color: '#4A90E2',
  //       icon: '💼',
  //       notes: 'Joined XYZ Corp as a software engineer.',
  //     },
  //     {
  //       week_id: 1745,
  //       date_range: '2024-12-15 to 2024-12-21',
  //       category: 'Milestone',
  //       event: ['Bought First House'],
  //       color: '#FF9F68',
  //       icon: '🏠',
  //       notes: 'Moved into my first home!',
  //     },
  //     {
  //       week_id: 2000,
  //       date_range: '2030-06-01 to 2030-06-07',
  //       category: 'Custom',
  //       event: ['Completed Marathon'],
  //       color: '#42C2A8',
  //       icon: '🏃',
  //       notes: 'Ran my first full marathon!',
  //     },
  //   ],
  //   categories: {
  //     Education: {
  //       color: '#FFC107',
  //       icon: '🎓',
  //     },
  //     Career: {
  //       color: '#4A90E2',
  //       icon: '💼',
  //     },
  //     Milestone: {
  //       color: '#FF9F68',
  //       icon: '🏠',
  //     },
  //     Custom: {
  //       color: '#42C2A8',
  //       icon: '✨',
  //     },
  //   },
  // };

  const generateWeeksArray = (maxAge: number): TLifeData => {
    const totalWeeks = maxAge * 52;
    const weeks: TWeek[] = Array.from({ length: totalWeeks }, (_, weekId) => ({
      week_id: weekId,
      event: [],
      color: '#D1D5DB',
      date_range: '',
      category: 'Default',
      icon: '',
      notes: '',
    }));

    // Sample data
    weeks[0].event = ['Born'];
    weeks[0].color = '#FFC107';
    weeks[52].event = ['Started School'];
    weeks[52].color = '#FFC107';
    weeks[416].event = ['Graduated High School'];
    weeks[416].color = '#FFC107';
    weeks[416].icon = '🎓';

    return {
      user: {
        id: '1',
        name: 'User',
        birth_date: new Date().toISOString(),
        max_age: maxAge,
      },
      weeks,
      categories: {
        Default: {
          color: '#D1D5DB',
          icon: '🙂',
        },
      },
    };
  };

  const lifeData = generateWeeksArray(10);

  return (
    <View style={styles.container}>
      <View style={{ flexShrink: 1, height: '100%', width: '100%' }}>
        {/* <UserInfo user={lifeData.user} /> */}

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
          <LifeGrid lifeData={lifeData} />
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

const UserInfo = ({ user }: { user: any }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hi, {user.name}!</Text>
      <Text style={{ marginTop: 10, fontSize: 18 }}>
        Welcome to your personalized life journey.
      </Text>
    </View>
  );
};
