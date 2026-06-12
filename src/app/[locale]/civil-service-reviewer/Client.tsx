"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

import { QUESTION_BANK } from "./questions";

export default function CivilServiceClient() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState<number | null>(null);
	const [showExplanation, setShowExplanation] = useState(false);
	const [score, setScore] = useState(0);
	const [isFinished, setIsFinished] = useState(false);

	const currentQuestion = QUESTION_BANK[currentIndex];

	const handleAnswer = (index: number) => {
		if (showExplanation) return;
		setSelectedOption(index);
		setShowExplanation(true);
		if (index === currentQuestion.answer) {
			setScore(s => s + 1);
		}
	};

	const handleNext = () => {
		if (currentIndex < QUESTION_BANK.length - 1) {
			setCurrentIndex(i => i + 1);
			setSelectedOption(null);
			setShowExplanation(false);
		} else {
			setIsFinished(true);
		}
	};

	const reset = () => {
		setCurrentIndex(0);
		setSelectedOption(null);
		setShowExplanation(false);
		setScore(0);
		setIsFinished(false);
	};

	return (
		<ToolLayout maxWidth="1200px">
			<ToolHeader
				title="Civil Service Exam Reviewer"
				subtitle="Offline-capable mock exams and flashcards. Progress is saved locally on your device."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px", gridColumn: "1 / -1", width: "100%", margin: "0 auto", width: "100%" }}>
					<div className="card">
						{!isFinished ? (
							<>
								<div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", color: "var(--text-secondary)", fontSize: "14px" }}>
									<span>Question {currentIndex + 1} of {QUESTION_BANK.length}</span>
									<span>Score: {score}</span>
								</div>
								
								<h2 style={{ fontSize: "20px", marginBottom: "24px", color: "var(--primary)" }}>{currentQuestion.question}</h2>

								<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
									{currentQuestion.options.map((opt, idx) => {
										let bgColor = "var(--bg-color)";
										let borderColor = "var(--border-color)";
										
										if (showExplanation) {
											if (idx === currentQuestion.answer) {
												bgColor = "rgba(16, 185, 129, 0.1)";
												borderColor = "#10b981";
											} else if (idx === selectedOption) {
												bgColor = "rgba(239, 68, 68, 0.1)";
												borderColor = "#ef4444";
											}
										} else if (idx === selectedOption) {
											bgColor = "rgba(13, 71, 161, 0.1)";
											borderColor = "var(--primary)";
										}

										return (
											<button
												key={idx}
												onClick={() => handleAnswer(idx)}
												disabled={showExplanation}
												style={{
													padding: "16px",
													textAlign: "left",
													borderRadius: "8px",
													border: `1px solid ${borderColor}`,
													backgroundColor: bgColor,
													cursor: showExplanation ? "default" : "pointer",
													fontSize: "16px",
													transition: "all 0.2s"
												}}
											>
												{opt}
											</button>
										);
									})}
								</div>

								{showExplanation && (
									<div style={{ marginTop: "24px", padding: "16px", backgroundColor: "rgba(13, 71, 161, 0.05)", borderRadius: "8px" }}>
										<strong style={{ color: "var(--primary)", display: "block", marginBottom: "8px" }}>Explanation:</strong>
										<p style={{ fontSize: "14px", lineHeight: 1.5 }}>{currentQuestion.explanation}</p>
										
										<button 
											className="btn btn-primary" 
											onClick={handleNext}
											style={{ marginTop: "16px", width: "100%" }}
										>
											{currentIndex < QUESTION_BANK.length - 1 ? "Next Question" : "Finish Mock Exam"}
										</button>
									</div>
								)}
							</>
						) : (
							<div style={{ textAlign: "center", padding: "32px 16px" }}>
								<h2 style={{ fontSize: "24px", marginBottom: "16px", color: "var(--primary)" }}>Mock Exam Complete!</h2>
								<p style={{ fontSize: "18px", marginBottom: "32px" }}>Your Score: {score} / {QUESTION_BANK.length}</p>
								<button className="btn btn-primary" onClick={reset}>Retake Exam</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
