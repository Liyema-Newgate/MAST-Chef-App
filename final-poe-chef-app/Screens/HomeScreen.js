import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import MenuItemCard from "../components/MenuItemCard";
import { initialMenuItems } from "../data/menuData";
import { Picker } from "@react-native-picker/picker";

const HomeScreen = () => {
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [basket, setBasket] = useState([]);
  const [filter, setFilter] = useState("All");
  const [basketExpanded, setBasketExpanded] = useState(false);
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

  // Toggle basket item
  const toggleBasketItem = (item) => {
    if (basket.some((b) => b.id === item.id)) {
      setBasket(basket.filter((b) => b.id !== item.id));
    } else {
      setBasket([...basket, item]);
    }
  };

  // Remove item from basket directly
  const removeFromBasket = (item) => {
    setBasket(basket.filter((b) => b.id !== item.id));
  };

  const basketTotal = basket.reduce((sum, item) => sum + item.price, 0);

  // Add new menu item
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

      {/* Filter Buttons */}
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

      {/* Add Menu Item Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Menu Item</Text>
      </TouchableOpacity>

      {/* Menu Items */}
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
        contentContainerStyle={{ paddingBottom: 250 }}
      />

      {/* Expandable Basket */}
      <View
        style={[
          styles.basketContainer,
          basketExpanded ? { height: 300 } : { height: 60 },
        ]}
      >
        <TouchableOpacity
          style={styles.basketHeader}
          onPress={() => setBasketExpanded(!basketExpanded)}
        >
          <Text style={styles.basketText}>
            Basket: {basket.length} item{basket.length !== 1 ? "s" : ""}
          </Text>
          <Text style={styles.totalText}>Total: R{basketTotal.toFixed(2)}</Text>
        </TouchableOpacity>

        {basketExpanded && basket.length > 0 && (
          <ScrollView style={styles.basketItems}>
            {basket.map((item) => (
              <View key={item.id} style={styles.basketItem}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCourse}>{item.course}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromBasket(item)}
                  >
                    <Text style={styles.removeText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {basketExpanded && basket.length > 0 && (
          <TouchableOpacity style={styles.paymentButton}>
            <Text style={styles.paymentText}>Proceed to Payment</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Add Menu Item Modal */}
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
                onChangeText={(text) =>
                  setNewItem({ ...newItem, name: text })
                }
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
                onChangeText={(text) =>
                  setNewItem({ ...newItem, price: text })
                }
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
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={addMenuItem}
              >
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
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#fff", marginBottom: 16 },
  filterContainer: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginBottom: 12 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: "#4CAF50", margin: 4 },
  filterButtonActive: { backgroundColor: "#4CAF50" },
  filterText: { color: "#4CAF50" },
  filterTextActive: { color: "#fff" },
  addButton: { backgroundColor: "#333", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 12 },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  basketContainer: { backgroundColor: "#1e1e1e", borderTopWidth: 1, borderColor: "#333", position: "absolute", bottom: 0, left: 0, right: 0, borderRadius: 12, overflow: "hidden" },
  basketHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: "#2a2a2a" },
  basketText: { color: "#aaa", fontSize: 14 },
  totalText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  basketItems: { paddingHorizontal: 12, marginTop: 8 },
  basketItem: { flexDirection: "row", justifyContent: "space-between", borderBottomWidth: 1, borderColor: "#333", paddingVertical: 6 },
  itemName: { color: "#fff" },
  itemCourse: { color: "#4CAF50" },
  itemPrice: { color: "#FF9800", fontWeight: "bold", marginRight: 8 },
  removeButton: { backgroundColor: "#FF5722", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  removeText: { color: "#fff", fontSize: 12 },
  paymentButton: { backgroundColor: "#FF5722", borderRadius: 8, padding: 12, alignItems: "center", margin: 12 },
  paymentText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#2a2a2a", borderRadius: 12, padding: 20, width: "90%" },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center", marginBottom: 16 },
  input: { backgroundColor: "#1e1e1e", borderRadius: 8, color: "#fff", padding: 10, marginBottom: 12, borderWidth: 1, borderColor: "#333" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  cancelButton: { flex: 1, backgroundColor: "#333", padding: 12, borderRadius: 8, marginRight: 6, alignItems: "center" },
  confirmButton: { flex: 1, backgroundColor: "#4CAF50", padding: 12, borderRadius: 8, marginLeft: 6, alignItems: "center" },
  cancelText: { color: "#aaa" },
  confirmText: { color: "#fff", fontWeight: "bold" },
});

export default HomeScreen;
