import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import { schemaUser } from '../verification/user';
import db from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const GestionUser = ({ navigation }) => {
  const [gestionnaires, setGestionnaires] = useState([]);
  const [updateList, setUpdateList] = useState(false);

  useEffect(() => {
    getDocs(collection(db, 'gestionnaires'))
      .then((snapShot) => {
        const data = [];
        snapShot.docs.map((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setGestionnaires(data);
        setUpdateList(!updateList);
      });
  }, [updateList]);

  const supprimer = (id) => {
    deleteDoc(doc(db, 'gestionnaires', id)).then(function () {
      setUpdateList(!updateList);
    });
  };

  return (
    <View style={styles.container}>
      <Button
        onPress={function () {
          navigation.navigate('CreateUser');
        }}
        title="Ajouter un utilisateur"
      />
      <FlatList
        data={gestionnaires}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemContainer}>
              <Text style={styles.label}>Utilisateur: {item.login}</Text>
              <Text style={styles.label}>Mot de passe: {item.password}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={function () {
                    navigation.navigate('UpdateUser', { id: item.id });
                  }}
                  color="#009688"
                  title="Modifier"
                />
                <Button
                  onPress={function () {
                    supprimer(item.id);
                  }}
                  color="red"
                  title="Supprimer"
                />
              </View>
            </View>
          );
        }}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default GestionUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
