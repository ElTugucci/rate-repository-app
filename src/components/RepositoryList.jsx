import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from "react-router";

import { Searchbar, Button, Divider, Menu, Provider as PaperProvider } from 'react-native-paper';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: '#B0C4DE'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const SearchBarComponent = ({ setSearchKeyword, searchKeyword }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchKeyword}
      value={searchKeyword}
    />
  )
};

export const RepositoryListContainer = ({ onEndReach, repositories, searchKeyword, setSearchKeyword }) => {
  const navigate = useNavigate();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <>
      <SearchBarComponent setSearchKeyword={setSearchKeyword} searchKeyword={searchKeyword} />
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <Pressable onPress={() => { navigate(`/${item.id}`); }}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
      />
    </>
  );
};

export const RepositoryList = () => {
  const [visible, setVisible] = useState(false);
  const [orderBy, setOrderBy] = useState('CREATED_AT')
  const [orderDirection, setOrderDirection] = useState('DESC')
  const [buttonLabel, setButtonLabel] = useState('Latest Repositories')
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500)

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const { repositories, fetchMore } = useRepositories({ first: 3, orderBy, orderDirection, searchKeyword: debouncedSearchKeyword });

  const onEndReach = () => {
    console.log('you have reached the end of the list')
    fetchMore()
  }
  const handleOrder = (order) => {

    switch (order) {
      case "latest":
        setOrderBy("CREATED_AT")
        setButtonLabel('Latest Repositories')
        closeMenu()
        break
      case "highestRating":
        setOrderBy("RATING_AVERAGE")
        setOrderDirection('DESC')
        setButtonLabel('Highest rated repositories')
        closeMenu()
        break
      case "lowestRating":
        setOrderBy("RATING_AVERAGE")
        setOrderDirection('ASC')
        setButtonLabel('Lowest Rated Repositories')
        closeMenu()
        break
      default:
        console.log("order values are incorrect")
    }
  }

  return (
    <PaperProvider>
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          flexDirection: 'horizontal',
          justifyContent: 'center',
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{buttonLabel}</Button>}
        >
          <Menu.Item onPress={() => { handleOrder("latest") }} title="Latest repositories" />
          <Divider />
          <Menu.Item onPress={() => { handleOrder("highestRating") }} title="Highest rated repositories" />
          <Divider />
          <Menu.Item onPress={() => { handleOrder("lowestRating") }} title="Lowest rated repositories" />
        </Menu>
        <RepositoryListContainer
          onEndReach={onEndReach}
          repositories={repositories}
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword} />
      </View>
    </PaperProvider>
  );
};

export default RepositoryList;
