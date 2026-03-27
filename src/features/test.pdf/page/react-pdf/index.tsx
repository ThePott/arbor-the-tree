import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
        backgroundColor: "#E4E4E4",
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
})

type MyDocumentProps = {
    count: number
}
const MyDocument = ({ count }: MyDocumentProps) => (
    <Document>
        {Array(count)
            .fill(0)
            .map((_, index) => (
                <Page key={index} size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>Section #1</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>Section #2</Text>
                    </View>
                </Page>
            ))}
    </Document>
)

export default MyDocument
