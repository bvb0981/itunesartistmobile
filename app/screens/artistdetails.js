import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Button, Image, Dimensions, ToastAndroid, Alert, ScrollView } from 'react-native';


export default function ArtistDetailsScreen({ route, navigation }) {
  const { artistData } = route.params;
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{
        uri: artistData.ArtistWorkURL,
      }}></Image>
      <Text style={{ fontSize: 20, color: 'white' }}>{artistData.ArtistName}</Text>
      <Text style={{ fontSize: 20, color: 'white' }}>{artistData.CollectionName}</Text>
    </View>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    //THIS LINE HAS CHANGED
    backgroundColor: "#434343",

  },
  logo: {
    width: 200,
    height: 200,
  },

})