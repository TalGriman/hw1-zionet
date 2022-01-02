
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, I18nManager, FlatList, Button, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MathematicalAction from './components/MathematicalAction';
import ENV from './constants/Env';

I18nManager.allowRTL(false);


const actions = [{ id: 1, action: "+" }, { id: 2, action: "-" }, { id: 3, action: "*" }, { id: 4, action: "/" }];
const column = 2;


const App = (props) => {

  // states
  const [chosenAction, setChosenAction] = useState();
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [result, setResult] = useState();


  // render to the screen the action buttons
  const renderListItem = (itemData) => {
    return <MathematicalAction item={itemData.item} chosenAction={chosenAction} handleChosenAction={handleChosenAction} />
  };

  // coloring the chosen action and put the value in the state
  const handleChosenAction = (chosenAction) => {
    setChosenAction(chosenAction);
  };

  // reset the states values to starting values
  const handleReset = () => {
    setChosenAction();
    setNumber1("");
    setNumber2("");4
    setResult();
  };

  // check fields and send request to server
  const handleCalculate = () => {
    if (number1 === "" || number2 === "" || !chosenAction) {
      alert("One or more of the details missing");
      setResult();
    }
    else if (chosenAction === "/" && number2 === "0") {
      alert("Cannot divide by zero");
      setResult();
    }
    else {
      calculate();
    }
  };

  // send to request to server
  const calculate = async () => {
    const settings = {
      method: 'POST',
      body: JSON.stringify({
        FirstNumber: number1,
        MathematicalAction: chosenAction,
        SecondNumber: number2
      }),
      headers: new Headers({
          'Content-type': 'application/json; charset=UTF-8',
      })
    };
    
    try {
      const fetchResponse = await fetch(ENV.apiUrl + 'Calculator/CalculatorResult', settings);

      if (!fetchResponse.ok) {
        throw fetchResponse.statusText
      }
      const data = await fetchResponse.json();
      setResult(data.Result);
    }
    catch (e) {
      Alert.alert(e);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <View style={styles.wrraper}>
            <Text style={styles.header}>Calculator - HW1</Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Text> Number1:</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput value={number1} onChangeText={(text) => setNumber1(text.replace(/[^0-9.]/g, ''))} keyboardType="number-pad" placeholder="Enter first number" style={styles.input} />
              </View>
            </View>
            <FlatList
              style={{ flexGrow: 0 }}
              numColumns={column}
              data={actions}
              renderItem={(item) => renderListItem(item)}
              keyExtractor={(item) => String(item.id)}
              ListHeaderComponent={() => <View />}
              ListHeaderComponentStyle={styles.listFooterAndHeader}
              ListFooterComponent={() => <View />}
              ListFooterComponentStyle={styles.listFooterAndHeader}
            />
            <View style={styles.inputContainer}>
              <View style={styles.inputLabelContainer}>
                <Text> Number2:</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput value={number2} onChangeText={(text) => setNumber2(text.replace(/[^0-9.]/g, ''))} keyboardType="number-pad" placeholder="Enter second number" style={styles.input} />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button
                  style={styles.button}
                  onPress={handleCalculate}
                  title="Calculate"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Button
                  style={styles.button}
                  onPress={handleReset}
                  title="Reset"
                  color="#750000"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
            </View>
          </View>
          {
            result !== undefined &&
            <View style={styles.resultContainer}>
              <View style={styles.resultWrapper}>
                <Text style={styles.resultTitle}>Result: {result}</Text>
              </View>
            </View>
          }

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrraper: {
    alignItems: "center"
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    width: "70%",
    overflow: "hidden"
  },
  input: {
    width: "100%",
    padding: 5
  },
  inputWrapper: {
    width: "70%"
  },
  inputLabelContainer: {
    width: "30%",
    backgroundColor: "#D1D1D1",
    alignItems: "center",
    justifyContent: "center"
  },
  listFooterAndHeader: {
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: "row",
    width: "70%",
    marginTop: 10,
  },
  buttonWrapper: {
    width: "50%",
    backgroundColor: "red",
    marginHorizontal: 1
  },
  button: {
    width: "90%"
  },
  resultContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10
  },
  resultWrapper: {
    width: "70%",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold"
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "grey"
  }
});

export default App;
