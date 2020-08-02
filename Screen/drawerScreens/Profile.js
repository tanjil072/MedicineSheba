
import React from 'react';

//Import all required component
import { View, Text } from 'react-native';

const Profile = () => {
  global.currentScreenIndex = 'Profile';
  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
      <Text style={{ fontSize: 23, marginTop: 10 }}>Profile Screen Done</Text>
      
    </View>
  );
};
export default Profile;