import { FullScreen, Vstack } from "@/packages/layouts"
import RoundBox from "@/packages/RoundBox"

const ApiTestPage = () => {
    return (
        <FullScreen>
            <RoundBox color="bg1" isShadowed>
                <Vstack>
                    <button>GET /</button>
                    <button>GET /checkhealth</button>
                </Vstack>
            </RoundBox>
        </FullScreen>
    )
}

export default ApiTestPage
