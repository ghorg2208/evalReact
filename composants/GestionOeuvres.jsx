import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, FlatList } from 'react-native';
import { schemaOeuvre } from '../verification/oeuvre';
import db from '../firebaseConfig';
import {
  getDocs,
  updateDoc,
  doc,
  collection,
  deleteDoc,
} from 'firebase/firestore';

const GestionOeuvres = ({ navigation }) => {
  const [oeuvres, setOeuvres] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    getDocs(collection(db, 'oeuvres')).then((snapShot) => {
      const data = [];
      snapShot.docs.map((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setOeuvres(data);
      setUpdateList(!updateList);
    });
  }, [updateList]);

  const supprimer = (id) => {
    deleteDoc(doc(db, 'oeuvres', id)).then(function () {
      setUpdateList(!updateList);
    });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          navigation.navigate('Create');
        }}
        title="Ajouter une œuvre"
        color="#009688"
      />
      <FlatList
        data={oeuvres}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.image, width: 150, height: 100 }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Nom: {item.nom}</Text>
              <Text style={styles.text}>Description: {item.description}</Text>
              <Text style={styles.text}>Auteur: {item.auteur}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  navigation.navigate('Update', { id: item.id });
                }}
                title="Modifier"
                color="#FFA500"
              />
              <Button
                onPress={() => {
                  supprimer(item.id);
                }}
                title="Supprimer"
                color="red"
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default GestionOeuvres;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 100,
  },
  textContainer: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});
