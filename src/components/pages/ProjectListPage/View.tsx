import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  item: {
    padding: 8,
  },
  itemTitle: { textAlign: 'left' },
});

type Item = { id: string; title: string };
type Props = {
  items: Array<Item>;
  onPressItem: (item: Item) => void;
  onPressAdd: () => void;
};
export const ProjectListPage: React.FC<Props> = (props) => {
  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => props.onPressItem(item)}
    >
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <Button onPress={props.onPressAdd} title="Add Project" />
      <FlatList data={props.items} renderItem={renderItem} />
    </>
  );
};
