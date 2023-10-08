import { useState, useCallback } from 'react';
import { useAppDispatch } from './reduxHooks';

type useThunkTuple = [
    Function,
    boolean,
    Error | null,
]

const pause = (time?: number) => {
    return new Promise((resolve: Function) => {
        setTimeout(() => {
            resolve();
        }, time);
    })
}

function useThunk(thunk: Function, param?: any, pauseTime?: number) {
    console.log(param)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const dispatch = useAppDispatch();

    const runThunk = useCallback(async () => {
        setIsLoading(true);
        await pause(pauseTime)
            .then(() => {
                dispatch(thunk(param))
                    .unwrap()
                    .catch((err: Error) => setError(err))
                    .finally(() => setIsLoading(false));
            })

    }, [dispatch, isLoading, error]);

    return [runThunk, isLoading, error] as useThunkTuple;
}

export default useThunk;
export type { useThunkTuple };
