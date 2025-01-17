import { useMyReviews } from "../hooks/useMyReviews";
import { FlatList, View, Text, ActivityIndicator, StyleSheet, Button, Alert } from "react-native";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import { useDeleteReview } from "../hooks/useDeleteReview";
import { useEffect } from "react";

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
  },
  redButton: {
    backgroundColor: theme.colors.red,
    marginLeft: 10
  },
  blueButton: {
    backgroundColor: theme.colors.label,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const createTwoButtonAlert = (reviewId, deleteReview) =>
  Alert.alert('Are you sure?', 'You want to delete this review?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'OK', onPress: (() => {
        try {
          const { data, refetch } = deleteReview(reviewId)
          console.log(data)
          refetch()
        } catch (e) {
          console.log(e)
        }
      })
    },
  ]);


const ReviewItem = ({ review }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()
  useEffect(() => {

    console.log("REVIEW", review)
  }, [review])


  return (
    <View key={review.node.fullName} style={styles.container}>
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
            {review.node.repository.fullName}
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

        <View style={styles.buttonContainer}>
          <View style={styles.blueButton}>
            <Button
              title="View Repository"
              color={theme.colors.textContrast}
              onPress={() => {
                navigate(`/${review.node.repository.id}`)
              }}
            />
          </View>

          <View style={styles.redButton}>
            <Button
              title="Delete Review"
              color={theme.colors.textContrast}
              onPress={() => {
                createTwoButtonAlert(review.node.id, deleteReview)
              }}
            />
          </View>
        </View>
      </View>
    </View>
  )
}
const MyReviews = () => {
  const { reviews, loading } = useMyReviews();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  if (!reviews || reviews.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.reviewtext}>You haven&apos;t made any reviews yet.</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
}

export default MyReviews
