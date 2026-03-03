import { getRouteApi, useLocation, useNavigate } from "@tanstack/react-router"
import SidebarButton from "../SidebarButton"

const route = getRouteApi("/_sidebar")

// TODO: 이거 이용해서 삭제 버튼을 넣었을텐데 없어졌다
const AllButton = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const searchParams = route.useSearch()
    const { is_assignment, syllabus_id, ...rest } = searchParams

    const handleBodyClick = () => {
        navigate({ to: pathname, search: { ...rest } })
    }

    return (
        <SidebarButton isSelected={!is_assignment && !syllabus_id} onClick={handleBodyClick}>
            <SidebarButton.TextSection>
                <p>전체</p>
            </SidebarButton.TextSection>
        </SidebarButton>
    )
}

export default AllButton
