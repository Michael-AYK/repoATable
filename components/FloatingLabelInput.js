import React, { Component } from 'react';
import {
  View,
  StatusBar,
  TextInput,
  Animated,
} from 'react-native';

const defaultStyles = {
  labelStyle: {
    position: 'absolute',
      left: 0,
  },
  textInput: {
      height: 26, 
      fontSize: 17, 
      color: '#000', 
      borderBottomWidth: 1, 
      borderBottomColor: '#aaa',
      padding: 5
    },
    focusedTextInput: {
      borderBottomWidth: 2, 
      borderBottomColor: 'red'
    },
    selectionColor: 'red',
}

export default class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const style = defaultStyles;
    const animatedLabelStyle = {
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [8, -10],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 12],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#aaa', '#222'],
      }),
    };
    return (
      <View style={{ paddingTop: 12, marginTop: 18 }}>
        <Animated.Text style={[style.labelStyle,animatedLabelStyle]}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={[style.textInput,isFocused&&style.focusedTextInput]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
          selectionColor={style.selectionColor}
          underlineColorAndroid="transparent"
        />
      </View>
    );
  }
}

class Test extends Component {
  state = {
    value: '',
  };

  handleTextChange = (newText) => this.setState({ value: newText });

  render() {
    return (
      <View style={{ flex: 1, padding: 30, backgroundColor: '#f5fcff' }}>
        <StatusBar hidden />
        <FloatingLabelInput
          label="Email"
          value={this.state.value}
          onChangeText={this.handleTextChange}
        />
      </View>
    );
  }
}