import RoundBox from "@/packages/components/RoundBox"
import Title from "@/packages/components/Title/Title"
import { debugRender } from "@/shared/config/debug/"

const ByStudentSection = () => {
    debugRender("ByStudentSection")
    return (
        <RoundBox padding="xl" color="bg2">
            <Title as="h2">여기에 추가할 것</Title>
            <p>
                {`
[ ] 학생들 출력
[ ] 연필 버튼 누르면 모달
[ ] 모달에 반 select <- select 이용해서 새로 만들어보자
`}
            </p>
        </RoundBox>
    )
}

export default ByStudentSection
