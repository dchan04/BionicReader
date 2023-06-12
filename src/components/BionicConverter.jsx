import React from "react";
import Button from "react-bootstrap/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReturnBionicText from "./ReturnBionicText";
import DownloadPDF from "./DownloadBionicText";

import "./BionicConverter.css";

function getBionizedTextHTML(text) {
	// Split the input text into an array of words
	var words = text.split(/(\b\w+\b|\S)/);
	var convertedWords = [];

	// Apply markdown to the first half of each word.
	words.forEach(function (word) {
		if (word.match(/\w+/)) {
			var halfLength = Math.floor(word.length / 2);
			if (halfLength !== 0) {
				var boldedWord =
					"**" +
					word.substring(0, halfLength) +
					"**" +
					word.substring(halfLength);
				convertedWords.push(boldedWord);
			} else {
				var boldedWord = "**" + word + "**";
				convertedWords.push(boldedWord);
			}
		} else {
			convertedWords.push(word);
		}
	});
	var convertedText = convertedWords.join("");
	return convertedText;
}

function BionicConverter() {
	const inputRef = React.useRef();
	const outputRef = React.createRef();

	const [input, setInput] = React.useState();
	const [output, setOutput] = React.useState("");
	const [originalInput, setOriginalInput] = React.useState();

	const onInput = (event) => {
		setInput(event.target.value);
	};

	const ConvertToBionicText = () => {
		if (input !== undefined) {
			setOriginalInput(input);
			setOutput(getBionizedTextHTML(input));
		}
	};

	return (
		<>
			<div className="bionic-container">
				<div className="b-container col-12">
					<div className="b-container row">
						<div className="col-12 col-lg-4">
							<label>Input</label>
							<textarea
								className="text-container"
								ref={inputRef}
								value={input}
								placeholder="Paste your text here.
								"
								onChange={onInput}
							></textarea>
							<Button
								className="buttons"
								variant="light"
								size="lg"
							>
								Import
							</Button>
						</div>
						<div className="col-12 col-lg-1 ">
							<div className="button-container d-grid">
								<Button
									className="buttons"
									variant="primary"
									size="lg"
									onClick={() => ConvertToBionicText(input)}
								>
									Convert
								</Button>
							</div>
						</div>
						<div className="col-12 col-lg-7">
							<label>Output</label>
							<div className="text-container" ref={outputRef}>
								<ReturnBionicText markdown={output} />
							</div>
							<PDFDownloadLink
								document={<DownloadPDF text={originalInput} />}
								filename="BionicText"
							>
								{({ loading }) =>
									loading ? (
										<Button
											className="buttons"
											variant="success"
											size="lg"
										>
											Loading PDF File...
										</Button>
									) : (
										<Button
											className="buttons"
											variant="success"
											size="lg"
										>
											Download PDF
										</Button>
									)
								}
							</PDFDownloadLink>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BionicConverter;
