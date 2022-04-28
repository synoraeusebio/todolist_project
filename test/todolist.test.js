const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');


const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Todays Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  //testing size
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  /* 
  How SEAT is used in the above test:
  S: us the setup and handled by the beforeEach method-that method gets executed before every test
  E: is "execute", which is list.size() in this example
  A: is "assert", which is the expect().toBe call
  T: is teardown, which we don't have in this example
  */

  //testing toArray
  test('calling toArray returns the list in array form', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });


  //testing first
  test('returns the first item in the todo list', () => {
    expect(list.first()).toEqual(todo1);
  });


  //testing last
  test('calling returns the last item in the todo list', () => {
    expect(list.last()).toEqual(todo3);
  });

  //testing shift
  test('shift() removes first item in list and returns it', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  //testing pop
  test('pop() removes the last item in a list and returns it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  //testing isDone
  test('calling returns true when all items in the list are done, otherwise return false', () => {
    expect(list.isDone()).toBe(false);
  });

  //testing add
  test('verify that a TypeError occurs when you attempt to add an items to the list that isnt a Todo object', () => {
    expect(() => list.add(1)).toThrow(TypeError); //note the syntax in the test, it also tests strings and numbers
    expect(() => list.add('hi')).toThrow(TypeError);
  });

  //testing itemAt **Good work on this one!!**
  test('raise a ReferenceError if we sepcify an element with no index', () => {
    expect(list.itemAt(1)).toEqual(todo2);
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
  })

  //testing markDoneAt
  test('raise a ReferenceError if we specify an index with no element', () => {
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);

    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
  });

  //testing markUndoneAt
  test('raise a ReferenceError if we specify an index with no element', () => {
    expect(() => list.markUndoneAt(5)).toThrow(ReferenceError);

    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
  });

  //markAllDone
  test('mark every todo on the list as done', () => {
    list.markAllDone(); 
    expect(list.isDone()).toBe(true);
  });

  //testing removeAt
  test('remove a Todo object with a specified index number and retuns the deleted Todo object.', () => {
  expect(() => list.removeAt(4)).toThrow(ReferenceError);

  list.removeAt(0)
  expect(list.toArray()).toEqual([todo2, todo3]);
});

//   //testing toString
//   test('toString returns string representation of the list', () => {
//   let string = `---- Todays Todos ----
//   [ ] Buy milk
//   [ ] Clean room
//   [ ] Go to the gym`;

//   expect(list.toString()).toBe(string);
// });

//more toString testing
// test('toString returns different string for done todo', () => {
//   let string = `---- Todays Todos ----
//   [ ] Buy milk
//   [X] Clean room
//   [ ] Go to the gym`;

//   list.markDoneAt(1);

//   expect(list.toString()).toBe(string);
// });

//more toString testing
test('toString returns different string for all done todos', () => {
  let string = `---- Todays Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

  list.markAllDone();

  expect(list.toString()).toBe(string);
});

//forEach testing
test('forEach iterates over all todos', () => {
  let result = [];
  list.forEach(todo => result.push(todo));

  expect(result).toEqual([todo1, todo2, todo3]);
});

//filter testing
test('filter returns new TodoList object with filtered todos', () => {
  todo1.markDone();
  let newList = new TodoList(list.title);
  newList.add(todo1);

  expect(newList.title).toBe(list.title);

  let doneItems = list.filter(todo => todo.isDone());
  expect(doneItems.toString()).toBe(newList.toString());
});

});