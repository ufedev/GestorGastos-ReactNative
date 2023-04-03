import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles';

type Presupuesto = PropsWithChildren<{
  handleNuevoPresupuesto: any;
  setPresupuesto: any;
  presupuesto: any;
}>;

const NuevoPresupuesto = ({
  handleNuevoPresupuesto,
  setPresupuesto,
  presupuesto,
}: Presupuesto): JSX.Element => {
  return (
    <View style={styles.contenido}>
      <Text style={styles.label}>Definir Presupuesto</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="Agrega un presupuesto Ej:2000"
        value={presupuesto}
        onChangeText={setPresupuesto}
      />
      <Pressable
        style={styles.btn}
        onPress={() => handleNuevoPresupuesto(presupuesto)}>
        <Text style={styles.btn_texto}>Agregar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    ...globalStyles.contenido,
  },
  label: {
    color: '#4b95e9',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    textAlign: 'center',
    marginTop: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  btn: {
    backgroundColor: '#0a3a72',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  btn_texto: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default NuevoPresupuesto;
