
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationContainer,
  CommonActions,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import * as SQLite from "expo-sqlite";
import 'react-native-gesture-handler'
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "./app/screens/MainScreen.js";
import ArtistDetailsScreen from "./app/screens/artistdetails.js";
const Stack = createStackNavigator();
const db = SQLite.openDatabase("itunesArtistdb.db");
export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      var query =
        "CREATE Table if not exists tbl_Artists(MobileArtistID integer primary key not null, ArtistID integer, ArtistName text null," +
        "ArtistWorkURL text null,CollectionID text null , CollectionName text null,ReleasedDate text null,TrackName text null, TrackID text null,SearchData text null);";
      var params = [];
      db.transaction((tx) => {
        try {
          tx.executeSql(
            query,
            params,
            (tx, results) => { },
            function (tx, err) {
              console.log(err);
            }
          );
        } catch (Exception) {
          console.log("error");
        }
      });
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route, navigation }) => {
          nav = navigation;
          rou = route;
        }} >
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArtistDetailsScreen"
          component={ArtistDetailsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


