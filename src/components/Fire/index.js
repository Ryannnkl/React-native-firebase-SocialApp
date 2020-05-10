import firebaseConfig from "../../config/firebaseConfig";
import firebase from "firebase";

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPost = async ({ text, localUrl }) => {
    const remoteUrl = await this.uploadPhotoAsync(localUrl);

    return new Promise((res, rej) => {
      this.firestore
        .collection("post")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUrl,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((err) => {
          rej(err);
        });
    });
  };

  uploadPhotoAsync = async (uri) => {
    const patyh = `photos/${this.uid}/${Date.now()}.jpg`;

    return Promise(async (res, rej) => {
      const response = fetch(uri);
      const file = await res.blob();

      let upload = firebase.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };
  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return firebase.auth().currentUser || {};
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();

export default Fire;
