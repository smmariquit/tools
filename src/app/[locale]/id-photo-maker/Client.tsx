"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import BackButton from "../../components/BackButton";
import ToolEyebrow from "../../components/doodle/ToolEyebrow";
import ToolIllustration from "../../components/illustrations/ToolIllustration";
import AdBanner from "../components/AdBanner";
import ToolLayout from "../components/ToolLayout";

const dimensions = {
	"2x2": { width: 600, height: 600, label: "2x2 Inches" },
	"1x1": { width: 300, height: 300, label: "1x1 Inch" },
	passport: { width: 413, height: 531, label: "Passport (35x45mm)" },
};

type PhotoSize = keyof typeof dimensions;

export default function IDPhotoMaker() {
	const t = useTranslations("IDPhotoMaker");
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
			alert(t("alertRemoveBgFailed"));
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
		<ToolLayout maxWidth="1200px">
			<div style={{ width: "100%", margin: "0 auto", paddingBottom: "40px" }}>
				<div style={{ marginBottom: "24px" }}>
					<BackButton style={{ marginBottom: "16px" }}>
						{t("backToAllTools")}
					</BackButton>
					<ToolIllustration />
					<ToolEyebrow />
					<h1 className="page-title">{t("title")}</h1>
					<p className="page-subtitle">{t("subtitle")}</p>
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
							{t("settings")}
						</h2>

						<div className="form-group">
							<label className="form-label" htmlFor="photoSize">
								{t("selectSize")}
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
								<option value="2x2">{t("size2x2")}</option>
								<option value="1x1">{t("size1x1")}</option>
								<option value="passport">{t("sizePassport")}</option>
							</select>
						</div>

						<div className="form-group" style={{ marginTop: "24px" }}>
							<label className="form-label" htmlFor="photoUpload">
								{t("uploadPhoto")}
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
									<span style={{ fontSize: "20px" }}></span>
									{t("uploadPhoto")}
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
									<span style={{ fontSize: "20px" }}></span>
									{t("takePhoto")}
								</button>
							</div>
							<p
								className="form-hint"
								style={{ marginTop: "8px", marginBottom: "16px" }}
							>
								{t("tip")}
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
									{isRemovingBg ? t("removingBg") : t("removeBg")}
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
							{t("previewDownload")}
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
									{t("noImage")}
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
							{t("downloadBtn")}
						</button>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
