import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { schemaUser } from "../verification/user";
import db from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { CheckBox } from 'react-native-elements';

const FormCreateUser = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(false);
  const [erreurs, setErreurs] = useState([]);
  const handleSubmit = () => {
    const gestionnaires = { login, password, role };
    const { error } = schemaUser.validate(gestionnaires, { abortEarly: false });
    setErreurs([]);
    if (!error) {
      addDoc(collection(db, "gestionnaires"), gestionnaires).then(function (reponse) {
        setLogin("");
        setPassword("");
        setRole(false); // Réinitialiser l'état de la checkbox
        alert("L'utilisateur a bien été créé dans la base de données");
      });
    } else {
      const tableauErreurs = error.details.map(function (item) { return item.message; });
      setErreurs(tableauErreurs);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un nouvel utilisateur</Text>
      <TextInput placeholder="Login" onChangeText={text => setLogin(text)} value={login} style={styles.input} />
      <TextInput placeholder="Mot de passe" onChangeText={text => setPassword(text)} value={password} style={styles.input} />
      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Role"
          checked={role}
          onPress={() => setRole(!role)}
          containerStyle={styles.checkbox}
        />
      </View>
      <Button title="Créer" onPress={handleSubmit} color="#009688" />
      <FlatList
        data={erreurs}
        renderItem={({ item }) => <Text style={styles.erreur}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  erreur: {
    color: 'red',
    marginTop: 10,
  },
});

export default FormCreateUser;
