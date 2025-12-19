import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import Labeled from "@/packages/components/Labeled/Labeled"
import { Container, Hstack, Vstack } from "@/packages/components/layouts"
import type { School } from "@/shared/interfaces"
import { useState, type ReactNode } from "react"
import { createStore, type StoreApi } from "zustand"
import { DateNowStoreContext, useDateNowStore, type DateNowStoreState } from "./_useAutoCompleteTest"
import RoundBox from "@/packages/components/RoundBox"
import Button from "@/packages/components/Button/Button"

const DateNowProvider = ({ children }: { children: ReactNode }) => {
    const [store, _setStore] = useState<StoreApi<DateNowStoreState>>(() =>
        createStore((set) => ({
            value: Date.now(),
            setValue: (value: number) => set({ value }),
        }))
    )
    return <DateNowStoreContext.Provider value={store}>{children}</DateNowStoreContext.Provider>
}

const DateNowContent = () => {
    const [rerenderTrigger, setRerenderTrigger] = useState(false)
    const value = useDateNowStore((state) => state.value)
    const setValue = useDateNowStore((state) => state.setValue)

    return (
        <RoundBox padding="xl" isBordered>
            <Vstack>
                <Button onClick={() => setValue(Date.now())}>update now</Button>
                <Button onClick={() => setRerenderTrigger(!rerenderTrigger)}>rerender</Button>
                <RoundBox padding="xl" isBordered>
                    {value}
                </RoundBox>
            </Vstack>
        </RoundBox>
    )
}

const DateNowBox = () => {
    return (
        <DateNowProvider>
            <DateNowContent />
        </DateNowProvider>
    )
}

const getSchoolMany = async (name: string) => {
    const response = await headlessInstance.get(`/school?name=${name}`)
    const schoolArray = response.data
    const schoolNameArray = schoolArray.map((school: School) => school.name)
    return schoolNameArray
}

const AutoCompleteTestPage = () => {
    const [count, setCount] = useState(1)
    return (
        <Container isPadded>
            <Button onClick={() => setCount(count + 1)}>add</Button>
            <Hstack>
                {Array(count)
                    .fill(0)
                    .map((_, index) => (
                        <DateNowBox key={index} />
                    ))}
            </Hstack>
            <Hstack>
                <Labeled>
                    <Labeled.Header>get school many</Labeled.Header>
                    <AutoComplete
                        // fieldName="school"
                        getOptionArray={getSchoolMany}
                        available="onlyExisting"
                        onChange={() => {}}
                    />
                </Labeled>
                <Labeled>
                    <Labeled.Header>do not request</Labeled.Header>
                    <AutoComplete
                        // fieldName="hagwon"
                        getOptionArray={() => {}}
                        available="onlyExisting"
                        onChange={() => {}}
                    />
                </Labeled>
            </Hstack>
        </Container>
    )
}

export default AutoCompleteTestPage
