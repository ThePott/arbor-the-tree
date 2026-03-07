import type { NewSelectOption } from ".."
import Button from "../../Button/Button"
import { useSelectStore } from "../store"

// NOTE: 현재로는 옵션 배열을 최상단에서 주입함. << 컴파운드 패턴을 사용하지 않음
// NOTE: 컴파운드 패턴을 사용하지 않는 이유:  컴파운드 패턴을 사용하면 value는 props에 label은 children에 할당하게 되는데
// NOTE: 그렇게 되면 초깃값을 줄 때 label만 설정하게 된다. 이 때 value가 없는 게 문제다 << 그렇다면 defaultLabel이 아니라 defaultOption으로 하면 안 될까?
type NewSelectOptionProps<T extends string | number> = {
    option: NewSelectOption<T>
}
const NewSelectOption = <T extends string | number>({ option: { value, label } }: NewSelectOptionProps<T>) => {
    const setIsOpened = useSelectStore((state) => state.setIsOpened)
    const setSelectedValue = useSelectStore((state) => state.setSelectedValue)
    const onOptionSelect = useSelectStore((state) => state.onOptionSelect)

    const handleClick = () => {
        setIsOpened(false)
        setSelectedValue(value)
        onOptionSelect(label)
    }
    return (
        <Button color="transparent" onClick={handleClick} border="onHover" type="button">
            {label}
        </Button>
    )
}

export default NewSelectOption
