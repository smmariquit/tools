type Props = {
	/** The 11-character YouTube video ID (not the full URL). */
	id: string;
	/** Accessible title for the iframe; also shown as the caption. */
	title: string;
	/** Optional caption override (defaults to `title`). */
	caption?: string;
	/** Optional start time in seconds. */
	start?: number;
};

/**
 * Privacy-friendly, lazy-loaded YouTube embed for MDX writeups.
 * Uses youtube-nocookie.com so no tracking cookies drop until play.
 */
export default function YouTube({ id, title, caption, start }: Props) {
	if (!id) return null;
	const src = `https://www.youtube-nocookie.com/embed/${id}${
		start ? `?start=${start}` : ""
	}`;

	return (
		<figure style={{ margin: "0 0 28px" }}>
			<div
				style={{
					position: "relative",
					width: "100%",
					paddingTop: "56.25%",
					borderRadius: "8px",
					overflow: "hidden",
					border: "1px solid var(--border-color)",
					backgroundColor: "var(--bg-color)",
				}}
			>
				<iframe
					src={src}
					title={title}
					loading="lazy"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
					referrerPolicy="strict-origin-when-cross-origin"
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						border: 0,
					}}
				/>
			</div>
			<figcaption
				style={{
					fontSize: "14px",
					color: "var(--text-secondary)",
					textAlign: "center",
					marginTop: "8px",
				}}
			>
				{caption ?? title}
			</figcaption>
		</figure>
	);
}
