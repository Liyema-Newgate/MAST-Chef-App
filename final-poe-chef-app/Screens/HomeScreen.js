import React, { useState } from "react";
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
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import MenuItemCard from "../components/MenuItemCard";
import { initialMenuItems } from "../Data/MenuData";

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [basket, setBasket] = useState([]);
  const [filter, setFilter] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    course: "Starters",
  });

  const predefinedCourses = ["Starters", "Mains", "Desserts"];

  const filteredItems =
    filter === "All"
      ? menuItems
      : menuItems.filter((item) => item.course === filter);

  const toggleBasketItem = (item) => {
    if (basket.some((b) => b.id === item.id)) {
      setBasket(basket.filter((b) => b.id !== item.id));
    } else {
      setBasket([...basket, item]);
    }
  };

  const basketTotal = basket.reduce((sum, item) => sum + item.price, 0);

  const addMenuItem = () => {
    if (!newItem.name || !newItem.description || !newItem.price) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const priceNum = parseFloat(newItem.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert("Error", "Enter a valid price.");
      return;
    }

    const item = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description,
      price: priceNum,
      course: newItem.course,
    };

    setMenuItems([...menuItems, item]);
    setModalVisible(false);
    setNewItem({ name: "", description: "", price: "", course: "Starters" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel’s Menu</Text>

      {/* Filter */}
      <View style={styles.filterContainer}>
        {["All", ...predefinedCourses].map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              filter === category && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(category)}
          >
            <Text
              style={[
                styles.filterText,
                filter === category && styles.filterTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add New Dish */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </TouchableOpacity>

      {/* Menu List */}
      <FlatList
        data={filteredItems}
        renderItem={({ item }) => (
          <MenuItemCard
            item={item}
            onPress={toggleBasketItem}
            isSelected={basket.some((b) => b.id === item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      {/* Basket & Payment */}
      <View style={styles.basketContainer}>
        <Text style={styles.basketText}>
          Basket: {basket.length} item{basket.length !== 1 ? "s" : ""}
        </Text>
        <Text style={styles.totalText}>Total: R{basketTotal.toFixed(2)}</Text>
        <TouchableOpacity style={styles.paymentButton}>
          <Text style={styles.paymentText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Add Item Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Menu Item</Text>
            <ScrollView>
              <TextInput
                style={styles.input}
                placeholder="Dish Name"
                placeholderTextColor="#aaa"
                value={newItem.name}
                onChangeText={(text) => setNewItem({ ...newItem, name: text })}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#aaa"
                value={newItem.description}
                multiline
                onChangeText={(text) =>
                  setNewItem({ ...newItem, description: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Price (e.g. 65)"
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                value={newItem.price}
                onChangeText={(text) => setNewItem({ ...newItem, price: text })}
              />
              <Picker
                selectedValue={newItem.course}
                onValueChange={(value) =>
                  setNewItem({ ...newItem, course: value })
                }
                dropdownIconColor="#fff"
              >
                {predefinedCourses.map((course) => (
                  <Picker.Item
                    key={course}
                    label={course}
                    value={course}
                    color="#000"
                  />
                ))}
              </Picker>
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={addMenuItem}>
                <Text style={styles.confirmText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#121212" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    margin: 4,
  },
  filterButtonActive: { backgroundColor: "#4CAF50" },
  filterText: { color: "#4CAF50" },
  filterTextActive: { color: "#fff" },
  addButton: {
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  listContent: { paddingBottom: 120 },
  basketContainer: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  basketText: { color: "#aaa", fontSize: 14 },
  totalText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  paymentButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
  },
  paymentText: { color: "white", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#2a2a2a",
    borderRadius: 12,
    padding: 20,
    width: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    color: "#fff",
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: {
    flex: 1,
    backgroundColor: "#333",
    padding: 12,
    borderRadius: 8,
    marginRight: 6,
    alignItems: "center",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginLeft: 6,
    alignItems: "center",
  },
  cancelText: { color: "#aaa" },
  confirmText: { color: "#fff", fontWeight: "bold" },
});

export default HomeScreen;
