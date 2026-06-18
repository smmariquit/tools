import type { CSSProperties } from "react";
import WavyDivider from "./doodle/WavyDivider";
import ToolArticle from "./ToolArticle";
import ToolFooterClient from "./ToolFooterClient";

const rail: CSSProperties = {
	maxWidth: "800px",
	margin: "0 auto",
	width: "100%",
	padding: "0 16px",
};

export default function ToolPageBottom({ slug }: { slug: string }) {
	return (
		<>
			<div style={{ ...rail, margin: "32px auto" }}>
				<WavyDivider flip />
			</div>
			<ToolArticle slug={slug} />
			<div style={rail}>
				<ToolFooterClient />
			</div>
		</>
	);
}
