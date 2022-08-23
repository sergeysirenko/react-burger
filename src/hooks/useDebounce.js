import React from 'react';

export default function useDebounce(value, delay) {
    const [debounceValue, setDebounceValue] = React.useState('');

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value]);

    return debounceValue;
}