import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = () => {
    // Envoyez un e-mail de réinitialisation de mot de passe à l'adresse e-mail spécifiée.
    // Vous pouvez implémenter cette fonctionnalité en utilisant Firebase, par exemple.

    // Affichez un message de confirmation à l'utilisateur.
    setMessage('Un e-mail de réinitialisation de mot de passe a été envoyé à votre adresse.');

    // Effacez l'adresse e-mail entrée par l'utilisateur.
    setEmail('');
  };

  return (
    <View style={styles.container}>
      <Text>Entrez votre adresse e-mail pour réinitialiser votre mot de passe :</Text>
      <TextInput
        placeholder="Adresse e-mail"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <Button title="Réinitialiser le mot de passe" onPress={handleResetPassword} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginVertical: 10,
  },
  message: {
    marginTop: 10,
    color: 'green',
  },
});

export default ForgotPassword;
