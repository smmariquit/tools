import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Accessibility Statement | PHTools",
	description:
		"Our commitment to making PHTools accessible to everyone, including those relying on keyboard navigation and screen readers.",
};

export default function AccessibilityPage() {
	return (
		<div
			style={{
				maxWidth: "800px",
				margin: "0 auto",
				padding: "0 20px",
			}}
		>
			<h1
				style={{
					fontSize: "32px",
					marginBottom: "24px",
					color: "var(--text-primary)",
				}}
			>
				Accessibility Statement
			</h1>

			<div
				className="card"
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					lineHeight: "1.6",
					color: "var(--text-secondary)",
				}}
			>
				<p>
					At PHTools, we are committed to ensuring our platform is accessible to
					everyone, regardless of their abilities or the assistive technologies
					they use.
				</p>

				<h2
					style={{
						fontSize: "20px",
						color: "var(--primary)",
						marginTop: "16px",
					}}
				>
					Keyboard Navigation & Screen Readers
				</h2>
				<p>
					We aim to adhere to the Web Content Accessibility Guidelines (WCAG)
					2.1 Level AA. As part of this commitment:
				</p>
				<ul style={{ paddingLeft: "24px" }}>
					<li>
						All our calculators and tools are designed to be fully navigable via
						keyboard (using the <code>Tab</code>, <code>Enter</code>, and arrow
						keys).
					</li>
					<li>
						We ensure sufficient color contrast across our interface in both
						light and dark modes.
					</li>
					<li>
						We strive to include proper ARIA attributes to support users
						utilizing screen reading software.
					</li>
				</ul>

				<h2
					style={{
						fontSize: "20px",
						color: "var(--primary)",
						marginTop: "16px",
					}}
				>
					Feedback
				</h2>
				<p>
					We are continuously improving the accessibility of our website. If you
					encounter any barriers or have suggestions on how we can improve
					keyboard navigation or screen reader support, please contact us. We
					welcome your feedback!
				</p>
			</div>
		</div>
	);
}
