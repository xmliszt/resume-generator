import { firebase } from "@firebase/app";
import "@firebase/auth";
import "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDU50LnNIPDvkKuTsFB3xtxVGgVIWXo1kQ",
  authDomain: "resume-generator-ba703.firebaseapp.com",
  databaseURL: "https://resume-generator-ba703.firebaseio.com",
  projectId: "resume-generator-ba703",
  storageBucket: "resume-generator-ba703.appspot.com",
  messagingSenderId: "446760385169",
  appId: "1:446760385169:web:5e29a94d6e5c13970add30"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();
