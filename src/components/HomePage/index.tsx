import React, {useState, useMemo, useCallback} from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  FlatList,
} from 'react-native';

// import {Todo} from '@domain/todo';

const styles = StyleSheet.create({
  action: {
    flexDirection: 'row',
  },
  base: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
  },
  item: {
    padding: 16,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemInner: {flexDirection: 'row'},
  itemTitle: {
    fontSize: 18,
  },
  title: {
    fontSize: 20,
  },
  section: {
    paddingHorizontal: 16,
  },
});

type Todo = {
  id: string;
  title: string;
  updatedAt: Date;
  createdAt: Date;
  checked: boolean;
};
type Props = {
  username: string;
  phoneNumber: string;
  isRefreshing: boolean;
  todos: Array<Todo>;
  children?: never;
  onPressSetting: () => void;
  onPressAdd: (_: {title: string}) => void;
  onPressItem: (_: {id: string}) => void;
  onRefresh: () => void;
};

const HomePage = ({
  username,
  phoneNumber,
  todos,
  isRefreshing,
  onPressSetting,
  onPressItem,
  onPressAdd,
  onRefresh,
}: Props) => {
  const [title, setTitle] = useState('');
  const keyExtractor = useCallback((item: Todo) => item.id, []);
  const listHeaderComponent = useMemo(
    () => (
      <>
        <View style={styles.section}>
          <Text style={styles.title}>Account</Text>
          <View>
            <Text>username: {username}</Text>
            <Text>phoneNumber: {phoneNumber}</Text>
          </View>
          <Button onPress={onPressSetting} title="Setting" />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Todos</Text>
          <View style={styles.action}>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(val) => setTitle(val)}
            />
            <Button onPress={() => onPressAdd({title})} title="Add" />
          </View>
        </View>
      </>
    ),
    [username, phoneNumber, onPressSetting, title, setTitle, onPressAdd]
  );
  const refreshControl = useMemo(
    () => <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />,
    [isRefreshing, onRefresh]
  );
  const renderItem = useCallback(
    ({item}: {item: Todo}) => {
      // console.log('renderItem', item);
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => onPressItem({id: item.id})}
        >
          <View style={styles.itemInner}>
            <Text>
              <Text>{item.checked ? '完' : '未'}: </Text>
              <Text style={styles.itemTitle}>{item.title}</Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    },
    [onPressItem]
  );
  return (
    <FlatList
      contentContainerStyle={styles.base}
      refreshControl={refreshControl}
      data={todos}
      keyExtractor={keyExtractor}
      ListHeaderComponent={listHeaderComponent}
      renderItem={renderItem}
    />
  );
};
export default HomePage;
