import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const users = [
  { id: '1', name: 'Maciej Gutkowski', email: 'maciej.gutkowski@semiflat.com' },
  { id: '2', name: 'Marcin Grygierczyk', email: 'marcin.grygierczyk@semiflat.com' },
  { id: '3', name: 'Massimo Blue', email: 'massimo.blue@gmail.com', guest: true },
  // Añade más usuarios según sea necesario
];

export default function List() {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Ionicons name="person-circle-outline" size={40} color="black" />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemEmail}>{item.email}</Text>
        {item.guest && <Text style={styles.guestBadge}>Guest</Text>}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.noResultsText}>No users found</Text>}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  itemTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemEmail: {
    color: '#666',
  },
  guestBadge: {
    marginTop: 5,
    paddingVertical: 2,
    paddingHorizontal: 4,
    backgroundColor: '#eee',
    color: '#555',
    borderRadius: 3,
    fontSize: 12,
    alignSelf: 'flex-start',
  },
  noResultsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});
