import MypageContent from "@/features/mypage/MypageContent"
import useGlobalStore from "@/shared/store/globalStore"
import { useEffect } from "react"
import { useNavigate } from "react-router"

const Mypage = () => {
    const me = useGlobalStore((state) => state.me)
    const resume = useGlobalStore((state) => state.resume)
    const navigate = useNavigate()

    useEffect(() => {
        if (me) {
            return
        }
        navigate("/", { replace: true })
    }, [me])

    return <MypageContent me={me} resume={resume} key={[me, resume].toString()} />
}

export default Mypage
