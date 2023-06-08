import React from "react";
import Button from "react-bootstrap/Button";
import ReturnBionicText from "./ReturnBionicText";
import "./BionicConverter.css";

function calculateNumberOfBoldCharacters(word) {
	const wordLength = trimSpecialChars(word).length;
	let boldCharacterCount = Math.round((wordLength - 2 / 3) * (5 / 6));

	//Edge case
	switch (wordLength) {
		case 5:
			boldCharacterCount = 3;
	}

	return boldCharacterCount;
}

function getBoldWordHTML(word) {
	const boldCharacterCount = calculateNumberOfBoldCharacters(word);
	const boldSection = `**${word.slice(0, boldCharacterCount)}**`;
	const restOfWord = word.slice(boldCharacterCount);
	return `${boldSection}${restOfWord}`;
}

function getBionizedTextHTML(text) {
	const words = text.split(" ");
	const result = words.map((word) => getBoldWordHTML(word)).join(" ");
	return result;
}

function trimSpecialChars(word) {
	return word.replace(/[,.]/g, "");
}

function BionicConverter() {
	const textRef = React.useRef();
	const [input, setInput] = React.useState();
	const [output, setOutput] = React.useState("");

	const onChnage = (event) => {
		setInput(event.target.value);
	};

	const ConvertToBionicText = () => {
		if (input !== undefined) {
			setOutput(getBionizedTextHTML(input));
		}
	};

	return (
		<>
			<div className="bionic-container">
				<div className="col-12">
					<div className="row">
						<div className="col-12 col-lg-4">
							<label>Input</label>
							<textarea
								className="text-container"
								ref={textRef}
								value={input}
								placeholder="Paste your text here.
								"
								onChange={onChnage}
							></textarea>
							<Button
								variant="light"
								size="lg"
								id="import-button"
							>
								Import
							</Button>
						</div>
						<div className="col-12 col-lg-1 ">
							<div className="button-container d-grid">
								<Button
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
							<div className="text-container">
								<ReturnBionicText markdown={output} />
							</div>
							<Button
								variant="success"
								size="lg"
								id="download-button"
							>
								Download
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BionicConverter;
