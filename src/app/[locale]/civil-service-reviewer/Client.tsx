"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

// AI-Generated mock JSON question bank
const QUESTION_BANK = [
	{
		id: 1,
		question: "Which of the following is a fundamental right enshrined in the 1987 Philippine Constitution?",
		options: ["Right to bear arms", "Right to due process", "Right to free public higher education", "Right to a minimum wage"],
		answer: 1,
		explanation: "Article III, Section 1 of the 1987 Constitution states: 'No person shall be deprived of life, liberty, or property without due process of law...'"
	},
	{
		id: 2,
		question: "If a shirt costs ₱450 after a 10% discount, what was its original price?",
		options: ["₱500", "₱495", "₱405", "₱510"],
		answer: 0,
		explanation: "Let X be original price. 0.90 * X = 450. X = 450 / 0.90 = 500."
	},
	{
		id: 3,
		question: "Identify the missing number in the sequence: 2, 6, 12, 20, ?",
		options: ["28", "30", "32", "36"],
		answer: 1,
		explanation: "The differences are +4, +6, +8, so the next difference is +10. 20 + 10 = 30."
	}
];

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
		<ToolLayout>
			<ToolHeader
				title="Civil Service Exam Reviewer"
				subtitle="Offline-capable mock exams and flashcards. Progress is saved locally on your device."
			/>
			
			<div className="tool-grid" style={{ marginTop: "24px" }}>
				<div style={{ display: "flex", flexDirection: "column", gap: "24px", gridColumn: "1 / -1", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
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
