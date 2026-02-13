import { Document, Page, Text } from "@react-pdf/renderer"
import type { ExtendedReviewAssignment } from "../../type"

type AssignmentPdfProps = { assignment: ExtendedReviewAssignment }
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
