import React from "react";
import { Text, StyleSheet } from "@react-pdf/renderer";

const ReturnPdfText = ({ text }) => {
	// Split the input text into an array of words
	const words = text.split(/(\b\w+\b|\S)/);

	// Apply styling to the first half of each word.
	const bionicText = words.map((word, index) => {
		const wordLength = word.length;
		const midPoint = Math.floor(wordLength / 2);

		const firstHalf = word.substring(0, midPoint);
		const secondHalf = word.substring(midPoint);

		return (
			<Text key={index}>
				<Text style={styles.textbold}>{firstHalf}</Text>
				<Text style={styles.text}>{secondHalf}</Text>
			</Text>
		);
	});
	return <Text style={styles.text}>{bionicText}</Text>;
};

const styles = StyleSheet.create({
	text: {
		margin: 12,
		fontSize: 16,
		fontFamily: "Helvetica",
		textAlign: "justify",
	},
	textbold: {
		margin: 0,
		fontSize: 16,
		fontFamily: "Helvetica-Bold",
		textAlign: "justify",
	},
});
export default ReturnPdfText;
