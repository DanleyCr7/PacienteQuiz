import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import home from './pages/home';
import CronotipoMunique from './pages/CronotipoMunique';
import form from './pages/form';
import Edinburgh from './pages/Edinburgh';
import beck1 from './pages/Escala1Beck';
import EscalaAnsiedade from './pages/EscalaAnsiedade';
import EscalaAtencao from './pages/EscalaAtencao';
import Ostberg from './pages/Ostberg';
import Pisttsburgh from './pages/pisttsburgh';

const Router = createStackNavigator({
  'home': {
    screen: home,
    path: 'home/:home',
    navigationOptions: {
      title: 'Bem Vindo',
    }
  },
  'beck1': {
    screen: beck1,
    path: 'beck/:beck',
    navigationOptions: {
      title: 'Escala 1 de beck',
    }
  },
  'CronotipoMunique': {
    screen: CronotipoMunique,
    path: 'munique/:munique',
    navigationOptions: {
      title: 'Escala',
    }
  },
  'EscalaAnsiedade': {
    screen: EscalaAnsiedade,
    path: 'ansiedade/:ansiedade',
    navigationOptions: {
      title: 'Escala de Ansiedade',
    }
  },
  'EscalaAtencao': {
    screen: EscalaAtencao,
    path: 'atencao/:atencao',
    navigationOptions: {
      title: 'Escala de Ansiedade',
    }
  },
  'Ostberg': {
    screen: Ostberg,
    path: 'ostberg/:ostberg',
    navigationOptions: {
      title: 'Escala Ostberg',
    }
  },
  'form': {
    screen: form,
    navigationOptions: {
      title: 'Formulario',
    }
  },
  'Edinburgh': {
    screen: Edinburgh,
    path: 'edinburgh/:edinburgh',
    navigationOptions: {
      title: 'Edinburgh',
    }
  },
  'Pisttsburgh': {
    screen: Pisttsburgh,
    path: 'pisttsburgh/:pisttsburgh',
    navigationOptions: {
      title: 'pisttsburgh',
    }
  },

},
  {
    navigationOptions: {
      headerTintColor: '#fff',
      headerStyle: {
        backgroundColor: '#232955'
      },
      headerTintColor: '#fff'
    },
  });

const prefix = (Platform.OS === 'ios')
  ? 'https://'
  : 'https://www.nitlab.com/';
export default () => <Router uriPrefix={prefix} />;
