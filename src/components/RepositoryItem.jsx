import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: theme.colors.background,
  },
  topSection: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    marginBottom: 5,
  },
  label: {
    alignSelf: "flex-start",
    backgroundColor: theme.colors.label,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 8,
  },
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  statsItem: {
    alignItems: "center",
  },
  statValue: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";

  } else {
    return num.toString();
  }
}


const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.details}>
          <Text style={styles.name} color="textPrimary" fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text color="textSecondary">{repository.description}</Text>
          <View style={styles.label}>
            <Text color="textContrast">{repository.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statsItem}>
          <Text style={styles.statValue}>{formatNumber(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statValue}>{formatNumber(repository.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statValue}>{formatNumber(repository.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statValue}>{formatNumber(repository.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;