import React from 'react';
import { View, ActivityIndicator, FlatList, Text, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import useRepositoryById from '../hooks/useRepositoryById';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 2,
    backgroundColor: '#B0C4DE'
  },
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 5,
    backgroundColor: theme.colors.background,
    flexDirection: "row",
  },
  reviewtext: {
    color: theme.colors.textPrimary,
    fontSize: 16,
    flexWrap: "wrap",
    maxWidth: "94%",
  },
  datetext: {
    color: theme.colors.textSecondary,
  },
  nametext: {
    color: theme.colors.textPrimary,
    fontWeight: "bold",
    fontSize: 20
  },
  ratingtext: {
    fontWeight: "bold",
    color: theme.colors.label,
    fontSize: 24
  },

  ratingbox: {
    borderColor: theme.colors.label,
    height: 50,
    width: 50,
    borderWidth: 3,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnElement: {
    marginLeft: 5,
  },
  rowElement: {
    marginTop: 5,
    flexWrap: "wrap"
  }
});

const RepositoryInfo = ({ repository }) => {
  return (
    <View>
      <RepositoryItem repository={repository} showGithubButton={true} />
    </View>
  );
}

const ReviewItem = ({ review }) => {

  return (
    <View style={styles.container}>
      <View style={styles.columnElement}>
        <View style={styles.ratingbox}>
          <Text style={styles.ratingtext}>
            {review.node.rating}
          </Text>
        </View>
      </View>

      <View style={styles.columnElement}>
        <View style={styles.rowElement}>

          <Text style={styles.nametext}>
            {review.node.user.username}
          </Text>
        </View>

        <View style={styles.rowElement}>
          <Text style={styles.datetext}>
            {new Date(review.node.createdAt).toDateString()}
          </Text>
        </View>

        <View style={styles.rowElement}>
          <Text style={styles.reviewtext}>
            {review.node.text}
          </Text>
        </View>

      </View>
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepositoryView = () => {
  const { repositoryId } = useParams();

  console.log(repositoryId)
  const { repository, loading, fetchMore } = useRepositoryById({ id: repositoryId, first: 3 });

  const onEndReach = () => {
    console.log('end of reviews')
    fetchMore()
  }
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      data={repository.reviews.edges}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.node.id.toString()}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepositoryView;
