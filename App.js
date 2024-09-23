import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Predefined list of courses
const courses = ['Starters', 'Main Course', 'Desserts'];

const Stack = createStackNavigator();

export default function App() {
  const [menuItems, setMenuItems] = useState([]);

  const addItem = (name, description, course, price) => {
    setMenuItems([...menuItems, { id: (menuItems.length + 1).toString(), name, description, price: parseInt(price), course }]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" options={{ headerShown: false }}>
          {props => <WelcomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {props => <HomeScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
        <Stack.Screen name="AddItem">
          {props => <AddItemScreen {...props} addItem={addItem} courses={courses} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.welcomeContainer}>
      <Image
        source={{ uri: 'https://thumbs.dreamstime.com/b/logotipo-do-menu-com-tampa-de-chef-para-restaurante-identidade-marca-alimentos-vetoriais-259825776.jpg' }}
        style={styles.logo}
      />
      <Text style={styles.welcomeTitle}>Chef Christoffel's Culinary Creations</Text>
      <Text style={styles.welcomeTagline}>Personalized culinary experiences brought to your table.</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.welcomeButton}>
        <Text style={styles.welcomeButtonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

function HomeScreen({ navigation, menuItems }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemText}>{item.name} - {item.description} - R{item.price}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.button}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.summary}>
        <Text>Total Menu Items: {menuItems.length}</Text>
      </View>
    </View>
  );
}

function AddItemScreen({ navigation, addItem, courses }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  return (
    <View style={styles.container}>
      <TextInput placeholder="Dish Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        style={styles.input}
        keyboardType="numeric"
      />
      <View style={styles.courseSelector}>
        {courses.map((courseOption) => (
          <TouchableOpacity
            key={courseOption}
            onPress={() => setCourse(courseOption)}
            style={[styles.courseButton, course === courseOption && styles.selectedCourseButton]}
          >
            <Text style={styles.courseButtonText}>{courseOption}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => { addItem(name, description, course, price); navigation.navigate('Home'); }} style={styles.button}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFE5B4',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5B4',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A3E36',
    marginBottom: 10,
  },
  welcomeTagline: {
    fontSize: 16,
    color: '#5A3E36',
    marginBottom: 30,
  },
  welcomeButton: {
    backgroundColor: '#5A3E36',
    padding: 15,
    borderRadius: 5,
  },
  welcomeButtonText: {
    color: '#FFE5B4',
    fontSize: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  summary: {
    marginTop: 20,
    backgroundColor: '#D9534F',
    padding: 10,
    borderRadius: 5,
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFE5B4',
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    elevation: 2,
  },
  menuItemText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#5A3E36',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFE5B4',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#5A3E36',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },
  courseSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  courseButton: {
    padding: 10,
    backgroundColor: '#D9534F',
    borderRadius: 5,
  },
  selectedCourseButton: {
    backgroundColor: '#5A3E36',
  },
  courseButtonText: {
    color: '#FFE5B4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});