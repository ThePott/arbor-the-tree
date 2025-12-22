import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { School } from "@/shared/interfaces"
import type { ManualError } from "./_mypageInterfaces"
import type { FieldError } from "react-hook-form"

const getSchoolMany = async (name: string) => {
    const response = await headlessInstance.get(`/school?name=${name}`)
    const schoolArray = response.data
    const schoolNameArray = schoolArray.map((school: School) => school.name)
    return schoolNameArray
}

interface SchoolAutoCompleteProps {
    onValueChange: (value: string) => void
    onErrorChange: (error: ManualError | null) => void
    error: FieldError | undefined
    defaultValue?: string
}

const SchoolAutoComplete = ({ onValueChange, onErrorChange, error, defaultValue }: SchoolAutoCompleteProps) => {
    const handleErrorChange = (isError: boolean) => {
        if (!isError) {
            onErrorChange(null)
            return
        }

        // NOTE: 나중에는 학교 API를 받아와서 할 거니까 이대로 하는 게 맞다
        onErrorChange({ type: "manual", message: error?.message ?? "학교 이름을 입력해주세요" })
    }

    return (
        <AutoComplete
            outerIsRed={Boolean(error)}
            queryKey="school"
            onValueChange={onValueChange}
            onErrorChange={handleErrorChange}
            getOptionArray={getSchoolMany}
            available="any"
            defaultValue={defaultValue}
        />
    )
}

export default SchoolAutoComplete
