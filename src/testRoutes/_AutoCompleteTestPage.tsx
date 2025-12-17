import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import Container from "@/packages/components/layouts/_Container"
import type { School } from "@/shared/interfaces"

const getSchoolMany = async (name: string) => {
    const response = await headlessInstance.get(`/school?name=${name}`)
    const schoolArray = response.data
    const schoolNameArray = schoolArray.map((school: School) => school.name)
    return schoolNameArray
}

const AutoCompleteTestPage = () => {
    return (
        <Container isPadded width="md">
            <AutoComplete getOptionArray={getSchoolMany} available="onlyExisting" onChange={() => {}} />
        </Container>
    )
}

export default AutoCompleteTestPage
