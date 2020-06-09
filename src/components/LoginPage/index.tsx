import React, {useState, useCallback} from 'react';
import {
  View,
  Button,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const styles = StyleSheet.create({
  base: {},
  input: {borderWidth: StyleSheet.hairlineWidth, padding: 4},
});

type Props = {
  children?: never;
  initialData:
    | {
        username: string;
        password: string;
      }
    | undefined;
  onPressLogin: (params: {username: string; password: string}) => void;
};
const LoginPage = ({
  initialData = {username: '', password: ''},
  onPressLogin,
}: Props) => {
  const [username, setUsername] = useState(initialData.username);
  const [password, setPassword] = useState(initialData.password);
  const onPress = useCallback(() => {
    onPressLogin({username, password});
  }, [username, password, onPressLogin]);
  return (
    <SafeAreaView>
      <View style={styles.base}>
        <Text>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => setUsername(val)}
          value={username}
        />
        <Text>Password:</Text>
        <TextInput
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
          style={styles.input}
          value={password}
        />
        <Button onPress={onPress} title="Login" />
      </View>
    </SafeAreaView>
  );
};
export default LoginPage;
