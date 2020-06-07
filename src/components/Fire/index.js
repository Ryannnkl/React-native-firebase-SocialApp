import firebaseConfig from "../../config/firebaseConfig";
import { Alert } from "react-native";
import * as firebase from "firebase";
import "firebase/firestore";

class Fire {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    console.ignoredYellowBox = true;
  }

  addPost = async ({ text, localUri, likes, comments }) => {
    this.uploadPhotoAsync(localUri)
      .then((uri) => {
        new Promise(async (res, rej) => {
          const response = await firebase
            .firestore()
            .collection("posts")
            .doc(this.uid)
            .set({
              posts: [
                {
                  text,
                  likes,
                  comments,
                  uid: this.uid,
                  timestamp: this.timestamp,
                  image: uri,
                },
              ],
            });

          return res(response);
        });
      })
      .catch((err) => {
        rej(err);
        console.log("erro : ", err);
      });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    const response = await fetch(uri);
    const file = await response.blob();

    return new Promise(async (res, rej) => {
      firebase
        .storage()
        .ref(path)
        .put(file)
        .on(
          "state_changed",
          (snapshot) => {},
          (err) => {
            rej(err);
          },
          async () => {
            const url = await firebase
              .storage()
              .ref(path)
              .put(file)
              .snapshot.ref.getDownloadURL();
            res(url);
          }
        );
    });
  };

  sendMessage = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: this.timestamp,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on("child_added", (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get userData() {
    return firebase.auth().currentUser;
  }

  get db() {
    return firebase.database().ref("messages");
  }

  get singOut() {
    return firebase.auth().signOut();
  }

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire;
