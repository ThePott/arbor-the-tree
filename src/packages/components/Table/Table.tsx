import Input from "../Input/Input"

interface InputTableProps<TKey extends string> {
    keyArray: TKey[] // NOTE: column 역할
    rowArray: Record<TKey, string>[] // NOTE: data 역할
    keyToLabel: Record<TKey, string> // NOTE: thead 용
}

const InputTable = <TKey extends string>({ keyArray, rowArray, keyToLabel }: InputTableProps<TKey>) => {
    return (
        <table>
            <thead>
                <tr>
                    {keyArray.map((key) => (
                        <th className="border">{keyToLabel[key]}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowArray.map((row, _rowIndex) => (
                    <tr>
                        {keyArray.map((key) => (
                            <td className="border p-3">
                                <div className="relative">
                                    <Input
                                        variant="ghost"
                                        colorChangeIn="fill"
                                        onBlur={(_event) => {
                                            // const value = event.target.value
                                            // const newData = [...data]
                                            // newData[rowIndex][key] = value
                                            // setData(newData)
                                            //
                                            // if (value !== "/") return
                                        }}
                                        defaultValue={row[key]}
                                    />
                                    <p className="absolute top-1/2 right-4 -translate-y-1/2 text-red-400/60">
                                        placeholder for overlay
                                        {/* {convertedData[rowIndex][key]} */}
                                    </p>
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InputTable
