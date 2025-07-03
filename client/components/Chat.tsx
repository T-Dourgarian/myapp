import { PropsWithChildren, useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';


import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  SafeAreaView
} from 'react-native';
import * as signalR from '@microsoft/signalr';

interface ChatMessage {
  key: string;
  text: string;
}

export function Chat() {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [user, setUser] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5101/chatHub', {
         transport: signalR.HttpTransportType.WebSockets,
      }) // Replace with your server
      .withAutomaticReconnect()
      .build();

      console.log(newConnection)

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (!connection) return;

    connection.on('ReceiveMessage', (user: string, message: string) => {
      setMessages(prev => [
        ...prev,
        { key: `${user}-${Date.now()}`, text: `${user} says ${message}` }
      ]);
    });

    connection
      .start()
      .then(() => setIsConnected(true))
      .catch(err => console.error('SignalR Connection Error:', err));
  }, [connection]);

  const sendMessage = () => {
    if (connection && user && message) {
      connection
        .invoke('SendMessage', user, message)
        .catch(err => console.error('Send Error:', err));
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="User"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={sendMessage} disabled={!isConnected} />
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
