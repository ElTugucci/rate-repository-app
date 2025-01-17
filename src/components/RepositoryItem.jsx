import { View, Image, StyleSheet, Button } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { Linking } from "react-native";


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
  buttonContainer: {
    backgroundColor: theme.colors.label,
    marginVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  }

});

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";

  } else {
    return num.toString();
  }
}

const RepositoryItem = ({ repository, showGithubButton = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topSection}>

        <Image style={styles.avatar} source={{ uri: repository.ownerAvatarUrl }} />
        <View style={styles.details}>
          <Text testID='fullName' style={styles.name} color="textPrimary" fontWeight="bold" fontSize="subheading">
            {repository.fullName}
          </Text>
          <Text testID='description' color="textSecondary">{repository.description}</Text>
          <View style={styles.label}>
            <Text testID='language' color="textContrast">{repository.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statsItem}>
          <Text testID='forksCount' style={styles.statValue}>{formatNumber(repository.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.statsItem}>
          <Text testID='stargazersCount' style={styles.statValue}>{formatNumber(repository.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View style={styles.statsItem}>
          <Text testID='ratingAverage' style={styles.statValue}>{formatNumber(repository.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
        <View style={styles.statsItem}>
          <Text testID='reviewCount' style={styles.statValue}>{formatNumber(repository.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
      </View>
      {showGithubButton && (
        <View style={styles.buttonContainer}>
          <Button
            title="Open in GitHub"
            color={theme.colors.textContrast}
            onPress={() => {
              Linking.openURL(repository.url);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default RepositoryItem;
