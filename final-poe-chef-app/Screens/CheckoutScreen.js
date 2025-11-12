import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, LayoutAnimation, UIManager, Platform } from "react-native";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function CheckoutScreen({ route, navigation }) {
  const { basket, setBasket } = route.params;
  const [expanded, setExpanded] = useState(false);

  const total = basket.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item, i) => i !== id));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Basket</Text>

      <TouchableOpacity style={styles.expandButton} onPress={toggleExpand}>
        <Text style={styles.expandText}>{expanded ? "Hide Basket" : "Show Basket"}</Text>
      </TouchableOpacity>

      {expanded && (
        <FlatList
          data={basket}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.item}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>R{item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFromBasket(index)}>
                <Text style={styles.remove}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No items in basket</Text>}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.total}>Total: R{total}</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#333" }]}
          onPress={() => clearBasket()}
        >
          <Text style={styles.buttonText}>Clear Basket</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#777" }]}
          onPress={() => alert("Proceeding to payment...")}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.navText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 16 },
  header: { color: "#fff", fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  expandButton: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  expandText: { color: "#fff", fontWeight: "bold" },
  item: {
    backgroundColor: "#222",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: { color: "#fff", fontWeight: "bold" },
  price: { color: "#aaa" },
  remove: { color: "#ff5555", fontWeight: "bold" },
  empty: { color: "#777", textAlign: "center", marginTop: 20 },
  footer: { marginTop: 10, alignItems: "center" },
  total: { color: "#fff", fontSize: 18, marginBottom: 10 },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    marginVertical: 6,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  navButton: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  navText: { color: "#fff", fontWeight: "bold" },
});
