import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { Text } from '@/components/ui/text';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddDataScreen() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [event, setEvent] = useState({
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    category: '',
    icon: '',
    notes: '',
  });

  const categories = [
    { name: 'Education', icon: '🎓' },
    { name: 'Career', icon: '💼' },
    { name: 'Milestone', icon: '🎉' },
    { name: 'Travel', icon: '✈️' },
    { name: 'Health', icon: '🏥' },
    { name: 'Relationship', icon: '❤️' },
  ];

  const handleSave = () => {
    // Save to storage/database
    console.log('Saving event:', event);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Your Life in Weeks</Text>

        <Pressable
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>Birth Date: {birthDate.toLocaleDateString()}</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            onChange={(event: any, selectedDate?: Date) => {
              setShowDatePicker(false);
              if (selectedDate) setBirthDate(selectedDate);
            }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Add Life Event</Text>

        <TextInput
          style={styles.input}
          placeholder="Event Title"
          value={event.title}
          onChangeText={(text) => setEvent({ ...event, title: text })}
        />

        <View style={styles.categories}>
          {categories.map((cat) => (
            <Pressable
              key={cat.name}
              style={[
                styles.categoryButton,
                event.category === cat.name && styles.selectedCategory,
              ]}
              onPress={() =>
                setEvent({ ...event, category: cat.name, icon: cat.icon })
              }
            >
              <Text>
                {cat.icon} {cat.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <TextInput
          style={[styles.input, styles.notesInput]}
          placeholder="Notes"
          multiline
          value={event.notes}
          onChangeText={(text) => setEvent({ ...event, notes: text })}
        />

        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Event</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  dateButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  notesInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  categoryButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedCategory: {
    backgroundColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
