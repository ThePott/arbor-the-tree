import { headlessInstance } from "@/packages/api/axiosInstances"
import { FullScreen, Vstack } from "@/packages/layouts"
import RoundBox from "@/packages/RoundBox"

const ApiTestPage = () => {
    return (
        <FullScreen>
            <RoundBox color="bg1" isShadowed>
                <Vstack>
                    <button onClick={() => headlessInstance.get("/")}>GET /</button>
                    <button onClick={() => headlessInstance.get("/checkhealth")}>GET /checkhealth</button>
                </Vstack>
            </RoundBox>
        </FullScreen>
    )
}

export default ApiTestPage
