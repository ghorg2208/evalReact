import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { schemaOeuvre } from '../verification/oeuvre';
import db from '../firebaseConfig';
import { getDoc, updateDoc, doc } from 'firebase/firestore';

const FormUpdate = ({ navigation, route }) => {
  const [id, setId] = useState('');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [auteur, setAuteur] = useState('');
  const [erreurs, setErreurs] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    setId(id);
    getDoc(doc(db, 'oeuvres', id)).then(function (snapShot) {
      const { nom, description, image, auteur } = snapShot.data();
      setNom(nom);
      setDescription(description);
      setImage(image);
      setAuteur(auteur);
    });
  }, []);

  const handleSubmit = async () => {
    const oeuvres = { nom, description, image, auteur };
    const { error } = schemaOeuvre.validate(oeuvres, { abortEarly: false });

    setErreurs([]);
    if (!error) {
      await updateDoc(doc(db, 'oeuvres', id), oeuvres);
      navigation.push('accueil'); // Retour à la page d'accueil
    } else {
      const tableauErreurs = error.details.map((item) => item.message);
      setErreurs(tableauErreurs);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier une oeuvre</Text>
      <TextInput
        placeholder="Nom"
        onChangeText={(text) => setNom(text)}
        value={nom}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
        style={styles.input}
      />
      <TextInput
        placeholder="Image"
        onChangeText={(text) => setImage(text)}
        value={image}
        style={styles.input}
      />
      <TextInput
        placeholder="Auteur"
        onChangeText={(text) => setAuteur(text)}
        value={auteur}
        style={styles.input}
      />
      <Button title="Modifier" onPress={handleSubmit} color="orange" />
      <FlatList
        data={erreurs}
        renderItem={({ item }) => <Text style={styles.errorText}>{item}</Text>}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          title="Retour à l'accueil"
          color="purple"
        />
      </View>
    </View>
  );
};

export default FormUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 10,
  },
  errorText: {
    color: 'red',
  },
});
