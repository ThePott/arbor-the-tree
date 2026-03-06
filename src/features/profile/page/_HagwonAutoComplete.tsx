import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { Hagwon } from "@/shared/interfaces"
import type { FieldError } from "react-hook-form"

const getHagwonMany = async (name: string) => {
    const response = await headlessInstance.get(`/hagwon?name=${name}`)
    const hagwonArray = response.data
    const hagwonNameArray = hagwonArray.map((hagwon: Hagwon) => hagwon.name)
    return hagwonNameArray
}

interface HagwonAutoCompleteProps {
    onValueChange: (value: string, isError: boolean) => void
    error: FieldError | undefined
    isForPrincipal?: boolean
    defaultValue?: string
    disabled?: boolean
}

const HagwonAutoComplete = ({
    onValueChange,
    error,
    isForPrincipal,
    defaultValue,
    disabled,
}: HagwonAutoCompleteProps) => {
    return (
        <AutoComplete
            disabled={disabled}
            outerIsRed={Boolean(error)}
            queryKey={["hagwon"]}
            onValueChange={onValueChange}
            getOptionArray={getHagwonMany}
            available={isForPrincipal ? "onlyNew" : "onlyExisting"}
            defaultValue={defaultValue}
        />
    )
}

export default HagwonAutoComplete

// 원장 유효성 검사
// resume 학원 없고 me 학원 없으면 -> 새 학원으로
// resume 학원혹은 me 학원이랑 같으면 -> 문제 없음
