import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { School } from "@/shared/interfaces"

const getSchoolMany = async (name: string) => {
    const response = await headlessInstance.get(`/school?name=${name}`)
    const schoolArray = response.data
    const schoolNameArray = schoolArray.map((school: School) => school.name)
    return schoolNameArray
}

const SchoolAutoComplete = ({ onChange }: { onChange: (value: string) => void }) => {
    return <AutoComplete onChange={onChange} getOptionArray={getSchoolMany} available="onlyExisting" />
}

export default SchoolAutoComplete
