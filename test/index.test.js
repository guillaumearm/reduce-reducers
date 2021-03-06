import reduceReducers from '../src';

test('combines multiple reducers into a single reducer', () => {
  const reducer = reduceReducers(
    (state, payload) => ({ ...state, A: state.A + payload }),
    (state, payload) => ({ ...state, B: state.B * payload })
  );

  expect(reducer({ A: 1, B: 2 }, 3)).toEqual({ A: 4, B: 6 });
  expect(reducer({ A: 5, B: 8 }, 13)).toEqual({ A: 18, B: 104 });
});

test('chains multiple reducers into a single reducer', () => {
  const addReducer = (state, payload) => ({ ...state, A: state.A + payload });
  const multReducer = (state, payload) => ({ ...state, A: state.A * payload });
  const reducerAddMult = reduceReducers(addReducer, multReducer);
  const reducerMultAdd = reduceReducers(multReducer, addReducer);

  expect(reducerAddMult({ A: 1, B: 2 }, 3)).toEqual({ A: 12, B: 2 });
  expect(reducerMultAdd({ A: 1, B: 2 }, 3)).toEqual({ A: 6, B: 2 });
});

test('supports additional arguments', () => {
  const addReducer = (state, payload, scale) => ({
    ...state,
    A: (state.A + payload) * scale
  });
  const multReducer = (state, payload, scale) => ({
    ...state,
    A: state.A * payload * scale
  });
  const reducerAddMult = reduceReducers(addReducer, multReducer);

  expect(reducerAddMult({ A: 1, B: 2 }, 3, 2)).toEqual({ A: 48, B: 2 });
});
