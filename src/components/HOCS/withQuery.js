/* eslint-disable react/prop-types */
import { Loader } from "../Loader/Loader"

// eslint-disable-next-line react/display-name
export const withQuery = (WrappedComponent) => ({isLoading, isError, error, refetch, ...rest}) => {
    if (isError) {
        return (
            <div>
                <p>
                Ошибка: {error.message}
                </p>
                <button onClick={refetch} type='button'>
                    Повторить запрос
                </button>
            </div>
        )
    }

    if (isLoading) return <Loader />

    return <WrappedComponent {...rest}/>
}