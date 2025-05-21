import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBBmX_0IFHmalTw0BjKu2_gML8fje1gjgM",
    authDomain: "spare-parts-delivery.firebaseapp.com",
    projectId: "spare-parts-delivery",
    storageBucket: "spare-parts-delivery.appspot.com",
    messagingSenderId: "541692476776",
    appId: "1:541692476776:web:7fe4665568e8dda689aadd"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, getDownloadURL, ref, storage, uploadBytesResumable };
