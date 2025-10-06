// screens/HomeScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; 

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState([]); // Dynamic list, not hardcoded
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    course: 'Starters', // Default to first course
  });

  const predefinedCourses = ['Starters', 'Mains', 'Desserts'];

  const addMenuItem = () => {
    if (!newItem.name.trim() || !newItem.description.trim() || !newItem.price.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const priceNum = parseFloat(newItem.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price.');
      return;
    }

    const item = {
      id: Date.now().toString(), // Simple ID generation
      name: newItem.name.trim(),
      description: newItem.description.trim(),
      price: priceNum,
      course: newItem.course,
    };

    setMenuItems([...menuItems, item]);
    resetForm();
    setModalVisible(false);
  };

  const resetForm = () => {
    setNewItem({
      name: '',
      description: '',
      price: '',
      course: 'Starters',
    });
  };

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.name}</Text>
      <Text style={styles.dishDescription}>{item.description}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Text style={styles.price}>Price: ${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel's Food Menu</Text>
      <Text style={styles.totalItems}>
        Total Menu Items: {menuItems.length}
      </Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>

      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Item Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Menu Item</Text>
            <ScrollView style={styles.formScroll}>
              <TextInput
                style={styles.input}
                placeholder="Dish Name"
                value={newItem.name}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Dish Description"
                value={newItem.description}
                multiline
                numberOfLines={3}
                onChangeText={(text) => setNewItem({ ...newItem, description: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Price (e.g., 12.99)"
                value={newItem.price}
                keyboardType="numeric"
                onChangeText={(text) => setNewItem({ ...newItem, price: text })}
              />
              <Text style={styles.label}>Course:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={newItem.course}
                  onValueChange={(value) => setNewItem({ ...newItem, course: value })}
                  style={styles.picker}
                >
                  {predefinedCourses.map((course) => (
                    <Picker.Item key={course} label={course} value={course} />
                  ))}
                </Picker>
              </View>
            </ScrollView>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => { setModalVisible(false); resetForm(); }}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addItemButton} onPress={addMenuItem}>
                <Text style={styles.addItemButtonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  totalItems: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  menuItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  dishDescription: {
    fontSize: 14,
    marginBottom: 4,
    color: '#666',
  },
  course: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#4CAF50',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  formScroll: {
    maxHeight: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  addItemButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  addItemButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
