import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { Hagwon } from "@/shared/interfaces"
import type { ManualError } from "./_mypageInterfaces"
import type { FieldError } from "react-hook-form"

const getHagwonMany = async (name: string) => {
    const response = await headlessInstance.get(`/hagwon?name=${name}`)
    const hagwonArray = response.data
    const hagwonNameArray = hagwonArray.map((hagwon: Hagwon) => hagwon.name)
    return hagwonNameArray
}

interface HagwonAutoCompleteProps {
    onValueChange: (value: string) => void
    onErrorChange: (error: ManualError | null) => void
    error: FieldError | undefined
    isForPrincipal?: boolean
    defaultValue?: string
}

const HagwonAutoComplete = ({
    onValueChange,
    onErrorChange,
    error,
    isForPrincipal,
    defaultValue,
}: HagwonAutoCompleteProps) => {
    const handleErrorChange = (isError: boolean) => {
        if (!isError) {
            onErrorChange(null)
            return
        }

        // TODO: zod error message는 없다고 사용하자
        const message: string = isForPrincipal ? "새 학원을 등록해주세요" : "목록 중의 학원을 선택해주세요"

        onErrorChange({
            type: "manual",
            message,
        })
    }

    return (
        <AutoComplete
            outerIsRed={Boolean(error)}
            onErrorChange={(isError) => {
                handleErrorChange(isError)
            }}
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
