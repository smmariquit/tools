"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

const dimensions = {
	"2x2": { width: 600, height: 600, label: "2x2 Inches" },
	"1x1": { width: 300, height: 300, label: "1x1 Inch" },
	passport: { width: 413, height: 531, label: "Passport (35x45mm)" },
};

type PhotoSize = keyof typeof dimensions;

export default function IDPhotoMaker() {
	const [size, setSize] = useState<PhotoSize>("2x2");
	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [originalImageSrc, setOriginalImageSrc] = useState<string | null>(null);
	const [isRemovingBg, setIsRemovingBg] = useState(false);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const cameraInputRef = useRef<HTMLInputElement>(null);

	const handleRemoveBg = async () => {
		if (!originalImageSrc) return;
		setIsRemovingBg(true);
		try {
			// Dynamically import to avoid SSR issues
			const { removeBackground } = await import("@imgly/background-removal");
			const imageBlob = await removeBackground(originalImageSrc);
			const url = URL.createObjectURL(imageBlob);
			setImageSrc(url);
		} catch (error) {
			console.error("Failed to remove background:", error);
			alert("Failed to remove background. Please try a different photo.");
		} finally {
			setIsRemovingBg(false);
		}
	};

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			setImageSrc(event.target?.result as string);
			setOriginalImageSrc(event.target?.result as string);
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		const drawCanvas = () => {
			if (!imageSrc || !canvasRef.current) return;

			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (!ctx) return;

			const img = new Image();
			img.onload = () => {
				const { width, height } = dimensions[size];
				canvas.width = width;
				canvas.height = height;

				// Calculate center crop
				const scale = Math.max(width / img.width, height / img.height);
				const scaledWidth = img.width * scale;
				const scaledHeight = img.height * scale;
				const dx = (width - scaledWidth) / 2;
				const dy = (height - scaledHeight) / 2;

				// Draw white background
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, width, height);

				// Draw image
				ctx.drawImage(img, dx, dy, scaledWidth, scaledHeight);
			};
			img.src = imageSrc;
		};

		drawCanvas();
	}, [imageSrc, size]);

	const handleDownload = () => {
		if (!canvasRef.current || !imageSrc) return;
		const link = document.createElement("a");
		link.download = `ph-id-photo-${size}.jpg`;
		link.href = canvasRef.current.toDataURL("image/jpeg", 1.0);
		link.click();
	};

	return (
		<ToolLayout>
			<div
				style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "40px" }}
			>
				<div style={{ marginBottom: "24px" }}>
					<Link
						href="/"
						style={{
							fontSize: "14px",
							display: "inline-block",
							marginBottom: "16px",
						}}
					>
						&larr; Back to All Tools
					</Link>
					<h1 className="page-title">Free ID Photo Maker</h1>
					<p className="page-subtitle">
						Crop your selfies into standard Philippine 2x2, 1x1, or Passport
						sizes instantly.
					</p>
				</div>

				<AdBanner dataAdSlot="5555555555" />

				<div className="tool-grid-even" style={{ marginTop: "24px" }}>
					{/* Controls */}
					<div className="card">
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
							}}
						>
							Settings
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="photoSize">
								Select Size
							</label>
							<select
								id="photoSize"
								className="form-control"
								value={size}
								onChange={(e) => setSize(e.target.value as PhotoSize)}
								style={{
									backgroundColor: "var(--surface-color)",
									cursor: "pointer",
								}}
							>
								<option value="2x2">2x2 Inches (600x600px)</option>
								<option value="1x1">1x1 Inch (300x300px)</option>
								<option value="passport">Philippine Passport (35x45mm)</option>
							</select>
						</div>

						<div className="form-group" style={{ marginTop: "24px" }}>
							<label className="form-label" htmlFor="photoUpload">
								Upload Photo
							</label>
							<input
								id="photoUpload"
								type="file"
								accept="image/*"
								ref={fileInputRef}
								onChange={handleImageUpload}
								style={{ display: "none" }}
							/>
							<input
								id="cameraUpload"
								type="file"
								accept="image/*"
								capture="user"
								ref={cameraInputRef}
								onChange={handleImageUpload}
								style={{ display: "none" }}
							/>
							<div style={{ display: "flex", gap: "8px", width: "100%" }}>
								<button
									className="btn-secondary"
									style={{
										flex: 1,
										padding: "16px",
										fontSize: "14px",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "4px",
									}}
									onClick={() => fileInputRef.current?.click()}
								>
									<span style={{ fontSize: "20px" }}>📁</span>
									Upload Photo
								</button>
								<button
									className="btn-secondary"
									style={{
										flex: 1,
										padding: "16px",
										fontSize: "14px",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "4px",
									}}
									onClick={() => cameraInputRef.current?.click()}
								>
									<span style={{ fontSize: "20px" }}>📷</span>
									Take Photo
								</button>
							</div>
							<p
								className="form-hint"
								style={{ marginTop: "8px", marginBottom: "16px" }}
							>
								Tip: Use a photo with a plain, well-lit background.
							</p>

							{imageSrc && (
								<button
									className="btn-secondary"
									style={{
										width: "100%",
										padding: "12px",
										border: "1px solid var(--primary)",
										color: "var(--primary)",
									}}
									onClick={handleRemoveBg}
									disabled={isRemovingBg}
								>
									{isRemovingBg
										? "✨ Removing Background (Please wait)..."
										: "✨ Remove Background (AI)"}
								</button>
							)}
						</div>
					</div>

					{/* Preview */}
					<div
						className="card"
						style={{
							backgroundColor: "var(--bg-color)",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h2
							style={{
								fontSize: "18px",
								marginBottom: "16px",
								borderBottom: "1px solid var(--border-color)",
								paddingBottom: "8px",
								width: "100%",
								color: "var(--primary)",
							}}
						>
							Preview & Download
						</h2>

						<div
							style={{
								flex: 1,
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								minHeight: "300px",
								width: "100%",
								backgroundColor: "#e8eaed",
								borderRadius: "var(--border-radius-sm)",
								overflow: "hidden",
								position: "relative",
							}}
						>
							{!imageSrc ? (
								<span
									style={{ color: "var(--text-secondary)", fontSize: "14px" }}
								>
									No image uploaded
								</span>
							) : (
								<canvas
									ref={canvasRef}
									style={{
										maxWidth: "100%",
										maxHeight: "300px",
										objectFit: "contain",
										boxShadow: "var(--shadow-sm)",
									}}
								/>
							)}
						</div>

						<button
							className="btn-primary"
							style={{ width: "100%", marginTop: "16px" }}
							disabled={!imageSrc}
							onClick={handleDownload}
						>
							Download Ready-to-Print Image
						</button>
					</div>
				</div>

				{/* SEO Content */}
				<div
					style={{
						marginTop: "48px",
						paddingTop: "32px",
						borderTop: "1px solid var(--border-color)",
						color: "var(--text-primary)",
					}}
				>
					<h2 style={{ fontSize: "24px", marginBottom: "16px" }}>
						Official DFA Passport Photo Guidelines
					</h2>
					<p style={{ marginBottom: "16px" }}>
						To ensure your passport application is not rejected by the
						Department of Foreign Affairs (DFA), please follow these official
						image guidelines when taking your photo:
					</p>
					<ul
						style={{
							paddingLeft: "24px",
							marginBottom: "16px",
							lineHeight: "1.6",
						}}
					>
						<li>
							<strong>Size and Quality:</strong> Photo must be exactly 4.5 cm x
							3.5 cm in size. It must be high resolution, not pixelated, and
							printed on high-quality photo paper.
						</li>
						<li>
							<strong>Background:</strong> The background must be completely{" "}
							<strong>plain white</strong>. There should be no shadows,
							patterns, or other objects visible.
						</li>
						<li>
							<strong>Pose and Expression:</strong> Keep a neutral facial
							expression with both eyes open and mouth closed (no smiling or
							teeth showing). Look straight into the camera showing your full
							face and both ears.
						</li>
						<li>
							<strong>Attire:</strong> Wear decent attire with a collar (e.g.,
							polo shirt, collared blouse). Sleeveless shirts, plunge necklines,
							or spaghetti straps are strictly prohibited.
						</li>
						<li>
							<strong>Accessories:</strong> You must remove eyeglasses, contact
							lenses, earrings, necklaces, and heavy makeup. Head coverings are
							only allowed for religious or medical reasons, but must not cover
							the face.
						</li>
					</ul>
					<p
						style={{
							marginBottom: "24px",
							fontSize: "14px",
						}}
					>
						<em>
							Source:{" "}
							<a
								href="https://dfa-oca.ph/passport/passport-requirements/acceptable-ids-for-passport-application/"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: "var(--primary)" }}
							>
								DFA Consular Affairs - Passport Requirements
							</a>
						</em>
					</p>
					<p
						style={{
							marginBottom: "16px",
							color: "var(--text-secondary)",
							fontSize: "14px",
						}}
					>
						<em>
							Privacy Note: This tool auto-centers and crops your photo to exact
							pixel dimensions at 300 DPI, perfect for printing. All processing
							(including AI background removal) happens locally on your device;
							we do not upload or store your photos.
						</em>
					</p>
				</div>
			</div>
		</ToolLayout>
	);
}
