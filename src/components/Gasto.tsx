import React from 'react';
import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles';
import {dinero, fechas} from '../helpers';
type GastoT = PropsWithChildren<{
  gasto: any;
  handleEditarGasto: any;
}>;

const iconos: any = {
  ahorro: require('../img/icono_ahorro.png'),
  casa: require('../img/icono_casa.png'),
  comida: require('../img/icono_comida.png'),
  varios: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Gasto = ({gasto, handleEditarGasto}: GastoT): JSX.Element => {
  return (
    <Pressable
      onLongPress={() => {
        handleEditarGasto(gasto);
      }}>
      <View style={styles.container}>
        <Image style={styles.image} source={iconos[gasto.categoria]} />
        <View style={styles.content}>
          <View>
            <Text style={styles.name}>{gasto.nombre}</Text>
            <Text style={styles.category}>{gasto.categoria}</Text>
            <Text style={styles.date}>{fechas(gasto.date)}</Text>
          </View>
          <Text style={styles.amount}>{dinero(gasto.cantidad)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.contenido,
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    gap: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  category: {
    color: '#979797',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  amount: {
    fontWeight: '600',
  },
});
export default Gasto;
