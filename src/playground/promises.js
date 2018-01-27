const promise = new Promise( ( resolve, reject ) => {
  setTimeout( () => {
    resolve( 'This is my resolved data.' );
  } , 1500 );
} );

console.log( 'before' );

promise.then( (data) => { //then allows us register a callback
  console.log(data);
} ).catch( ( err ) => {
  
} );


console.log( 'after' );
