import { Alert, Linking } from 'react-native'

export default function showAlert(url) {

    Alert.alert(
        "Attention",
        "Do you want to follow an external link?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "OK",
                onPress: () => {
                    console.log("OK Pressed")
                    Linking.openURL(url);
                },
            }

        ]
    );
}