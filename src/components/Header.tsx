import React from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';

export default function Header(): JSX.Element {
  return (
    <SafeAreaView>
      <Text style={styles.titulo}>Gestor de Gastos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    paddingTop: 20,
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
