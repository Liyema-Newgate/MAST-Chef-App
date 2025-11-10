import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import MenuItemCard from "../components/MenuItemCard";
import { initialMenuItems } from "../Data/MenuData";

const HomeScreen = () => {
  const [basket, setBasket] = useState([]);
  const [filter, setFilter] = useState("All");
  const [basketExpanded, setBasketExpanded] = useState(false);

  const predefinedCourses = ["Starters", "Mains", "Desserts"];

  const filteredItems =
    filter === "All"
      ? initialMenuItems
      : initialMenuItems.filter((item) => item.course === filter);

  const toggleBasketItem = (item) => {
    if (basket.some((b) => b.id === item.id)) {
      setBasket(basket.filter((b) => b.id !== item.id));
    } else {
      setBasket([...basket, item]);
    }
  };

  const basketTotal = basket.reduce((sum, item) => sum + item.price, 0);

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
        contentContainerStyle={{ paddingBottom: 200 }}
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
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCourse}>{item.course}</Text>
                <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
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
    marginBottom: 12,
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
  basketContainer: {
    backgroundColor: "#1e1e1e",
    borderTopWidth: 1,
    borderColor: "#333",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 12,
    overflow: "hidden",
  },
  basketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#2a2a2a",
  },
  basketText: { color: "#aaa", fontSize: 14 },
  totalText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  basketItems: { paddingHorizontal: 12, marginTop: 8 },
  basketItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#333",
    paddingVertical: 6,
  },
  itemName: { color: "#fff" },
  itemCourse: { color: "#4CAF50" },
  itemPrice: { color: "#FF9800", fontWeight: "bold" },
  paymentButton: {
    backgroundColor: "#FF5722",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    margin: 12,
  },
  paymentText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

export default HomeScreen;

