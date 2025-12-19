import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
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
            <Hstack>
                <Labeled>
                    <Labeled.Header>get school many</Labeled.Header>
                    <AutoComplete getOptionArray={getSchoolMany} available="onlyExisting" onChange={() => {}} />
                </Labeled>
                <Labeled>
                    <Labeled.Header>do not request</Labeled.Header>
                    <AutoComplete getOptionArray={() => {}} available="onlyExisting" onChange={() => {}} />
                </Labeled>
            </Hstack>
        </Container>
    )
}

export default AutoCompleteTestPage
