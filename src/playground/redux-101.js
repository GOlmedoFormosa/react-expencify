import { createStore } from 'redux';

// const store = createStore((state = { count: 0 }, action) => {
//   if (action.type === 'INCREMENT'){
//     return {
//       count: state.count + 1
//     }
//   } else {
//     return state;
//   }
// });
// console.log(store.getState());

// //con cada dispatch la function dentro del create store se dispara.
// store.dispatch({
//   type: 'INCREMENT',
// });

// console.log(store.getState());

//=======================================================================
// const store = createStore((state = { count: 0 }, action) => {
//   switch(action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + 1
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - 1
//       };
//     case 'RESET':
//       return {
//         count: 0
//       }
//     default:
//       return state;
//   }
// });
// console.log('Initial state',store.getState());

// store.dispatch({
//   type: 'INCREMENT',
// });

// console.log('Increment 1',store.getState());

// store.dispatch({
//   type: 'DECREMENT',
// });

// console.log('Decrement 1',store.getState());

// store.dispatch({
//   type: 'INCREMENT',
// });

// store.dispatch({
//   type: 'INCREMENT',
// });

// console.log('Increment 2',store.getState());

// store.dispatch({
//   type: 'RESET',
// })
// console.log('Reset',store.getState());
//====================================================================================
// const store = createStore((state = { count: 0 }, action) => {
//   switch(action.type) {
//     case 'INCREMENT':
//       const incrementBy = action.incrementBy && typeof action.incrementBy === 'number' ?
//         action.incrementBy : 1;
//       return {
//         count: state.count + incrementBy,
//       };
//     case 'DECREMENT':
//       const decrementBy = action.decrementBy && typeof action.decrementBy === 'number' ?
//         action.decrementBy : 1;
//       return {
//         count: state.count - decrementBy
//       };
//     case 'SET':
//       return {
//         count: action.count
//       }
//     case 'RESET':
//       return {
//         count: 0
//       }
//     default:
//       return state;
//   }
// });

// // //esta arrow function se ejecuta cada vez que el state cambia.
// // store.subscribe(() => {
// //   console.log(store.getState());
// // });

// //también puedo crear un id y dejar de ejecutar la funcion cuando puedo de la siguiente manera.
// //para pararlo hacemos unsubscribe();
// const unsubscribe = store.subscribe(() => {
//     console.log(store.getState());
// });

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 5
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10
// });

// store.dispatch({
//   type: 'SET',
//   count: 101
// })

// store.dispatch({
//   type: 'INCREMENT',
// });
// //dejo de ver los cambios.
// unsubscribe();

// store.dispatch({
//   type: 'INCREMENT',
// });

// store.dispatch({
//   type: 'RESET',
// })

//=======================================================================================
// const store = createStore((state = { count: 0 }, action) => {
//   switch(action.type) {
//     case 'INCREMENT':
//       return {
//         count: state.count + action.incrementBy,
//       };
//     case 'DECREMENT':
//       return {
//         count: state.count - action.decrementBy
//       };
//     case 'SET':
//       return {
//         count: action.count
//       }
//     case 'RESET':
//       return {
//         count: 0
//       }
//     default:
//       return state;
//   }
// });

// store.subscribe(() => {
//     console.log(store.getState());
// });

// //Action Generators son functions que retornan "Action Objs".

// // const incrementCount = (payload = {}) => ({
// //     type: 'INCREMENT', 
// //     incrementBy: typeof payload.incrementBy === 'number' ? payload.incrementBy : 1
// //   });
// const incrementCount = ({incrementBy = 1} = {}) => ({
//   type: 'INCREMENT', 
//   incrementBy,
// });
// const decrementCount = ({decrementBy = 1} = {}) => ({
//   type: 'DECREMENT',
//   decrementBy,
// });
// const setCount = ({count}) => ({type: 'SET', count});
// const resetCount = () => ({type:'RESET'});


// store.dispatch(incrementCount({incrementBy: 5}));

// store.dispatch(decrementCount({decrementBy: 10}));

// store.dispatch(setCount({count: 101}));

// store.dispatch(incrementCount());

// store.dispatch(incrementCount());

// store.dispatch(resetCount());

//=================================================================================================

//El parametro que recibe la función createStore es llamado reducer. Actions describen algo que pasa
// pero no saben como la aplicación debe cambiar en respuesta a las acciones. Ese es el 
// trabajo de los reducers.

// Reducers
//1- Reducers are pure function.
//2- Never change state of action. Always return a new obj wich represent the new state.
const countReducer = (state = { count: 0 }, action) => {
  switch(action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy,
      };
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      };
    case 'SET':
      return {
        count: action.count
      }
    case 'RESET':
      return {
        count: 0
      }
    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState());
});

const incrementCount = ({incrementBy = 1} = {}) => ({
  type: 'INCREMENT', 
  incrementBy,
});
const decrementCount = ({decrementBy = 1} = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});
const setCount = ({count}) => ({type: 'SET', count});
const resetCount = () => ({type:'RESET'});


store.dispatch(incrementCount({incrementBy: 5}));
store.dispatch(decrementCount({decrementBy: 10}));
store.dispatch(setCount({count: 101}));
store.dispatch(incrementCount());
store.dispatch(incrementCount());
store.dispatch(resetCount());