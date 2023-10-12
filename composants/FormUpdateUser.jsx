import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import React, { useState, useEffect } from 'react';
import { schemaUser } from "../verification/user";
import db from "../firebaseConfig";
import { getDoc, updateDoc, doc } from "firebase/firestore";

const FormUpdateUser = ({ navigation, route }) => {
  const [id, setId] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState(false);
  const [role, setRole] = useState(false); // Utilisez un état booléen pour le rôle
  const [erreurs, setErreurs] = useState([]);

  useEffect(() => {
    const id = route.params.id;
    setId(id);
    getDoc(doc(db, "gestionnaires", id)).then(function (snapShot) {
      const { login, password, role } = snapShot.data();
      setLogin(login);
      setPassword(password);
      setRole(Boolean(role));
    });
  }, [route.params.id]);

  const handleSubmit = async () => {
    const gestionnaires = { login, password, role };
    const { error } = schemaUser.validate(gestionnaires, { abortEarly: false });

    setErreurs([]);
    if (!error) {
      await updateDoc(doc(db, "gestionnaires", id), gestionnaires);
      alert("L'utilisateur a bien été modifié");
    } else {
      const tableauErreurs = error.details.map((item) => item.message);
      setErreurs(tableauErreurs);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier un utilisateur</Text>
      <TextInput placeholder="Login" onChangeText={text => setLogin(text)} value={login} style={styles.input} />
      <TextInput placeholder="Mot de passe" onChangeText={text => setPassword(text)} value={password} style={styles.input} />
      <CheckBox
        checked={role}
        title="Admin"
        onPress={() => setRole(!role)}
        containerStyle={styles.checkboxContainer}
        textStyle={styles.checkboxText}
        iconRight={true}
      />
      <Button title="Modifier" onPress={handleSubmit} color="orange" />
      <FlatList
        data={erreurs}
        renderItem={({ item }) => <Text style={styles.errorText}>{item}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'black',
    padding: 10,
    borderWidth: 2,
    marginVertical: 10,
    width: 300,
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },

  wideButton: {
    width: 250, // Largeur personnalisée pour le bouton
    marginVertical: 20, // Espacement vertical
  },
});

export default FormUpdateUser;
