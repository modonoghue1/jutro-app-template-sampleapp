import { useState, useEffect, useCallback } from 'react';

// Usage example
// function App() {
//     const { execute, value, pending, error } = useAsync(myFunction, [dependencies], false);

//     return (
//       <div>
//         {!value && !pending && !error && <div>Start your journey by clicking a button</div>}
//         {value && <div>{value}</div>}
//         {error && <div>{error}</div>}
//         <button onClick={execute} disabled={pending}>
//           {!pending ? 'Click me' : 'Loading...'}
//         </button>
//       </div>
//     );
//   }

// 'async' Hook
export const useAsync = (asyncFunction, deps, immediate = true) => {
    const [pending, setPending] = useState(!!immediate);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setPending(true);
        setValue(null);
        setError(null);

        return asyncFunction()
            .then(response => {
                setValue(response);
                setPending(false);
                return response;
            })
            .catch(ex => {
                setError(ex);
                setPending(false);
                throw ex;
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...deps]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return { execute, pending, value, error };
};

// 'async' Hook
export const useAsyncPaging = (asyncFunction, deps, opts) => {
    const [pending, setPending] = useState(false);
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);
    const { immediate = true, pageSize = 5 } = opts ?? {};

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(
        (offset = 0) => {
            setPending(true);
            setError(null);
            if (offset === 0) {
                setValue(null);
            }

            return asyncFunction(offset, pageSize)
                .then(response => {
                    setValue(prevData => {
                        const { count, total, data } = response || {};
                        if (!prevData) {
                            return {
                                count: response?.count,
                                total: response?.total,
                                data: response?.data,
                            };
                        }
                        return {
                            count: prevData?.count + count,
                            total: total,
                            data: [...prevData?.data, ...data],
                        };
                    });
                    setPending(false);
                })
                .catch(ex => {
                    setError(ex);
                    setPending(false);
                    throw ex;
                });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [...deps, pageSize]
    );

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.
    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate]);

    return {
        execute,
        value: value?.data,
        pending,
        error,
        count: value?.count,
        total: value?.total,
    };
};

// 'async' Hook
export const useAsyncOld = (asyncFunction, immediate = true) => {
    const [status, setStatus] = useState('idle');
    const [value, setValue] = useState(null);
    const [error, setError] = useState(null);

    // The execute function wraps asyncFunction and
    // handles setting state for pending, value, and error.
    // useCallback ensures the below useEffect is not called
    // on every render, but only if asyncFunction changes.
    const execute = useCallback(() => {
        setStatus('pending');
        setValue(null);
        setError(null);

        return asyncFunction()
            .then(response => {
                setValue(response);
                setStatus('success');
            })
            .catch(expect => {
                setError(expect);
                setStatus('error');
            });
    }, [asyncFunction]);

    // Call execute if we want to fire it right away.
    // Otherwise execute can be called later, such as
    // in an onClick handler.

    useEffect(() => {
        if (immediate) {
            execute();
        }
    }, [execute, immediate /*, status */]);

    return { execute, status, value, error };
};
