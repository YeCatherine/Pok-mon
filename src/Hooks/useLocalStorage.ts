import {Dispatch, SetStateAction, useEffect, useState} from 'react'

type SetValue<T> = Dispatch<SetStateAction<T>>

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
    /**
     * Get from local storage, then parse stored json or return initialValue
     */
    const readValue = (): T => {
        if (typeof window === 'undefined') {
            return initialValue
        }
        try {
            const item = window.localStorage.getItem(key)
            return item ? (JSON.parse(item) as T) : initialValue
        } catch (error) {
            console.warn(`Error reading localStorage key “${key}”:`, error)
            return initialValue
        }
    }

    /**
     * State to store the value
     * Pass initial state function to useState so logic is only executed once
     */
    const [storedValue, setStoredValue] = useState<T>(readValue)

    /**
     * Return a wrapped version of useState's setter function that
     * persists the new value to localStorage.
     * @param value
     */
    const setValue: SetValue<T> = value => {
        if (typeof window == 'undefined') {
            console.warn(
                `Tried setting localStorage key “${key}” even though environment is not a client,`
            )
        }
        try {
            const newValue = value instanceof Function ? value(storedValue) : value
            window.localStorage.setItem(key, JSON.stringify(newValue))
            setStoredValue(newValue)
            window.dispatchEvent(new Event('local-storage'))
        } catch (error) {
            console.warn(`Error setting localStorage key “${key}”:`, error)
        }
    }

    useEffect(() => {
        setStoredValue(readValue())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const handleStorageChange = () => {
            setStoredValue(readValue())
        }

        // this only works for other documents, not the current one
        window.addEventListener('storage', handleStorageChange)

        // this is a custom event, triggered in writeValueToLocalStorage
        window.addEventListener('local-storage', handleStorageChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('local-storage', handleStorageChange)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return [storedValue, setValue]
}

export default useLocalStorage