import { createStackNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import React from 'react';
import home from './pages/home';
import CronotipoMunique from './pages/CronotipoMunique';
import form from './pages/form';
import Edinburgh from './pages/Edinburgh';
import beck1 from './pages/Escala1Beck';
import Ansiedade from './pages/EscalaAnsiedade';
import Atencao from './pages/EscalaAtencao';
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
    path: 'beck/:id',
    navigationOptions: {
      title: 'Escala 1 de beck',
    }
  },
  'CronotipoMunique': {
    screen: CronotipoMunique,
    path: 'munique/:id',
    navigationOptions: {
      title: 'Escala',
    }
  },
  'Ansiedade': {
    screen: Ansiedade,
    path: 'ansiedade/:id',
    navigationOptions: {
      title: 'Escala de Ansiedade',
    }
  },
  'Atencao': {
    screen: Atencao,
    path: 'atencao/:id',
    navigationOptions: {
      title: 'Escala de Atenção',
    }
  },
  'Ostberg': {
    screen: Ostberg,
    path: 'ostberg/:id',
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
    path: 'edinburgh/:id',
    navigationOptions: {
      title: 'Edinburgh',
    }
  },
  'Pisttsburgh': {
    screen: Pisttsburgh,
    path: 'pisttsburgh/:id',
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
