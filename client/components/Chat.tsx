import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { appState } from '../store/store';

// const { user, setUser } = appState();
// setUser({ name: 'John' });

import {

  Text,
  SafeAreaView
} from 'react-native';
import { Button } from '@react-navigation/elements';

interface ChatMessage {
  key: string;
  text: string;
}

export function Chat() {
  const { user, setUser } = appState();
  
 

  return (
    <SafeAreaView style={styles.container}>
     <Button
      onPressIn={() => { setUser( user + 'asdf')}}
     > click me</Button>

     <Text>{ user }</Text>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    padding: 8,
    borderRadius: 4
  },
  message: { marginVertical: 4, fontSize: 16 }
});
