import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { Text } from '@/components/ui/text';
import LifeGrid from '@/components/LifeGrid';
import { TLifeData } from '@/types/LifeData';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('weeks');
  const [maxAge, setMaxAge] = useState('40');

  const generateLifeData = (maxAgeValue: number): TLifeData => ({
    user: {
      id: '1',
      name: 'John Doe',
      birth_date: '1998-07-30',
      max_age: maxAgeValue,
    },
    weeks: Array.from({ length: maxAgeValue * 52 }, (_, weekId) => ({
      week_id: weekId,
      event: [],
      color: '#D1D5DB',
      date_range: '',
      category: 'Default',
      icon: '',
      notes: '',
    })),
    categories: {
      Default: {
        color: '#D1D5DB',
        icon: '📅',
      },
      Education: {
        color: '#4CAF50',
        icon: '🎓',
      },
      Career: {
        color: '#2196F3',
        icon: '💼',
      },
      Milestone: {
        color: '#FFC107',
        icon: '🎉',
      },
    },
  });

  const [lifeData, setLifeData] = useState(generateLifeData(parseInt(maxAge)));

  // Add some sample events
  React.useEffect(() => {
    const newLifeData = generateLifeData(parseInt(maxAge));

    // Primary School (Age 5-10)
    for (let week = 260; week < 520; week++) {
      newLifeData.weeks[week].category = 'Education';
      newLifeData.weeks[week].color = '#4CAF50';
      newLifeData.weeks[week].icon = '🎓';
    }

    // High School (Age 10-15)
    for (let week = 520; week < 780; week++) {
      newLifeData.weeks[week].category = 'Education';
      newLifeData.weeks[week].color = '#4CAF50';
      newLifeData.weeks[week].icon = '🎓';
    }

    // University (Age 15-20)
    for (let week = 780; week < 1040; week++) {
      newLifeData.weeks[week].category = 'Education';
      newLifeData.weeks[week].color = '#4CAF50';
      newLifeData.weeks[week].icon = '🎓';
    }

    // Career Start
    for (let week = 1040; week < 1092; week++) {
      newLifeData.weeks[week].category = 'Career';
      newLifeData.weeks[week].color = '#2196F3';
      newLifeData.weeks[week].icon = '💼';
    }

    setLifeData(newLifeData);
  }, [maxAge]);

  const tabs = [
    { id: 'weeks', label: 'Life in Weeks', icon: '📅' },
    { id: 'events', label: 'Timeline', icon: '📋' },
    { id: 'stats', label: 'Stats', icon: '📊' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A90E2', '#67B26F']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Text style={styles.title}>Life Journey</Text>
        <View style={styles.controls}>
          <View style={styles.ageInput}>
            <Text style={[styles.label, { color: '#fff' }]}>Max Age:</Text>
            <TextInput
              style={styles.input}
              value={maxAge}
              onChangeText={setMaxAge}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
          <Link href="/addData" asChild>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonText}>+ Add Event</Text>
            </Pressable>
          </Link>
        </View>
      </LinearGradient>

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabs}
        >
          {tabs.map((tab) => (
            <Pressable
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.activeTab]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.id && styles.activeTabText,
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        {activeTab === 'weeks' && <LifeGrid lifeData={lifeData} />}
        {activeTab === 'events' && (
          <View style={styles.centered}>
            <Text style={styles.comingSoon}>📋 Timeline View Coming Soon</Text>
          </View>
        )}
        {activeTab === 'stats' && (
          <View style={styles.centered}>
            <Text style={styles.comingSoon}>📊 Statistics Coming Soon</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#fff',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ageInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 8,
    padding: 8,
    width: 60,
    textAlign: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  tabsContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  tabs: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F0F4F8',
  },
  activeTab: {
    backgroundColor: '#4A90E2',
  },
  tabIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoon: {
    fontSize: 18,
    color: '#666',
  },
});
