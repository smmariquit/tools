export default function Logo({
	width = 32,
	height = 32,
	className,
}: {
	width?: number;
	height?: number;
	className?: string;
}) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<rect x="3" y="2" width="18" height="20" rx="4" fill="var(--primary)" />
			<rect x="6" y="5" width="12" height="6" rx="1" fill="white" />
			<circle cx="8" cy="15" r="1.5" fill="white" />
			<circle cx="12" cy="15" r="1.5" fill="white" />
			<circle cx="16" cy="15" r="1.5" fill="white" />
			<circle cx="8" cy="19" r="1.5" fill="white" />
			<circle cx="12" cy="19" r="1.5" fill="white" />
			<circle cx="16" cy="19" r="1.5" fill="white" />
		</svg>
	);
}
