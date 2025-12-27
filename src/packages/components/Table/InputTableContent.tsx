import Input from "../Input/Input"
import { useInputTableStore, type InputTablePassedProps } from "./inputTableStore"

const InputTableContent = <TKey extends string>({ keyArray, rowArray, keyToLabel }: InputTablePassedProps<TKey>) => {
    const thing = useInputTableStore((state) => state.dummyDefault)
    console.log({ thing })

    return (
        <table>
            <thead>
                <tr>
                    {keyArray.map((key) => (
                        <th key={key} className="border">
                            {keyToLabel[key]}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rowArray.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {keyArray.map((key) => (
                            <td key={key} className="border p-3">
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

export default InputTableContent
