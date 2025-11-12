// screens/HomeScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Basket from '../components/Basket';


const HomeScreen = ({ navigation, menuItems, basket, setBasket }) => {
  const [selectedCourse, setSelectedCourse] = useState('All');
  const courses = ['All', 'Starters', 'Mains', 'Desserts'];

  const filteredItems =
    selectedCourse === 'All'
      ? menuItems
      : menuItems.filter((item) => item.course === selectedCourse);

  const addToBasket = (item) => {
    setBasket([...basket, item]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Christoffel’s Menu</Text>

      <View style={styles.filterRow}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.activeFilter,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCourse === course && styles.activeFilterText,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDesc}>{item.description}</Text>
            <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => addToBasket(item)}
            >
              <Text style={styles.addButtonText}>Add to Basket</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.basketButton}
          onPress={() => navigation.navigate('Basket')}
        >
          <Text style={styles.basketText}>View Basket ({basket.length})</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chefButton}
          onPress={() => navigation.navigate('Chef')}
        >
          <Text style={styles.chefText}>Chef Panel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  header: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterButton: {
    padding: 8,
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
  },
  filterText: { color: '#ccc' },
  activeFilter: { backgroundColor: '#4CAF50' },
  activeFilterText: { color: '#fff' },
  itemCard: {
    backgroundColor: '#1E1E1E',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemName: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  itemDesc: { color: '#bbb', marginVertical: 4 },
  itemPrice: { color: '#4CAF50', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  basketButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  basketText: { color: '#fff', fontWeight: 'bold' },
  chefButton: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  chefText: { color: '#fff', fontWeight: 'bold' },
});

export default HomeScreen;
