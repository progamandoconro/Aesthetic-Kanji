import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image
} from 'react-native';
import * as firebase from "firebase";

import Images from '../Assets/images';
import Colors from '../Style/Colors';
const window = Dimensions.get('window');

// Firebase
var config = {
    apiKey: "AIzaSyDxwaDxZctxtuX7Z3vvRizQDMytHHuWLFY",
    authDomain: "aesthetic-kanji.firebaseapp.com",
    databaseURL: "https://aesthetic-kanji.firebaseio.com/",
    projectId: "aesthetic-kanji",
    storageBucket: "aesthetic-kanji.appspot.com",
    messagingSenderId: "695611125777"
};

const firebaseApp = firebase.initializeApp(config);

export default class HomeScene extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      level: null,
    };

    this.itemsRef = this.getRef().child('Kanji');
  }

   getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          data: child.val(),
          _key: child.key
        });
      });
      
      this.setState({
        db: items
      });
      
    });
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>


      <LogoTitle />

      {/* N5 Level */}
      <ButtonLevel
        title={'N5 Level'}
        color={Colors.one}
        onPress={() => {
          this.state.level=5;
          navigate('Cards', { 
            level: this.state.level,
            list: this.state.db
         });
        }}
        />

      {/* N4 Level */}
      <ButtonLevel
        title={'N4 Level'}
        color={Colors.two}
        onPress={() => {
          this.state.level=4;
          navigate('Cards', { 
            level: this.state.level,
            list: this.state.db
         });
        }}
        />

      {/* N3 Level */}
      <ButtonLevel
        title={'N3 Level'}
        color={Colors.three}
        onPress={() => {
          this.state.level=3;
          navigate('Cards', { 
            level: this.state.level,
            list: this.state.db
         });
        }}
        />

      {/* N2 Level */}
      <ButtonLevel
        title={'N2 Level'}
        color={Colors.four}
        onPress={() => {
          this.state.level=2;
          navigate('Cards', { 
            level: this.state.level,
            list: this.state.db
         });
        }}
        />

      {/* N1 Level */}
      <ButtonLevel
        title={'N1 Level'}
        color={Colors.five}
        onPress={() => {
          this.state.level=1;
          navigate('Cards', { 
            level: this.state.level,
            list: this.state.db
         });
        }}
        />

      </View>
      );
  }
}

class Title extends Component {
  render() {
    return(
      <View style={styles.titleContainer}>
        {/* Aesthetic */}
        <Text style={styles.titleText}>美</Text>
        <Text style={styles.titleText}>的</Text>

        {/* Kanji */}
        <Text style={styles.titleText}>漢</Text>
        <Text style={styles.titleText}>字</Text>
      </View>
    );
  }
}

class LogoTitle extends Component {
  render() {
    return(
      <View style={styles.logoTitleContainer}>

        <Title />

        <Image style={styles.titleImage} source={Images.one}/>

      </View>
    );
  }
}

class ButtonLevel extends Component {
  render() {
    return(
      <View style={styles.buttonContainer}>
      <Button
        onPress={this.props.onPress}
        title={this.props.title}
        color={this.props.color}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors.Background
  },
  titleContainer: {
    flexDirection: 'column'
  },
  logoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 20
  },
  buttonContainer: {
    flexDirection: 'column',
    margin: 5,
    width: window.width * 0.8,
    marginBottom: 10
  },
  titleText: {
    fontSize: 60,
    color: Colors.Text
  },
  titleImage: {
    width: 200,
    height: 225
  }
});
