import reduceReducers from '../';

describe('reduceReducers()', () => {
  it('combines multiple reducers into a single reducer', () => {
    const reducer = reduceReducers(
      (prev, curr) => ({...prev, A: prev.A + curr}),
      (prev, curr) => ({...prev, B: prev.B * curr}),
    );

    expect(reducer({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 4, B: 6 });
    expect(reducer({ A: 5, B: 8 }, 13)).to.deep.equal({ A: 18, B: 104 });
  });

  it('chains multiple reducers into a single reducer', () => {
    const addReducer = (prev, curr) => ({...prev, A: prev.A + curr});
    const multReducer = (prev, curr) => ({...prev, A: prev.A * curr});
    const reducerAddMult = reduceReducers(addReducer, multReducer);
    const reducerMultAdd = reduceReducers(multReducer, addReducer);

    expect(reducerAddMult({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 12, B: 2 });
    expect(reducerMultAdd({ A: 1, B: 2 }, 3)).to.deep.equal({ A: 6, B: 2 });
  });
});
