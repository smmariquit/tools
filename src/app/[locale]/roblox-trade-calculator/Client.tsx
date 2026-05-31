"use client";

import { useState } from "react";
import ToolHeader from "../components/ToolHeader";
import ToolLayout from "../components/ToolLayout";

interface TradeItem {
	id: string;
	name: string;
	rarity:
		| "common"
		| "uncommon"
		| "rare"
		| "ultra_rare"
		| "legendary"
		| "mythical";
}

const RARITY_VALUES = {
	common: 1,
	uncommon: 3,
	rare: 10,
	ultra_rare: 30,
	legendary: 100,
	mythical: 500,
};

const RARITY_LABELS = {
	common: "Common (1 pt)",
	uncommon: "Uncommon (3 pts)",
	rare: "Rare (10 pts)",
	ultra_rare: "Ultra-Rare (30 pts)",
	legendary: "Legendary (100 pts)",
	mythical: "Mythical/High-Tier (500 pts)",
};

export default function RobloxTradeClient() {
	const [myItems, setMyItems] = useState<TradeItem[]>([
		{ id: "1", name: "Frost Dragon", rarity: "legendary" },
	]);
	const [theirItems, setTheirItems] = useState<TradeItem[]>([
		{ id: "2", name: "Mega Neon Dog", rarity: "rare" },
		{ id: "3", name: "Ride Potion", rarity: "ultra_rare" },
	]);

	const [newItemName, setNewItemName] = useState("");
	const [newItemRarity, setNewItemRarity] =
		useState<keyof typeof RARITY_VALUES>("common");

	const handleAddItem = (side: "me" | "them") => {
		const nameToUse =
			newItemName.trim() ||
			`Item (${RARITY_LABELS[newItemRarity].split(" ")[0]})`;
		const newItem: TradeItem = {
			id: Date.now().toString() + Math.random().toString(),
			name: nameToUse,
			rarity: newItemRarity,
		};

		if (side === "me") {
			setMyItems([...myItems, newItem]);
		} else {
			setTheirItems([...theirItems, newItem]);
		}

		setNewItemName("");
	};

	const handleRemoveItem = (side: "me" | "them", id: string) => {
		if (side === "me") {
			setMyItems(myItems.filter((i) => i.id !== id));
		} else {
			setTheirItems(theirItems.filter((i) => i.id !== id));
		}
	};

	// Sum scores
	const myTotal = myItems.reduce(
		(acc, curr) => acc + RARITY_VALUES[curr.rarity],
		0,
	);
	const theirTotal = theirItems.reduce(
		(acc, curr) => acc + RARITY_VALUES[curr.rarity],
		0,
	);

	// Math logic for Trade evaluation
	let fairness = "Fair";
	let symbol = "🤝";
	let detailText =
		"This is a perfectly balanced trade. Both sides are exchanging equal value.";
	let outcomeColor = "var(--primary)";

	if (myTotal === 0 && theirTotal === 0) {
		fairness = "Empty Trade";
		symbol = "❓";
		detailText =
			"Add items to both columns to start evaluating the trade fairness.";
		outcomeColor = "var(--text-secondary)";
	} else {
		const diffPct = ((theirTotal - myTotal) / Math.max(1, myTotal)) * 100;

		if (Math.abs(diffPct) <= 10) {
			fairness = "Fair Trade";
			symbol = "🤝";
			detailText =
				"The trade is highly fair. Point difference is within 10%. Go for it!";
			outcomeColor = "#10b981"; // green
		} else if (diffPct > 10) {
			fairness = "Big Win (W)";
			symbol = "🎉";
			detailText = `You are getting ${diffPct.toFixed(0)}% more value than what you are giving away. This is an awesome deal for you!`;
			outcomeColor = "#10b981"; // green
		} else {
			fairness = "Big Loss (L)";
			symbol = "❌";
			detailText = `You are overpaying by ${Math.abs(diffPct).toFixed(0)}%. You should ask them to add more items to make it fair.`;
			outcomeColor = "#ef4444"; // red
		}
	}

	return (
		<ToolLayout>
			<ToolHeader
				title="Roblox Trading Fairness Calculator"
				subtitle="Evaluate trades for games like Adopt Me! or Blox Fruits. Add items, calculate absolute score ratios, and find out if a trade is a Win, Loss, or Fair."
			/>

			{/* Form inputs for new item builder */}
			<div className="card" style={{ marginTop: "24px", marginBottom: "24px" }}>
				<h2
					style={{
						fontSize: "18px",
						marginBottom: "16px",
						color: "var(--primary)",
					}}
				>
					Item Creator
				</h2>

				<div
					style={{
						display: "grid",
						gridTemplateColumns: "2fr 2fr 1fr 1fr",
						gap: "16px",
						alignItems: "end",
					}}
				>
					<div className="form-group" style={{ marginBottom: 0 }}>
						<label htmlFor="new-item-name" className="form-label">
							Item Nickname (Optional)
						</label>
						<input
							id="new-item-name"
							type="text"
							placeholder="E.g. Neon Unicorn"
							className="form-control"
							value={newItemName}
							onChange={(e) => setNewItemName(e.target.value)}
						/>
					</div>

					<div className="form-group" style={{ marginBottom: 0 }}>
						<label htmlFor="new-item-rarity" className="form-label">
							Rarity Tier / Points Value
						</label>
						<select
							id="new-item-rarity"
							className="form-control"
							value={newItemRarity}
							onChange={(e) =>
								setNewItemRarity(e.target.value as keyof typeof RARITY_VALUES)
							}
						>
							{Object.entries(RARITY_LABELS).map(([key, value]) => (
								<option key={key} value={key}>
									{value}
								</option>
							))}
						</select>
					</div>

					<button
						type="button"
						className="btn-primary"
						onClick={() => handleAddItem("me")}
						style={{ width: "100%", whiteSpace: "nowrap" }}
					>
						➕ Add to Mine
					</button>

					<button
						type="button"
						className="btn-secondary"
						onClick={() => handleAddItem("them")}
						style={{ width: "100%", whiteSpace: "nowrap" }}
					>
						➕ Add to Theirs
					</button>
				</div>
			</div>

			<div className="tool-grid-even">
				{/* My Side Card */}
				<div className="card">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<h2 style={{ fontSize: "20px", color: "var(--text-primary)" }}>
							Your Offer
						</h2>
						<span
							style={{
								padding: "4px 8px",
								backgroundColor: "rgba(13, 71, 161, 0.1)",
								color: "var(--primary)",
								borderRadius: "4px",
								fontSize: "14px",
								fontWeight: "bold",
							}}
						>
							{myTotal} Points
						</span>
					</div>

					{myItems.length === 0 ? (
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								fontStyle: "italic",
								textAlign: "center",
								padding: "32px 0",
							}}
						>
							No items added. Click above to add items to your side.
						</p>
					) : (
						<ul
							style={{
								listStyle: "none",
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							{myItems.map((item) => (
								<li
									key={item.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "10px 12px",
										backgroundColor: "var(--bg-color)",
										border: "1px solid var(--border-color)",
										borderRadius: "6px",
										fontSize: "14px",
									}}
								>
									<div>
										<strong>{item.name}</strong>
										<span
											style={{
												fontSize: "11px",
												color: "var(--text-secondary)",
												display: "block",
											}}
										>
											Rarity: {item.rarity.replace("_", " ")} (
											{RARITY_VALUES[item.rarity]} pts)
										</span>
									</div>
									<button
										type="button"
										onClick={() => handleRemoveItem("me", item.id)}
										style={{
											background: "transparent",
											border: "none",
											color: "#ef4444",
											fontSize: "16px",
											cursor: "pointer",
										}}
									>
										🗑️
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Their Side Card */}
				<div className="card">
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							marginBottom: "16px",
						}}
					>
						<h2 style={{ fontSize: "20px", color: "var(--text-primary)" }}>
							Their Offer
						</h2>
						<span
							style={{
								padding: "4px 8px",
								backgroundColor: "rgba(13, 71, 161, 0.1)",
								color: "var(--primary)",
								borderRadius: "4px",
								fontSize: "14px",
								fontWeight: "bold",
							}}
						>
							{theirTotal} Points
						</span>
					</div>

					{theirItems.length === 0 ? (
						<p
							style={{
								fontSize: "14px",
								color: "var(--text-secondary)",
								fontStyle: "italic",
								textAlign: "center",
								padding: "32px 0",
							}}
						>
							No items added. Click above to add items to their side.
						</p>
					) : (
						<ul
							style={{
								listStyle: "none",
								display: "flex",
								flexDirection: "column",
								gap: "8px",
							}}
						>
							{theirItems.map((item) => (
								<li
									key={item.id}
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										padding: "10px 12px",
										backgroundColor: "var(--bg-color)",
										border: "1px solid var(--border-color)",
										borderRadius: "6px",
										fontSize: "14px",
									}}
								>
									<div>
										<strong>{item.name}</strong>
										<span
											style={{
												fontSize: "11px",
												color: "var(--text-secondary)",
												display: "block",
											}}
										>
											Rarity: {item.rarity.replace("_", " ")} (
											{RARITY_VALUES[item.rarity]} pts)
										</span>
									</div>
									<button
										type="button"
										onClick={() => handleRemoveItem("them", item.id)}
										style={{
											background: "transparent",
											border: "none",
											color: "#ef4444",
											fontSize: "16px",
											cursor: "pointer",
										}}
									>
										🗑️
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{/* Bottom outcome result box */}
			<div
				className="card"
				style={{
					marginTop: "24px",
					borderLeft: `6px solid ${outcomeColor}`,
					backgroundColor: "var(--surface-color)",
				}}
			>
				<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
					<span style={{ fontSize: "40px" }}>{symbol}</span>
					<div>
						<h3
							style={{ fontSize: "22px", color: outcomeColor, fontWeight: 700 }}
						>
							Trade Outcome: {fairness}
						</h3>
						<p
							style={{
								fontSize: "15px",
								color: "var(--text-secondary)",
								marginTop: "4px",
							}}
						>
							{detailText}
						</p>
					</div>
				</div>
			</div>
		</ToolLayout>
	);
}
