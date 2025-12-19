import { headlessInstance } from "@/packages/api/axiosInstances"
import AutoComplete from "@/packages/components/AutoComplete/AutoComplete"
import type { Hagwon } from "@/shared/interfaces"

const getHagwonMany = async (name: string) => {
    const response = await headlessInstance.get(`/hagwon?name=${name}`)
    const hagwonArray = response.data
    const hagwonNameArray = hagwonArray.map((hagwon: Hagwon) => hagwon.name)
    return hagwonNameArray
}

interface HagwonAutoCompleteProps {
    onChange: (value: string) => void
    isForPrincipal?: boolean
}

const HagwonAutoComplete = ({ onChange, isForPrincipal }: HagwonAutoCompleteProps) => {
    return (
        <AutoComplete
            onChange={onChange}
            getOptionArray={getHagwonMany}
            available={isForPrincipal ? "onlyNew" : "onlyExisting"}
        />
    )
}

export default HagwonAutoComplete
