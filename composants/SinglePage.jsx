import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { doc, getDoc, collection } from 'firebase/firestore';
import db from '../firebaseConfig';

const SinglePage = ({ route }) => {
  const { id } = route.params;
  const [oeuvre, setOeuvre] = useState(null);

  useEffect(() => {
    const fetchOeuvre = async () => {
      try {
        const docRef = doc(db, 'oeuvres', id);
        const oeuvreDoc = await getDoc(docRef);

        if (oeuvreDoc.exists()) {
          const data = oeuvreDoc.data();
          setOeuvre(data);
        } else {
          console.log('Œuvre non trouvée');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de l\'œuvre:', error);
      }
    };

    fetchOeuvre();
  }, [id]);

  return (
    <View style={styles.container}>
      {oeuvre ? (
        <View style={styles.oeuvreContainer}>
          <Text style={styles.title}>Détails de l'œuvre</Text>
          <Image source={{ uri: oeuvre.image, width: 300, height: 200 }} />
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.text}>{oeuvre.nom}</Text>
          <Text style={styles.label}>Description:</Text>
          <Text style={styles.text}>{oeuvre.description}</Text>
          <Text style={styles.label}>Auteur:</Text>
          <Text style={styles.text}>{oeuvre.auteur}</Text>
        </View>
      ) : (
        <Text style={styles.errorMessage}>Œuvre non trouvée</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  
    paddingHorizontal: 20,
  },
  oeuvreContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
  },
});

export default SinglePage;
