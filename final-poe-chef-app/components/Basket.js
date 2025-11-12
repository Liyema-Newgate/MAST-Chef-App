// component/Basket.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const Basket = ({ basket, setBasket }) => {
  const removeFromBasket = (id) => {
    setBasket(basket.filter((item, index) => index !== id));
  };

  const total = basket.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Basket</Text>

      {basket.length === 0 ? (
        <Text style={styles.empty}>Your basket is empty</Text>
      ) : (
        <FlatList
          data={basket}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.itemCard}>
              <View>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeFromBasket(index)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total: R{total.toFixed(2)}</Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 10 },
  header: { color: '#fff', fontSize: 22, textAlign: 'center', marginBottom: 10 },
  empty: { color: '#aaa', textAlign: 'center', marginTop: 20 },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E1E1E',
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },
  itemName: { color: '#fff', fontWeight: 'bold' },
  itemPrice: { color: '#4CAF50' },
  removeButton: {
    backgroundColor: '#B00020',
    padding: 6,
    borderRadius: 6,
  },
  removeButtonText: { color: '#fff', fontWeight: 'bold' },
  total: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontWeight: 'bold' },
});

export default Basket;
