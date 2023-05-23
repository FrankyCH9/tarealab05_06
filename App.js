import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para las películas
const movies = [
  { id: 1, title: 'Pelicula 1', year: 2021, image: require('./imagenes/pelicula1.webp') },
  { id: 2, title: 'Pelicula 2', year: 2022, image: require('./imagenes/pelicula2.webp') },
  { id: 3, title: 'Pelicula 3', year: 2023, image: require('./imagenes/pelicula3.jpg') },
];

// Componente para renderizar un elemento de la lista de películas
const MovieItem = ({ title, year, image }) => (
  <View style={styles.movieItem}>
    <Image source={image} style={styles.movieImage} />
    <View>
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieYear}>{year}</Text>
    </View>
  </View>
);

// Pantalla de lista de películas
const MoviesListScreen = () => (
  <View style={styles.container}>
    <FlatList
      data={movies}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <MovieItem title={item.title} year={item.year} image={item.image} />
      )}
    />
  </View>
);

// Pantalla de detalles de película
const MovieDetailsScreen = ({ route }) => {
  const { title, image } = route.params;
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.movieImage} />
      <Text style={styles.movieTitle}>{title}</Text>
      {/* Aquí puedes mostrar más detalles de la película */}
    </View>
  );
};

// Pantalla de configuración
const SettingsScreen = () => (
  <View style={styles.container}>
    <Text style={styles.heading}>Configuración</Text>
    {/* Contenido de la pantalla de configuración */}
  </View>
);

// Configuración del Stack Navigator
const Stack = createStackNavigator();

const MoviesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Movies" component={MoviesListScreen} />
    <Stack.Screen name="Details" component={MovieDetailsScreen} />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
);

// Configuración del Tab Navigator
const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Movies" component={MoviesStack} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  movieImage: {
    width: 60,
    height: 80,
    marginRight: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  movieYear: {
    fontSize: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
