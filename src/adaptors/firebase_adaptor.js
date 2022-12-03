// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
    getFirestore,
    getDoc,
    collection,
    onSnapshot,
    doc,
    addDoc,
    updateDoc,
  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export var DatabaseService = {
    database: getFirestore(app),
  
    /// DatabaseService.get('test').then(val => {
    ///     console.log(val)
    /// })
  
    /// col is a collection
    /// id is the id of the doc
    /// if id is null, it will return the collection documents as a list
    /// if id is not null, it will return the document with the id
    /// getDoc is is used when id is not null
    /// getDocs is is used when id is null
  
    get: async function () {
        var docRef = doc(this.database, 'Matches', '1');
        var snapshot = await getDoc(docRef);
        return {
          ...snapshot.data(),
          id: snapshot.id,
        };
    },
    subscribe: function (callback) {
        var docRef = doc(this.database, 'Matches', '1');
        onSnapshot(docRef, (doc) => {
          callback({
            ...doc.data(),
            id: doc.id,
          });
        });
    },
    // DatabaseService.set('test', {
    //   name: 'test',
    //   age: 'test',
    //   address: 'test'
    // })
    set: async function (col, data) {
      var collectionRef = collection(this.database, col);
      return await addDoc(collectionRef, data);
    },
  
    // DatabaseService.update('test','EEujUPFb9QJbfZMf0DkP', {
    //   name: 'kunal',
    //   address: "ahmedabad",
    //   age: 21
    // })
    update: async function ({ col, id, data, where }) {
      var docRef = doc(this.database, 'Matches', '1');
      await updateDoc(docRef, data);
    },
    reset: async function () {
      var docRef = doc(this.database, 'Matches', '1');
      await updateDoc(docRef, {
        "user1Address": "",
        "user1Score": 0,
        "user1Won": false,
        "user2Address": "",
        "user2Score": 0,
        "user2Won": false,
      }
      );
    },
    //     DatabaseService.delete('test', e.id)
    history: async function (data) {
      var collectionRef = collection(this.database, 'history');
      
      return await addDoc(collectionRef, data);
    }
  };