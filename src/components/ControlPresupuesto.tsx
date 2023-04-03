import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import type {PropsWithChildren} from 'react';
import globalStyles from '../styles';
import {dinero} from '../helpers';
import CircularProgress from 'react-native-circular-progress-indicator';
type Control = PropsWithChildren<{
  presupuesto: string | number;
  allGastos: Array<Object>;
  gastado: string | number;
  disponible: string | number;
  setGastado: Function;
  setDisponible: Function;
  handleResetApp: Function;
}>;

const ControlPresupuesto = ({
  presupuesto,
  allGastos,
  gastado,
  setGastado,
  disponible,
  setDisponible,
  handleResetApp,
}: Control): JSX.Element => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const totalGastado = allGastos.reduce(
      (total: number, gasto: any) => Number(gasto.cantidad) + total,
      0,
    );
    setGastado(totalGastado);

    setDisponible(Number(presupuesto) - Number(gastado));

    setPercent((Number(gastado) * 100) / Number(presupuesto));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gastado, allGastos, presupuesto]);

  return (
    <View style={styles.contenido}>
      <View style={styles.image}>
        <CircularProgress
          value={percent}
          progressValueColor={'#4b95e9'}
          valueSuffix={'%'}
          title={'Gastado'}
          // eslint-disable-next-line react-native/no-inline-styles
          titleStyle={{
            fontSize: 15,
            fontWeight: 'bold',
            color: '#979797',
          }}
          radius={100}
          inActiveStrokeColor={'#F5F5F5'}
          activeStrokeColor={'#4b95e9'}
        />
      </View>
      <Pressable
        style={styles.btnReset}
        onLongPress={() => {
          handleResetApp();
        }}>
        <Text style={styles.btnResetText}>Reset APP</Text>
      </Pressable>
      <View>
        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto:</Text>
          {dinero(presupuesto)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible:</Text>
          {dinero(disponible)}
        </Text>
        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado:</Text>
          {dinero(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenido: {
    ...globalStyles.contenido,
  },
  image: {
    alignItems: 'center',
  },
  valor: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    color: '#4b95e9',
  },
  imageSource: {
    width: 250,
    height: 250,
  },
  btnReset: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
    marginVertical: 15,
  },
  btnResetText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '900',
    color: '#F5F5F5',
  },
});

export default ControlPresupuesto;
