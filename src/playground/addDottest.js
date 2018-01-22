const add = (a,b) => a + b;
const generateGreeting = (name='Anonymous') => `Hello ${name}`;

test('should add two numbers', () => {
  const result = add(3, 4);

  // this is called assertion.
  // if(result !== 7) {
  //   throw new Error(`You added 4 and 3. The result was ${result}. Expected 7`);
  // }

  //jest comes with tools for assertions.
  expect(result).toBe(7);
});

test('should generate greeting from name', () => {
  const name = 'Gus';
  const result = generateGreeting(name);
  expect(result).toBe(`Hello ${name}`);
});

test('should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe(`Hello Anonymous`);
});
