import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, Text } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../firebaseConfig';

function Login({ navigation }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');

  const handleSubmit = async () => {
    try {
      const usersCollection = collection(db, 'gestionnaires');
      const q = query(usersCollection, where('login', '==', login));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        const userData = userDoc.data();
        if (userData.password === password) {
          navigation.navigate('Gestion', { identifiants: { login, password } });
        } else {
          setErreur('Désolé, mot de passe incorrect.');
        }
      } else {
        setErreur('Désolé, identifiant incorrect.');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification des informations de connexion', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TextInput
        placeholder="Login"
        style={styles.input}
        value={login}
        onChangeText={(text) => setLogin(text)}
      />
      <TextInput
        placeholder="Mot de passe"
        secureTextEntry={true}
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title={'Connexion'} onPress={handleSubmit} />
      {erreur !== '' && <Text style={styles.erreur}>{erreur}</Text>}
      <Button onPress={() => navigation.navigate('ForgotPassword')} title="Mot de passe oublié" />
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
    margin: 10,
    width: 250,
  },
  erreur: {
    color: 'red',
    marginTop: 10,
  },
});

export default Login;
