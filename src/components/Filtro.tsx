import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import globalStyles from '../styles';
import type {PropsWithChildren} from 'react';

type FiltroTypes = PropsWithChildren<{
  setCategoria: Function;
  categoria: string;
}>;

const Filtro = ({setCategoria, categoria}: FiltroTypes): JSX.Element => {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {label: 'Ahorro', value: 'ahorro'},
    {label: 'Comida', value: 'comida'},
    {label: 'Casa', value: 'casa'},
    {label: 'Gastos Varios', value: 'varios'},
    {label: 'Ocio', value: 'ocio'},
    {label: 'Salud', value: 'salud'},
    {label: 'Suscripciones', value: 'suscripciones'},
    {label: 'Todos', value: 'todos'},
  ]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtrar Gasto</Text>
      <DropDownPicker
        placeholder="Seleccione una categoria"
        open={open}
        value={categoria}
        items={items}
        setOpen={setOpen}
        setValue={item => {
          setCategoria(item);
        }}
        setItems={setItems}
        listMode="MODAL"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.contenido,
    marginTop: 70,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Filtro;
