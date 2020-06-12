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
          this.userInfos.get().then((resp) => {
            resp = resp.data();
            console.log(resp, " e ", resp.posts);
            firebase
              .firestore()
              .collection("users")
              .doc(this.uid)
              .update({
                posts: resp.posts + 1,
              })
              .then(() => {});
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

  get userInfos() {
    return firebase.firestore().collection("users").doc(this.uid);
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
  get fakeData() {
    return [
      {
        login: "technoweenie",
        id: 21,
        node_id: "MDQ6VXNlcjIx",
        avatar_url: "https://avatars3.githubusercontent.com/u/21?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/technoweenie",
        html_url: "https://github.com/technoweenie",
        followers_url: "https://api.github.com/users/technoweenie/followers",
        following_url:
          "https://api.github.com/users/technoweenie/following{/other_user}",
        gists_url: "https://api.github.com/users/technoweenie/gists{/gist_id}",
        type: "User",
        site_admin: false,
      },
      {
        login: "macournoyer",
        id: 22,
        node_id: "MDQ6VXNlcjIy",
        avatar_url: "https://avatars3.githubusercontent.com/u/22?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/macournoyer",
        html_url: "https://github.com/macournoyer",
        followers_url: "https://api.github.com/users/macournoyer/followers",
        following_url:
          "https://api.github.com/users/macournoyer/following{/other_user}",
        gists_url: "https://api.github.com/users/macournoyer/gists{/gist_id}",
        type: "User",
        site_admin: false,
      },
      {
        login: "takeo",
        id: 23,
        node_id: "MDQ6VXNlcjIz",
        avatar_url: "https://avatars3.githubusercontent.com/u/23?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/takeo",
        html_url: "https://github.com/takeo",
        followers_url: "https://api.github.com/users/takeo/followers",
        following_url:
          "https://api.github.com/users/takeo/following{/other_user}",
        type: "User",
        site_admin: false,
      },
      {
        login: "caged",
        id: 25,
        node_id: "MDQ6VXNlcjI1",
        avatar_url: "https://avatars3.githubusercontent.com/u/25?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/caged",
        html_url: "https://github.com/caged",
        followers_url: "https://api.github.com/users/caged/followers",
        following_url:
          "https://api.github.com/users/caged/following{/other_user}",
        type: "User",
        site_admin: false,
      },
      {
        login: "topfunky",
        id: 26,
        node_id: "MDQ6VXNlcjI2",
        avatar_url: "https://avatars3.githubusercontent.com/u/26?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/topfunky",
        html_url: "https://github.com/topfunky",
        followers_url: "https://api.github.com/users/topfunky/followers",
        following_url:
          "https://api.github.com/users/topfunky/following{/other_user}",
        gists_url: "https://api.github.com/users/topfunky/gists{/gist_id}",
        type: "User",
        site_admin: false,
      },
      {
        login: "anotherjesse",
        id: 27,
        node_id: "MDQ6VXNlcjI3",
        avatar_url: "https://avatars3.githubusercontent.com/u/27?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/anotherjesse",
        html_url: "https://github.com/anotherjesse",
        followers_url: "https://api.github.com/users/anotherjesse/followers",
        following_url:
          "https://api.github.com/users/anotherjesse/following{/other_user}",
        gists_url: "https://api.github.com/users/anotherjesse/gists{/gist_id}",
        type: "User",
        site_admin: false,
      },
      {
        login: "roland",
        id: 28,
        node_id: "MDQ6VXNlcjI4",
        avatar_url: "https://avatars2.githubusercontent.com/u/28?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/roland",
        html_url: "https://github.com/roland",
        followers_url: "https://api.github.com/users/roland/followers",
        following_url:
          "https://api.github.com/users/roland/following{/other_user}",
        type: "User",
        site_admin: false,
      },
      {
        login: "lukas",
        id: 29,
        node_id: "MDQ6VXNlcjI5",
        avatar_url: "https://avatars2.githubusercontent.com/u/29?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/lukas",
        html_url: "https://github.com/lukas",
        followers_url: "https://api.github.com/users/lukas/followers",
        following_url:
          "https://api.github.com/users/lukas/following{/other_user}",
        type: "User",
        site_admin: false,
      },
    ];
  }
}

Fire.shared = new Fire();

export default Fire;
