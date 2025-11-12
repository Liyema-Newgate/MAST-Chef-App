import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { MenuContext } from "../Context/MenuContext";
import { Picker } from "@react-native-picker/picker";

export default function ManageMenuScreen() {
  const { menuItems, addMenuItem, removeMenuItem } = useContext(MenuContext);
  const [newItem, setNewItem] = useState({ name:"", description:"", price:"", course:"Starters" });

  const save = () => {
    if (!newItem.name.trim() || !newItem.description.trim() || !newItem.price.trim()) {
      Alert.alert("Fill all fields");
      return;
    }
    addMenuItem(newItem);
    setNewItem({ name:"", description:"", price:"", course:"Starters" });
  };

  return (
    <View style={{ flex:1, padding:16, backgroundColor:"#111" }}>
      <Text style={{ color:"#fff", fontSize:20, marginBottom:10 }}>Manage Menu</Text>

      <TextInput placeholder="Name" value={newItem.name} onChangeText={t => setNewItem(s => ({...s, name:t}))} style={{ backgroundColor:"#222", color:"#fff", padding:8, borderRadius:8, marginBottom:8 }} />
      <TextInput placeholder="Description" value={newItem.description} onChangeText={t => setNewItem(s => ({...s, description:t}))} style={{ backgroundColor:"#222", color:"#fff", padding:8, borderRadius:8, marginBottom:8 }} />
      <TextInput placeholder="Price" value={newItem.price} onChangeText={t => setNewItem(s => ({...s, price:t}))} keyboardType="numeric" style={{ backgroundColor:"#222", color:"#fff", padding:8, borderRadius:8, marginBottom:8 }} />
      <Picker selectedValue={newItem.course} onValueChange={v => setNewItem(s => ({...s, course:v}))} style={{ backgroundColor:"#222", color:"#fff", marginBottom:8 }}>
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
      </Picker>

      <TouchableOpacity onPress={save} style={{ backgroundColor:"#4CAF50", padding:12, borderRadius:8, alignItems:"center", marginBottom:12 }}>
        <Text style={{ color:"#fff", fontWeight:"700" }}>Add Item</Text>
      </TouchableOpacity>

      <FlatList data={menuItems} keyExtractor={i => i.id} renderItem={({item}) => (
        <View style={{ padding:10, backgroundColor:"#222", marginBottom:8, borderRadius:8, flexDirection:"row", justifyContent:"space-between" }}>
          <Text style={{ color:"#fff" }}>{item.name} - R{Number(item.price).toFixed(2)}</Text>
          <TouchableOpacity onPress={() => removeMenuItem(item.id)}><Text style={{ color:"#ff6666" }}>Remove</Text></TouchableOpacity>
        </View>
      )} />
    </View>
  );
}
