import React, { useState, useRef, createRef } from "react";
import Button from "react-bootstrap/Button";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReturnBionicText from "./ReturnBionicText";
import DownloadPDF from "./DownloadBionicText";
import { pdfjs } from "react-pdf";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import "./BionicConverter.css";

function getFileExtension(fileName) {
	return fileName.slice(((fileName.lastIndexOf(".") - 1) >>> 0) + 2);
}

function str2xml(str) {
	if (str.charCodeAt(0) === 65279) {
		// BOM sequence
		str = str.substr(1);
	}
	return new DOMParser().parseFromString(str, "text/xml");
}

function getParagraphs(content) {
	const zip = new PizZip(content);
	const xml = str2xml(zip.files["word/document.xml"].asText());
	const paragraphsXml = xml.getElementsByTagName("w:p");
	const paragraphs = [];

	for (let i = 0, len = paragraphsXml.length; i < len; i++) {
		let fullText = "";
		const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
		for (let j = 0, len2 = textsXml.length; j < len2; j++) {
			const textXml = textsXml[j];
			if (textXml.childNodes) {
				fullText += textXml.childNodes[0].nodeValue;
			}
		}
		if (fullText) {
			paragraphs.push(fullText);
		}
	}
	var docText = paragraphs.join("");
	return docText;
}

function getBionizedTextHTML(text) {
	// Split the input text into an array of words
	var words = text.split(/(\b\w+\b|\S)/);
	var convertedWords = [];

	// Apply markdown to the first half of each word.
	words.forEach(function (word) {
		if (word.match(/\w+/)) {
			var halfLength = Math.floor(word.length / 2);
			var boldedWord;
			if (halfLength !== 0) {
				boldedWord =
					"**" +
					word.substring(0, halfLength) +
					"**" +
					word.substring(halfLength);
				convertedWords.push(boldedWord);
			} else {
				boldedWord = "**" + word + "**";
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
	const inputRef = useRef();
	const outputRef = createRef();
	const [input, setInput] = useState();
	const [output, setOutput] = useState("");
	const [originalInput, setOriginalInput] = useState();

	const onInput = (event) => {
		setInput(event.target.value);
	};
	const extractTextFromDocx = (content) => {
		const docxText = getParagraphs(content);
		setInput(docxText);
	};

	const extractTextFromPDF = async (content) => {
		pdfjs.GlobalWorkerOptions.workerSrc = new URL(
			"pdfjs-dist/build/pdf.worker.min.js",
			import.meta.url
		).toString();
		const loadingTask = pdfjs.getDocument(content);

		try {
			const pdf = await loadingTask.promise;
			const numPages = pdf.numPages;
			let extractedText = "";

			for (let i = 1; i <= numPages; i++) {
				const page = await pdf.getPage(i);
				const textContent = await page.getTextContent();
				const pageText = textContent.items
					.map((item) => item.str)
					.join(" ");
				extractedText += pageText + "\n";
			}

			setInput(extractedText);
		} catch (error) {
			console.error("Error occurred while extracting text:", error);
		}
	};

	const handleFileSelect = (event) => {
		if (event.target.files.length === 0) {
			return;
		}
		const file = event.target.files[0];
		const reader = new FileReader();
		const fileName = file.name;
		const fileExtension = getFileExtension(fileName);

		reader.onload = function (event) {
			if (fileExtension === "txt") {
				// Handle text file
				console.log("Found text file");
				const content = event.target.result;
				setInput(content);
			} else if (fileExtension === "pdf") {
				// Handle PDF file
				console.log("Found PDF file");
				const content = event.target.result;
				extractTextFromPDF(content);
			} else if (fileExtension === "docx" || fileExtension === "doc") {
				// Handle Word file
				console.log("Found docx file");
				const content = event.target.result;
				extractTextFromDocx(content);
			} else {
				// Unsupported file type
				setInput(
					"Unsupported file type. Only .txt and .pdf files are accepted." +
						"Currently working on support for docx files but there are dependency issues breaking my code when I use the .docx parser library called Mammoth."
				);
			}
		};
		if (fileExtension === "txt") {
			reader.readAsText(file);
		} else if (fileExtension === "pdf") {
			reader.readAsArrayBuffer(file);
		} else if (fileExtension === ("docx" || "doc")) {
			reader.readAsBinaryString(file);
		}
	};

	const handleUpload = () => {
		inputRef.current?.click();
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
								placeholder="Paste your text here."
								onChange={onInput}
							/>
							<div>
								<input
									className="d-none"
									ref={inputRef}
									onChange={handleFileSelect}
									type="file"
								/>
								<Button
									type="input"
									className="buttons"
									variant="light"
									size="lg"
									onClick={handleUpload}
								>
									Import File
								</Button>
							</div>
							<p id="filetype-text">
								Supported file types: docx, doc, pdf, txt
							</p>
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
