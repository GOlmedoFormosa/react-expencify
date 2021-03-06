import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';


import { startAddExpense
        , editExpense
        , startEditExpense
        , removeExpense
        , startRemoveExpense
        , setExpenses
        , startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'thisismytestuid';
const defaultAuthState = { auth: { uid } } ;

// we create the configuration so we can allow the test cases to all create the same mock store
const createMockStore = configureMockStore([//array of middleware
  thunk
]);

beforeEach( ( done ) => {

  const expensesData = {};
  expenses.forEach( ({ id, description, note, amount, createdAt }) => {
    expensesData[ id ] = { description, note, amount, createAt };
  } );
  database.ref(`users/${uid}/expenses`).set(expensesData).then( () => done() );

} );

test( 'should setup remove expense action object.', () => {

  const action = removeExpense( { id: '123abc' } );
  expect( action ).toEqual( {
    type:'REMOVE_EXPENSE',
    id: '123abc'
  } );

} );

test( 'should setup remove expense from firebase.', (done) => {
  
  const store = createMockStore( defaultAuthState );
  const id = expenses[2].id;
  store.dispatch( startRemoveExpense( { id } ) ).then( () => {

    const actions = store.getActions();
    expect( actions[0] ).toEqual( {
      type:'REMOVE_EXPENSE',
      id
    } );
    return database.ref( `users/${uid}/expenses/${id}` ).once( 'value' );

  } ).then( (snapshot) => {

    expect( snapshot.val() ).toBeFalsy();
    done();
    
  } );

} );

test( 'should setup edit expense action object.', () => {
  
  const action = editExpense( '123abc', { note: 'New note value' } );
  expect( action ).toEqual( {
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: { note: 'New note value' }
  } );

} );

test( 'should edit expense from firebase.', ( done ) => {

  const store = createMockStore( defaultAuthState );
  const id = expenses[ 0 ].id;
  const updates = { amount: 12081991 };
  store.dispatch( startEditExpense( id, updates ) ).then( () => {

    const actions = store.getActions();
    expect( actions[ 0 ] ).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    } );
    return database.ref( `users/${uid}/expenses/${id}` ).once( 'value' );

  } ).then( ( snapshot ) => {

    expect( snapshot.val().amount ).toBe( updates.amount );
    done();

  } );

} );

test( 'should setup add expense action object with provided values.', () => {

  // const expenseData = {
  //   description: 'Rent',
  //   amount: 109500,
  //   createdAt: 1000,
  //   note: 'This was last month rent'
  // };

  const action = addExpense(expenses[2]);
  expect( action ).toEqual( {
    type: 'ADD_EXPENSE',
    expense: expenses[2]
    // {
    //   ...expenseData,
    //   id: expect.any(String)
    // }
  } );

} );

test( 'should add expense to database and store', (done) => { // done is to force jest to wait

  const store = createMockStore( defaultAuthState );
  const expenseData = {
    description: 'Mouse',
    amount : 3000,
    note: 'This one is better',
    createAt: 1000
  };

  store.dispatch( startAddExpense(expenseData) ).then( () => {

    const actions = store.getActions();
    expect( actions[0] ).toEqual( {
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    } );

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once( 'value' );
    // database.ref(`expenses/${actions[0].expense.id}`)
    //         .once( 'value' )
    //         .then( ( snapshot ) => {

    //   expect( snapshot.val() ).toEqual( expenseData );
    //   done();

    // } );
    

  } ).then( ( snapshot ) => {
    
    expect( snapshot.val() ).toEqual( expenseData );
    done();
    
  } );

} );

test( 'should add expense with defaults to database and store', (done) => {
  
  const store = createMockStore( defaultAuthState );
  const expenseData = {
    id: expect.any(String),
    description:  '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch( startAddExpense({}) ).then( () => {

    const actions = store.getActions();
    expect( actions[0] ).toEqual( {
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ... expenseData
      }
    } );


    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once( 'value' );

  } ).then( ( snapshot ) => {
    
    expect( snapshot.val() ).toEqual( {
      id: expect.any(String),
      ...expenseData
    } );
    done();
    
  } );

} );

test( 'should setup set expense action object with data.', () => {

  const action = setExpenses(expenses);
  expect( action ).toEqual( {
    type: 'SET_EXPENSES',
    expenses
  } );  

} );

test( 'should set expenses.', () => {

  const action = {
    type: 'SET_EXPENSES',
    expenses: [ expenses[ 1 ] ]
  };

  const state = expensesReducer( expenses, action );
  expect( state ).toEqual( [ expenses[ 1 ] ] );

} );

test( 'should fetch the expenses from firebase.', (done) => {

  const store = createMockStore( defaultAuthState );
  store.dispatch(startSetExpenses()).then( () => {

    const actions = store.getActions();
    expect( actions[0] ).toEqual( {
      type: 'SET_EXPENSES',
      expenses
    } );
    done();

  } );

} );

// test( 'should setup add expense action object with default values.', () => {
  
//     const expenseData = {
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     };

//     const action = addExpense();
//     expect( action ).toEqual( {
//       type: 'ADD_EXPENSE',
//       expense: {
//         ...expenseData,
//         id: expect.any(String)
//       }
//     } );
  
// } );

