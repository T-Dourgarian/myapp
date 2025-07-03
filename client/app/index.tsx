import { Text, View } from "react-native";
import { Chat } from '@/components/Chat';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Chat />
    </View>
  );
}
