import { StyleSheet, Text, View, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from "../firebaseConfig";
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

const Accueil = ({ navigation }) => {
    const [oeuvres, setOeuvres] = useState([]);

    useEffect(function () {
        getDocs(collection(db, "oeuvres"))
            .then(function (snapShot) {
                const data = [];
                snapShot.docs.map(function (doc) {
                    data.push({ ...doc.data(), id: doc.id });
                })
                setOeuvres(data);
            })

    }, [])

    const handleSubmit = (id) => {
        navigation.navigate('Single', { id: id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Accueil</Text>
            <FlatList
                data={oeuvres}
                renderItem={function ({ item }) {
                    return (
                        <View style={styles.oeuvreContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.nom}>{item.nom}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                            <Text style={styles.auteur}>Auteur: {item.auteur}</Text>
                            <TouchableOpacity onPress={() => handleSubmit(item.id)} style={styles.detailsButton}>
                                <Text style={styles.detailsButtonText}>Détails</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

export default Accueil;

// ...

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 20,
      textAlign: 'center',
  },
  oeuvreContainer: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 20,
      marginVertical: 10,
      alignItems: 'center',
      borderRadius: 10, // Ajout de cette propriété pour arrondir les coins
  },
  image: {
      width: 200,
      height: 150,
      marginBottom: 10,
      borderRadius: 10, // Arrondir les coins de l'image
  },
  nom: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
  },
  description: {
      fontSize: 16,
      marginBottom: 5,
  },
  auteur: {
      fontSize: 16,
      fontStyle: 'italic',
      marginBottom: 5,
  },
  detailsButton: {
      backgroundColor: '#009688',
      padding: 15,
      borderRadius: 5,
      borderRadius: 10, // Arrondir les coins du bouton
  },
  detailsButtonText: {
      color: 'white',
      fontWeight: 'bold',
  },
});

