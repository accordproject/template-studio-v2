import { runSaga } from 'redux-saga';

/**
 * saga to start given saga outside middleware with an action
 * --> the options object is used to define behavior of side effects
 * --> dispatch here fulfils put effects
 * --> adds dispatched actions to a list, then returns after saga is finished
 */
export async function recordSaga(saga, initialAction, state) {
  const dispatched = [];
  await runSaga(
    {
      dispatch: action => dispatched.push(action),
      getState: () => state,
    },
    saga,
    initialAction,
  ).toPromise();

  return dispatched;
}
