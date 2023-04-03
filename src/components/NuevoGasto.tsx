import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Pressable,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';

import type {PropsWithChildren} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

type GastoTypes = PropsWithChildren<{
  setModalNuevoGasto: any;
  handleGasto: any;
  gasto: any | null;
  setGasto: any;
  handleEliminarGasto: any;
}>;
const NuevoGasto = ({
  setModalNuevoGasto,
  handleGasto,
  gasto,
  setGasto,
  handleEliminarGasto,
}: GastoTypes) => {
  const [editar, setEditar] = useState(false);
  const [open, setOpen] = useState(false);

  const [nombreGasto, setNombreGasto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState(null);
  const [items, setItems] = useState([
    {label: 'Ahorro', value: 'ahorro'},
    {label: 'Comida', value: 'comida'},
    {label: 'Casa', value: 'casa'},
    {label: 'Gastos Varios', value: 'varios'},
    {label: 'Ocio', value: 'ocio'},
    {label: 'Salud', value: 'salud'},
    {label: 'Suscripciones', value: 'suscripciones'},
  ]);

  useEffect(() => {
    if (Object.keys(gasto).length > 0) {
      setNombreGasto(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setEditar(true);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.btnCont}>
        <Pressable
          style={styles.btnClose}
          onPress={() => {
            setModalNuevoGasto(false);
            setGasto({});
          }}>
          <Text style={styles.btnCloseText}>Cerrar</Text>
        </Pressable>
      </View>
      {editar && (
        <Pressable
          style={styles.btnDelete}
          onPress={() => {
            handleEliminarGasto(gasto);
          }}>
          <Text style={styles.btnCloseText}>Eliminar</Text>
        </Pressable>
      )}
      <View style={styles.form}>
        <Text style={styles.title}>
          {editar ? 'Editar Gasto' : 'Nuevo Gasto'}
        </Text>
        <View style={styles.field}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder='Ejemplo "Netflix"'
            value={nombreGasto}
            onChangeText={setNombreGasto}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Cantidad</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder='Cantidad Ejemplo "3000"'
            value={cantidad}
            onChangeText={setCantidad}
          />
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Categoria</Text>
          <DropDownPicker
            placeholder="Seleccione una categoria"
            open={open}
            value={categoria}
            items={items}
            setOpen={setOpen}
            setValue={setCategoria}
            setItems={setItems}
            listMode="MODAL"
          />
        </View>
        <Pressable
          style={styles.btnSend}
          onPress={() => {
            handleGasto(
              editar
                ? {...gasto, nombre: nombreGasto, cantidad, categoria}
                : {nombre: nombreGasto, cantidad, categoria},
            );
          }}>
          <Text style={styles.btnSendText}>
            {' '}
            {editar ? 'Editar' : 'Agregar'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#4b95e9',
    flex: 1,
  },
  btnCont: {
    alignItems: 'flex-end',
    marginHorizontal: 30,
    marginTop: 20,
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
  },
  btnClose: {
    padding: 10,
    backgroundColor: '#0a3a72',
    borderRadius: 10,
  },
  btnCloseText: {
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },
  btnSend: {
    marginVertical: 30,
    backgroundColor: '#0a3a72',
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
    position: 'relative',
  },
  btnSendText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#fff',
    zIndex: 1,
    position: 'relative',
  },
  form: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 30,
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 6,
  },
  title: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },
  field: {
    marginTop: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    elevation: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
  },
  select: {
    zIndex: 10,
  },
});
export default NuevoGasto;
