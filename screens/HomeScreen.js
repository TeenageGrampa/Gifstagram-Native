import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {

  state = {
    currentGif: '',
    search: ''
  }

  componentDidMount(){
    const mykey = 'ubRdaXWka1QsuEicM124SxibfeWjCLTC'
    fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&limit=1`).then(r => r.json()).then(
              gifData => this.setState({
              currentGif: gifData.data.image_url
          }))
  }

  onPressButton = () => {
    const mykey = 'ubRdaXWka1QsuEicM124SxibfeWjCLTC'
      if(this.state.search){
          const term = this.state.search
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&tag=${term}&limit=1`).then(r => r.json()).then(
              gifData =>  this.setState({
              currentGif: gifData.data.image_url,
              search: term
          }))
      } else {
          fetch(`https://api.giphy.com/v1/gifs/random?api_key=${mykey}&limit=1`).then(r => r.json()).then(
              gifData => this.setState({
              currentGif: gifData.data.image_url
          }))
      }
  };


  render(){let pic = {
    uri: this.state.currentGif
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={pic} style={{width: 300, height: 250}} onPress={this.onPressButton}/>
      <View style={styles.buttonContainer}>
          <Button
            onPress={this.onPressButton}
            title="Press Me"
          />
        </View>
        <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to search!"
          onChangeText={(text) => this.setState({search: text})}
          value={this.state.text}
        />
        {/* <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text}
        </Text> */}
      </View>
    </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
