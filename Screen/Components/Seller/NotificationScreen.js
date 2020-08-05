import * as React from 'react';
import { View } from 'react-native';
import { RadioButton, Text } from 'react-native-paper';

const MyComponent = () => {
  const [value, setValue] = React.useState('first');

  return (
    <RadioButton.Group onValueChange={value => setValue(value)} value={value} >
      <View style={{ flex: 1, flexDirection: 'row',alignItems:"center",justifyContent:"center" }}>
        <View>
          <Text>First</Text>
          <RadioButton value="first" />

        </View>
        <View>
          <Text>Second</Text>
          <RadioButton value="second" />
        </View>
      </View>
    </RadioButton.Group>
  );
};

export default MyComponent;