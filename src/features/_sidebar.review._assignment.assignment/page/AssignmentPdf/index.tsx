import { Document, Page, Text } from "@react-pdf/renderer"
import type { ReviewAssignmentMetaInfo } from "../../type"

type AssignmentPdfProps = { assignment: ReviewAssignmentMetaInfo }
const AssignmentPdf = ({ assignment }: AssignmentPdfProps) => {
    return (
        <Document>
            <Page>
                <Text>{JSON.stringify(assignment)}</Text>
            </Page>
        </Document>
    )
}

export default AssignmentPdf
