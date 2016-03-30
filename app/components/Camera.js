'use strict';
import React, {
  AppRegistry,
  Component,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  ListView,
  StatusBar,
  TouchableOpacity
} from 'react-native';

import Camera from 'react-native-camera';
import Challenge from './Challenge'
import { Actions } from 'react-native-router-flux'

class CameraApp extends Component {

  constructor(props) {
      super(props);
      this.state = { visible: false, transparent: true, animated: true, photoData: '' };
    }

    setModalVisible(visible) {
    this.setState({visible: visible});
  }

  render() {

    // var modalBackgroundStyle = {
    //   backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    // };
    // var innerContainerTransparentStyle = this.state.transparent
    //   ? {backgroundColor: '#fff', padding: 20}
    //   : null;

    // let dataSource = new ListView.DataSource({
    //   rowHasChanged: (row1, row2) => row1 !== row2,
    // });

    // dataSource = dataSource.cloneWithRows(this.props.allChallenges);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={Actions.myChallenges} style={styles.backButton}>
            <Image source={{uri: 'https://s3-us-west-1.amazonaws.com/challengrproof/Drawing-layerExport+(1).jpeg'}} style={{width:50, height:50}} resizeMode={Image.resizeMode.contain} />
          </TouchableOpacity>
          <Text style={styles.headerText}>
            Create Challenge
          </Text>
        </View>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <TouchableHighlight activeOpacity = {0.2} underlayColor="white" style={styles.clickerFrame} onPress={()=> {
            // this.setModalVisible(true)
            this.takePicture()
          }}>
          <Image source={{uri: "https://s3-us-west-1.amazonaws.com/challengrproof/circle-outline-512.png"}} style = {styles.clicker}  resizeMode={Image.resizeMode.contain} />
          </TouchableHighlight>
        </Camera>
      </View>
          // [CAPTURE]</Text>

        // <Modal
        //   animated={this.state.animated}
        //   transparent={this.state.transparent}
        //   visible={this.state.visible}>
        //   <View style={[styles.container, modalBackgroundStyle]}>
        //     <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
        //       <Text onPress={this.setModalVisible.bind(this, false)}>
        //         Back
        //       </Text>
        //       <ListView
        //         dataSource={dataSource}
        //         renderRow={(rowData) => <TouchableHighlight onPress={()=> {this.props.sendPhotoToAWS(this.state.photoData, rowData.id)}}><Text>{rowData.challengeText}</Text></TouchableHighlight>}
        //         style={styles.listView} />
        //     </View>
        //   </View>
        // </Modal>
      // <StatusBar
      //   hidden={true}
      //   barStyle="light-content"
      //   showHideTransition="slide"
      //   animated={true}
      // />
    );
  }

  takePicture() {
    this.camera.capture()
    .then((data) => {
      console.log(data)
      console.log('THIS IS WORKED!!!!!', data)
      return this.setState({photoData: data})
    })
    .then(()=>{
      console.log("THE PROPS", this.props)
      return this.props.sendPhotoToAWS(this.state.photoData, this.props.currentId)
    })
    .then(()=>{
      console.log("INSIDE THE TOGGLIGN")
      return this.props.toggleChallenge(this.props.currentId)
    })
    .then(()=>{
      return Actions.myChallenges()
    })
    .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: 'row',
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  backButton: {
    marginRight: 40
  },
  headerText: {
    fontSize: 30,
    color: '#ff005f'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 5,
    margin: 5
  },
  clicker: {
    flex: 0,
    height: 50,
    width: 50,
  },
  clickerFrame: {
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 50
  }
});

export default CameraApp