import React from "react";
import { Text, StyleSheet, View,TouchableHighlight } from 'react-native';

const MathematicalAction = (props) => {
    const { item ,chosenAction, handleChosenAction} = props;

    return (
        <TouchableHighlight style={[styles.container,chosenAction === item.action && styles.pressedBacground]} underlayColor="#d1d1d1"    onPress={() => handleChosenAction(item.action)}>
            <View >
                <Text style={styles.text}>{item.action}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
        borderWidth:1,
        borderColor:"black",
        borderRadius:5

    },
    text: {
        fontWeight: "bold",
        fontSize: 20
    },
    pressedBacground:{
        backgroundColor:"#d1d1d1"
    }
});

export default MathematicalAction;