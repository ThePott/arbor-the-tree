import Button from "@/packages/components/Button/Button"
import { Vstack, Hstack } from "@/packages/components/layouts"
import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { Plus, Trash } from "lucide-react"
import ClassroomTable from "./ClassroomTable"
import LocalAutoComplete from "@/packages/components/LocalAutoComplete"
import type { Classroom } from "@/shared/interfaces"
import { Controller } from "react-hook-form"
import useClassroomAccordian from "./useClassroomAccordian"

type ClassroomAccordianProps = { classroom: Classroom }

const ClassroomAccordian = ({ classroom }: ClassroomAccordianProps) => {
    const { control, errors, handleSubmit, handleClassroomDelete, handleKeyDown, optionArray } =
        useClassroomAccordian(classroom)

    return (
        <RoundBox color="bg0" isShadowed padding="lg" radius="lg">
            <Vstack>
                <Hstack className="items-end justify-between">
                    <Title as="h2">{classroom.name}</Title>
                    <Button onClick={handleClassroomDelete}>
                        <Trash size={16} />
                    </Button>
                </Hstack>
                <ClassroomTable classroom={classroom} />

                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <Hstack gap="xs">
                        <Controller
                            control={control}
                            name="optionLabel"
                            render={({ field: { onChange } }) => (
                                <LocalAutoComplete
                                    isRed={Boolean(errors.optionLabel)}
                                    optionArray={optionArray}
                                    placeholder="학생 이름, 학교, 학년"
                                    onChange={onChange}
                                />
                            )}
                        />
                        <Button>
                            <Plus />
                        </Button>
                    </Hstack>
                </form>
            </Vstack>
        </RoundBox>
    )
}

export default ClassroomAccordian
