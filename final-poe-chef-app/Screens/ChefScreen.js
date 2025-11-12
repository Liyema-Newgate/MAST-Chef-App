// screens/ChefScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ChefScreen = ({ menuItems, setMenuItems }) => {
  const [newDish, setNewDish] = useState({
    name: '',
    description: '',
    price: '',
    course: 'Starters',
  });

  const predefinedCourses = ['Starters', 'Mains', 'Desserts'];

  const handleAddDish = () => {
    if (!newDish.name.trim() || !newDish.description.trim() || !newDish.price.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const priceNum = parseFloat(newDish.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: newDish.name.trim(),
      description: newDish.description.trim(),
      price: priceNum,
      course: newDish.course,
    };

    setMenuItems((prev) => [...prev, newItem]);
    setNewDish({ name: '', description: '', price: '', course: 'Starters' });
    Alert.alert('Success', 'New dish added to the menu!');
  };

  const handleRemoveDish = (id) => {
    Alert.alert('Remove Dish', 'Are you sure you want to delete this dish?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => {
          setMenuItems((prev) => prev.filter((item) => item.id !== id));
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chef Control Panel</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={newDish.name}
          onChangeText={(text) => setNewDish({ ...newDish, name: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={newDish.description}
          multiline
          onChangeText={(text) => setNewDish({ ...newDish, description: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Price (R)"
          keyboardType="numeric"
          value={newDish.price}
          onChangeText={(text) => setNewDish({ ...newDish, price: text })}
        />
        <Picker
          selectedValue={newDish.course}
          onValueChange={(value) => setNewDish({ ...newDish, course: value })}
          style={styles.picker}
        >
          {predefinedCourses.map((course) => (
            <Picker.Item key={course} label={course} value={course} />
          ))}
        </Picker>

        <TouchableOpacity style={styles.addButton} onPress={handleAddDish}>
          <Text style={styles.addButtonText}>Add Dish</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subHeader}>Current Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <View>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDesc}>{item.description}</Text>
              <Text style={styles.dishCourse}>Category: {item.course}</Text>
              <Text style={styles.dishPrice}>R{item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveDish(item.id)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  form: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  subHeader: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 8,
    textAlign: 'center',
  },
  dishItem: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dishName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishDesc: {
    color: '#aaa',
    fontSize: 13,
  },
  dishCourse: {
    color: '#999',
    fontSize: 12,
  },
  dishPrice: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#B00020',
    padding: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChefScreen;
