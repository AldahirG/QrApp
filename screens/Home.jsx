import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/banner.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require('../assets/uninterlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 200, 
    height: 200,
  },
});
