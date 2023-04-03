/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  View,
  Alert,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import Header from './src/components/Header';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import NuevoGasto from './src/components/NuevoGasto';
import {idGenerator} from './src/helpers';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import AsyncStorage from '@react-native-async-storage/async-storage';
function App(): JSX.Element {
  const [presupuestoValido, setPresupuestoValido] = useState(false);
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [presupuesto, setPresupuesto] = useState('');
  const [gastos, setGastos]: any = useState([]);
  const [allGastos, setAllGastos]: any = useState([]);
  const [gasto, setGasto]: any = useState({});
  const [modalNuevoGasto, setModalNuevoGasto] = useState(false);
  const [categoria, setCategoria] = useState('todos');

  useEffect(() => {
    async function getterPresupuesto() {
      try {
        const pre: any =
          (await AsyncStorage.getItem('presupuesto_gestor_gastos')) ?? 0;
        if (JSON.parse(pre) > 0) {
          setPresupuesto(JSON.parse(pre));
          setPresupuestoValido(true);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getterPresupuesto();
  }, []);

  useEffect(() => {
    async function getterGastos() {
      try {
        const gas: any = await AsyncStorage.getItem('gastos_gestor_gastos');

        setAllGastos(gas ? JSON.parse(gas) : []);
      } catch (err) {
        console.log(err);
      }
    }

    getterGastos();
  }, []);

  useEffect(() => {
    async function setterPresupuesto() {
      try {
        await AsyncStorage.setItem(
          'presupuesto_gestor_gastos',
          JSON.stringify(presupuesto),
        );
      } catch (err) {
        console.log(err);
      }
    }
    if (presupuestoValido) {
      setterPresupuesto();
    }
  }, [presupuestoValido, presupuesto]);

  useEffect(() => {
    async function setterGastos() {
      try {
        await AsyncStorage.setItem(
          'gastos_gestor_gastos',
          JSON.stringify(allGastos),
        );
      } catch (err) {
        console.log(err);
      }
    }

    setterGastos();
  }, [allGastos]);

  useEffect(() => {
    if (categoria !== 'todos') {
      const filtrado = allGastos.filter(
        (state: any) => state.categoria === categoria,
      );
      setGastos(filtrado);
    } else {
      setGastos(allGastos);
    }
  }, [categoria, allGastos]);
  const handleNuevoPresupuesto = (monto: string) => {
    if (Number(monto) > 0) {
      setPresupuestoValido(true);
    } else {
      Alert.alert('Error', 'Debe colocar un presupuesto', [
        {
          text: 'Okis',
        },
      ]);
    }
  };
  const handleNuevoGasto = () => {
    setModalNuevoGasto(true);
  };
  const handleGasto = (gast: any) => {
    if (Object.values(gast).includes('')) {
      Alert.alert('Error', 'Es necesario completar todos los campos');
      return;
    }

    if (!gast.categoria) {
      Alert.alert('Error', 'No selecciono una categoria');
      return;
    }

    if (!Number(gast.cantidad)) {
      Alert.alert('Error', 'El campo de cantidad es numerico');
      return;
    }

    if (!gast.id) {
      if (disponible - Number(gast.cantidad) < 0) {
        Alert.alert('Error', 'El gasto supera el monto disponible');
        return;
      }
      setAllGastos([
        ...allGastos,
        {
          id: idGenerator(),
          date: Date.now(),
          ...gast,
        },
      ]);
    } else {
      gast.date = Date.now();
      const gastosActualizados = allGastos.map((g: any) =>
        g.id === gast.id ? gast : g,
      );
      setAllGastos(gastosActualizados);
    }

    setModalNuevoGasto(false);
    setGasto({});
  };

  const handleEditarGasto = (item: any) => {
    setModalNuevoGasto(true);
    setGasto(item);
  };

  const handleEliminarGasto = (itemEliminar: any): void => {
    Alert.alert('Confirmación', 'Seguro desea eliminar', [
      {
        text: 'Cancelar',
      },
      {
        text: 'Eliminar',
        onPress: () => {
          const gastosActualizados = allGastos.filter(
            (g: any) => g.id !== itemEliminar.id,
          );

          setAllGastos(gastosActualizados);
          setGasto({});
          setModalNuevoGasto(false);
        },
      },
    ]);
  };

  const handleResetApp = () => {
    Alert.alert(
      'Advertencia!',
      'El presupuesto y todos los gastos seran eliminados, esta seguro?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Si,Resetear',
          onPress: () => {
            setAllGastos([]);
            setPresupuesto('');
            setPresupuestoValido(false);
          },
        },
      ],
    );
  };
  return (
    <View style={styles.main}>
      {!presupuestoValido && (
        <View style={styles.header}>
          <Header />
          <NuevoPresupuesto
            handleNuevoPresupuesto={handleNuevoPresupuesto}
            setPresupuesto={setPresupuesto}
            presupuesto={presupuesto}
          />
        </View>
      )}

      {presupuestoValido && (
        <ScrollView>
          <View style={styles.header}>
            <Header />
            <ControlPresupuesto
              allGastos={allGastos}
              presupuesto={presupuesto}
              gastado={gastado}
              setGastado={setGastado}
              disponible={disponible}
              setDisponible={setDisponible}
              handleResetApp={handleResetApp}
            />
          </View>
          <Filtro setCategoria={setCategoria} categoria={categoria} />
          <ListadoGastos
            gastos={gastos}
            handleEditarGasto={handleEditarGasto}
          />
        </ScrollView>
      )}

      {presupuestoValido && (
        <Pressable
          style={styles.btnGasto}
          onPress={handleNuevoGasto}
          onLongPress={handleNuevoGasto}>
          <Image
            style={styles.btnImagenGasto}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}

      <Modal visible={modalNuevoGasto} animationType="slide">
        <NuevoGasto
          setModalNuevoGasto={setModalNuevoGasto}
          handleGasto={handleGasto}
          gasto={gasto}
          setGasto={setGasto}
          handleEliminarGasto={handleEliminarGasto}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#F5F5F5',
    flex: 1,
  },
  header: {
    backgroundColor: '#4b95e9',
  },
  btnGasto: {
    height: 60,
    width: 60,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  btnImagenGasto: {
    width: 60,
    height: 60,
  },
});
export default App;
