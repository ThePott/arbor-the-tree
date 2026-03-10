import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { School } from "@/shared/interfaces"
import type { FieldError } from "react-hook-form"

const getSchoolMany = async (name: string) => {
    const response = await headlessInstance.get(`/school?name=${name}`)
    const schoolArray = response.data
    const schoolNameArray = schoolArray.map((school: School) => school.name)
    return schoolNameArray
}

interface SchoolAutoCompleteProps {
    onValueChange: (value: string, isError: boolean) => void
    error: FieldError | undefined
    defaultValue?: string
    disabled?: boolean
}

const SchoolAutoComplete = ({ onValueChange, error, defaultValue, disabled }: SchoolAutoCompleteProps) => {
    return (
        <AutoComplete
            disabled={disabled}
            outerIsRed={Boolean(error)}
            queryKey={["school"]}
            onValueChange={onValueChange}
            getOptionArray={getSchoolMany}
            available="any"
            defaultValue={defaultValue}
        />
    )
}

export default SchoolAutoComplete
