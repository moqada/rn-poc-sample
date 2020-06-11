import React, {useCallback, useState} from 'react';
import {Button, Text, TextInput, View, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  base: {
    padding: 16,
  },
  checkbox: {
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
    marginRight: 8,
  },
  editor: {
    flexDirection: 'row',
  },
  footer: {
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
  },
});

type Props = {
  title: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
  onPressSave: (_: {title: string; checked: boolean}) => void;
};
const TodoDetailPage = ({
  title,
  checked,
  createdAt,
  updatedAt,
  onPressSave,
}: Props) => {
  const [inputTitle, setInputTitle] = useState<string>(title);
  const [inputChecked, setInputChecked] = useState<boolean>(checked);
  const onPress = useCallback(() => {
    onPressSave({title: inputTitle, checked: inputChecked});
  }, [inputTitle, inputChecked, onPressSave]);
  return (
    <View style={styles.base}>
      <View style={styles.editor}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setInputChecked(!inputChecked)}
        >
          <Text>{inputChecked ? '完' : '未'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          defaultValue={title}
          onChangeText={setInputTitle}
        />
      </View>
      <Text>createdAt: {createdAt.toISOString()}</Text>
      <Text>updatedAt: {updatedAt.toISOString()}</Text>
      <View style={styles.footer}>
        <Button onPress={onPress} title="Save" />
      </View>
    </View>
  );
};

export default TodoDetailPage;
