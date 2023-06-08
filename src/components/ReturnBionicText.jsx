import { Remarkable } from "remarkable";

const md = new Remarkable();

export default function ReturnBionicText({ markdown }) {
	const renderedHTML = md.render(markdown);
	return <p dangerouslySetInnerHTML={{ __html: renderedHTML }} />;
}
