const DefaultError = ({ error, reset }: { error: Error; reset: () => void }) => {
    return (
        <div>
            <button onClick={reset}>reset</button>
            <p>cause: {String(error.cause)}</p>
            <p>messsage: {String(error.message)}</p>
            <p>name: {String(error.name)}</p>
        </div>
    )
}

export default DefaultError
