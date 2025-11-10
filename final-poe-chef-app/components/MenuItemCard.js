import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const MenuItemCard = ({ item, onPress, isSelected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected, // Highlight if selected
      ]}
      onPress={() => onPress(item)}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e1e1e",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#333",
  },
  cardSelected: {
    borderColor: "#fff",   // White border to show selection
    backgroundColor: "#2a2a2a",
  },
  infoContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 6,
  },
  course: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9800",
  },
});

export default MenuItemCard;
