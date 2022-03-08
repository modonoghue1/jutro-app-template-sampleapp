import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useContext,
    useRef,
} from 'react';
import { set, isString, isNil, merge } from 'lodash/fp';

export const PatternContext = React.createContext({});

export function isValueOption(value) {
    return (
        !isString(value) &&
        ((value?.code && value?.name) || (value?.id && value?.displayName))
    );
}

export function usePatternState(
    dataProp,
    onDataChangeProp,
    path,
    initialState
) {
    const {
        data: dataFromContext,
        onDataChange: onDataChangeFromContext,
    } = useContext(PatternContext);

    const [internalState, setInternalState] = useState({});
    const data = dataProp || dataFromContext;
    const onDataChange = onDataChangeProp || onDataChangeFromContext;
    const state = useMemo(() => {
        if (data && onDataChange) {
            return path ? data[path] : data;
        }
        return path ? internalState[path] : internalState;
    }, [data, onDataChange, internalState, path]);

    const onStateChange = useCallback(
        (value, updatePath) => {
            const resolvedPath = updatePath ? `${path}.${updatePath}` : path;
            if (onDataChange) {
                onDataChange(value, resolvedPath);
                return;
            }
            setInternalState(currentState =>
                set(resolvedPath, value, currentState)
            );
        },
        [onDataChange, path]
    );

    useEffect(() => {
        if (!onDataChange && !isNil(data)) {
            setInternalState(data);
        }
    }, [onDataChange, data]);

    useEffect(() => {
        if (!initialState) {
            return;
        }
        onStateChange(merge(initialState, state));
    }, [initialState, state, onStateChange]);

    return [state, onStateChange];
}

export function useErrorsFromPatternShell(
    showErrorsProp,
    patternShellReSubmittedProp,
    preCondition
) {
    const [
        showErrorsFromPatternShell,
        setShowErrorsFromPatternShell,
    ] = useState(false);
    const {
        showErrors: showErrorsFromContext,
        patternShellReSubmitted: patternShellReSubmittedFromContext,
    } = useContext(PatternContext);
    const showErrors = showErrorsProp || showErrorsFromContext;
    const patternShellReSubmitted =
        patternShellReSubmittedProp || patternShellReSubmittedFromContext;
    const patternShellReSubmittedPrev = useRef(patternShellReSubmitted);
    const isPreConditionMet = useMemo(
        () => isNil(preCondition) || !!preCondition,
        [preCondition]
    );
    const preConditionPrev = useRef();

    useEffect(() => {
        if (preCondition !== preConditionPrev.current) {
            if (isPreConditionMet) {
                patternShellReSubmittedPrev.current = patternShellReSubmitted;
            } else {
                setShowErrorsFromPatternShell(false);
            }
            preConditionPrev.current = preCondition;
        }
    }, [preCondition, isPreConditionMet, patternShellReSubmitted]);

    useEffect(() => {
        if (showErrorsFromPatternShell || !isPreConditionMet) {
            return;
        }
        if (patternShellReSubmittedPrev.current !== patternShellReSubmitted) {
            if (showErrors) {
                setShowErrorsFromPatternShell(true);
            }
            patternShellReSubmittedPrev.current = patternShellReSubmitted;
        }
    }, [
        showErrorsFromPatternShell,
        isPreConditionMet,
        patternShellReSubmitted,
        showErrors,
    ]);

    return showErrorsFromPatternShell;
}

export function usePatternErrorsFlag(showErrorsProp) {
    const { showErrors: showErrorsFromContext } = useContext(PatternContext);
    return !isNil(showErrorsProp) ? showErrorsProp : showErrorsFromContext;
}

export function usePatternValidationCallback(path, onValidationChangeProp) {
    const { onValidationChange: onValidationChangeFromContext } = useContext(
        PatternContext
    );
    const resolvedCallback =
        onValidationChangeProp || onValidationChangeFromContext;
    const callback = useCallback(
        isValid => resolvedCallback?.(path, !isValid),
        [path, resolvedCallback]
    );
    return callback;
}
