import { useReducer, useCallback } from 'react';

type State<T> = {
  status: Statuses;
  data?: T | null;
  error: unknown;
};
enum Statuses {
  idle = 'idle',
  pending = 'pending',
  rejected = 'rejected',
  resolved = 'resolved',
}
const initialState = {
  status: Statuses.idle,
  data: null,
  error: null,
};
export const useAsync = <T,>() => {
  const [{ status, data, error }, dispatch] = useReducer(
    (state: State<T>, actionPayload: Partial<State<T>>) => ({ ...state, ...actionPayload }),
    initialState
  );

  const run = useCallback((promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error('The argument passsed to useAsync().run must be a promise');
    }

    dispatch({ status: Statuses.pending });

    return promise
      .then((data) => {
        dispatch({ data, status: Statuses.resolved });
      })
      .catch((error) => {
        dispatch({ status: Statuses.rejected, error });
      });
  }, []);

  return {
    run,
    data,
    error,
    isPending: status === Statuses.pending,
    isSuccess: status === Statuses.resolved,
    isError: status === Statuses.rejected,
    isIdle: status === Statuses.idle,
  };
};
