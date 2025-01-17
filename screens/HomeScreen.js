import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import * as Font from 'expo-font';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
       word: '', definition: '', 
       phonetics: '',
       fontsLoaded: false,
       };
       
  }
 


async loadFonts() {
  await Font.loadAsync({
    // Load a font `Montserrat` from a static resource
    //Montserrat: require('./assets/fonts/Montserrat.ttf'),

    // Any string can be used as the fontFamily name. Here we use an object to provide more control
    'FrenchScriptMT': {
      uri: require('../assets/fonts/FrenchScriptMT.ttf'),
      display: Font.FontDisplay.FALLBACK,
    },
  });
  this.setState({ fontsLoaded: true });
}

componentDidMount() {
  this.loadFonts();
}
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var definition = response[0].meanings[0].definitions[0].definition;
        console.log(definition);
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'#70ae98'}
          centerComponent={{
            text: 'Pocket Dictionary',

            style: { color: 'white', fontSize: 30, fontFamily : 'FrenchScriptMT' },
          }}
        />

        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 18 }}>{this.state.word}</Text>
        <Text style={{ fontSize: 18 }}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'white',
    },
  searchButton: {
    width: '40%',
    height: 50,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'white',
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'Brush Script MT, Brush Script Std, cursive',
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
