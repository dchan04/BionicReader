import React from "react";
import { Document, Page, View, Text, StyleSheet } from "@react-pdf/renderer";
import GetPdfText from "./ReturnPdfText";

const styles = StyleSheet.create({
	body: {
		flexGrow: 1,
	},
	row: {
		flexGrow: 1,
		flexDirection: "row",
	},
	text: {
		margin: 12,
		fontSize: 14,
		fontFamily: "Helvetica",
		textAlign: "justify",
	},
	textbold: {
		margin: 0,
		fontSize: 14,
		fontFamily: "Helvetica-Bold",
		textAlign: "justify",
	},
});

const DownloadPDF = (props) => {
	const text = props.text + "";
	return (
		<Document>
			<Page size="A4">
				<View style={styles.body}>
					<View style={styles.row}>
						<GetPdfText text={text}></GetPdfText>
					</View>
				</View>
			</Page>
		</Document>
	);
};

export default DownloadPDF;
