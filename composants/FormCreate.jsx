import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { schemaOeuvre } from '../verification/oeuvre';
import db from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormCreate = () => {
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [auteur, setAuteur] = useState('');
  const [dt_creation, setDateCreation] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [erreurs, setErreurs] = useState([]);

  const handleSubmit = () => {
    console.log(nom, description, auteur, image);
    const oeuvre = { nom, description, auteur, image, dt_creation };
    const { error } = schemaOeuvre.validate(oeuvre, { abortEarly: false });

    console.log(error);
    setErreurs([]);
    if (!error) {
      // Si aucune erreur, ajoutez l'œuvre à la base de données
      addDoc(collection(db, 'oeuvres'), oeuvre).then(function (reponse) {
        setNom('');
        setDescription('');
        setAuteur('');
        setImage('');
        setDateCreation(new Date());
        alert("L'œuvre a bien été créée dans la base de données");
      });
    } else {
      const tableauErreurs = error.details.map(function (item) {
        return item.message;
      });
      setErreurs(tableauErreurs);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDateCreation(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une nouvelle œuvre</Text>
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
        placeholder="Auteur"
        onChangeText={(text) => setAuteur(text)}
        value={auteur}
        style={styles.input}
      />
      <TextInput
        placeholder="Image"
        onChangeText={(text) => setImage(text)}
        value={image}
        style={styles.input}
      />
      <Button
        title="Choisir une date de création"
        onPress={() => setShowPicker(true)}
        color="#009688"
      />
      {showPicker && (
        <DateTimePicker
          value={dt_creation}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Text style={styles.dateText}>
        Date choisie: {dt_creation.toLocaleDateString()}
      </Text>
      <Button
        title="Créer"
        onPress={handleSubmit}
        color="#009688"
      />
      <FlatList
        data={erreurs}
        renderItem={({ item }) => <Text style={styles.errorText}>{item}</Text>}
      />
    </View>
  );
};

export default FormCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
