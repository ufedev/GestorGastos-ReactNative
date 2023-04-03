import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {PropsWithChildren} from 'react';
import Gasto from './Gasto';

type ListaGastos = PropsWithChildren<{
  gastos: Array<any>;
  handleEditarGasto: any;
}>;

const ListadoGastos = ({
  gastos,
  handleEditarGasto,
}: ListaGastos): JSX.Element => {
  return (
    <View style={styles.listContent}>
      {gastos.length === 0 ? (
        <Text style={styles.title}>No hay gastos aún</Text>
      ) : (
        <>
          <Text style={styles.title}>Gastos</Text>
          {gastos.map((gasto: any) => (
            <Gasto
              key={gasto.id}
              gasto={gasto}
              handleEditarGasto={handleEditarGasto}
            />
          ))}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    marginTop: 70,
    marginBottom: 150,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 10,
  },
});
export default ListadoGastos;
