import * as firebase from 'firebase';

 // Initialize Firebase
 const config = {
  apiKey: "AIzaSyCs8J0ijWw9XWuxL1HR_RifuXxoCyLUcuA",
  authDomain: "expencify.firebaseapp.com",
  databaseURL: "https://expencify.firebaseio.com",
  projectId: "expencify",
  storageBucket: "expencify.appspot.com",
  messagingSenderId: "709380362686"
};

firebase.initializeApp(config);

const database = firebase.database();

// database.ref('expenses')
//   .once('value')
//   .then( ( snapshot ) => {
    
//     const expenses = [];
//     snapshot.forEach( ( childSnapshot ) => {
//       expenses.push( {
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       } ); 
//     } );

//     console.log( expenses );

//   } ).catch( ( e ) => console.log( e ) );

// database.ref( 'expenses' )
//   .on( 'value', (snapshot) => {

//     const expenses = [];
//     snapshot.forEach( ( childSnapshot ) => {
//       expenses.push( {
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       } ); 
//     } );

//     console.log( expenses );

//   } );



// database.ref('expenses').push({  
//   description: 'Rent',
//   note: 'Test note',
//   amount: 20000,
//   createdAt: 1234
// });


// If we want to notify every time that something changes
// we can use on('value', callback(snapshot));
// we use the callback because the then will run only one time.
// database.ref().on('value', (snapshot) => {
//   console.log(snapshot.val());
// } );
// database.ref().set( {
//   name: 'Gustavo Olmedo',
//   age: 26,
//   isSingle: true,
//   stressLevel: 6,
//   location: {
//     city: 'Formosa',
//     country: 'Argentina'
//   },
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   }
// } ).then( () => {
//   console.log('Data is saved');
// } ).catch( (e) => {
//   console.log('This failed.', e);
// } );

// database.ref('isSingle').remove()
//   .then(()=> console.log('isSingle property was removed successfully!!'))
//   .catch((err) => console.log('There was an error trying to remove isSingle property.'));

// database.ref().update({
//   name: 'Adolfo',
//   age: 30,
//   job: {
//     title: 'Software developer',
//     company: 'Google'
//   }
// })

// database.ref().update({
//   'location/city': 'Formosa'
// })

// database.ref().update({
//   stressLevel: 9,
//   'job/company': 'Amazon',
//   'location/city': 'Tucuman'
// })
// //If I pass a property name to a ref it will update only that property.
// database.ref('age').set(27);

// //If I have nested obj I need to use /.
// database.ref('location/city').set('CABA');

// database.ref('attributes').set({
//   height: 189,
//   weight: 70
// });
