"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";

export default function EcommerceFeeClient() {
  const [platform, setPlatform] = useState<"shopee" | "lazada">("shopee");
  const [itemPriceStr, setItemPriceStr] = useState("1000");
  const [shippingFeeStr, setShippingFeeStr] = useState("50");
  
  const [isFss, setIsFss] = useState(false); // Free Shipping Special
  const [isCcb, setIsCcb] = useState(false); // Coins Cashback / Everyday Cashback

  const itemPrice = parseFloat(itemPriceStr) || 0;
  const shippingFee = parseFloat(shippingFeeStr) || 0;
  
  // Total amount paid by buyer (Item Price + Shipping)
  const totalOrderAmount = itemPrice + shippingFee;

  // 1. Transaction / Payment Fee (Standard across both is ~2.24% of Total Order Amount)
  const transactionFeeRate = 0.0224;
  const transactionFee = totalOrderAmount * transactionFeeRate;

  // 2. Commission Fee (Standard is around 4% - 5% of Item Price depending on category)
  // We'll use 5% as a conservative estimate for non-mall sellers.
  const commissionFeeRate = platform === "shopee" ? 0.05 : 0.045; // slightly different average structures
  const commissionFee = itemPrice * commissionFeeRate;

  // 3. Optional Program Fees (FSS & CCB) - applied to Item Price
  // Shopee FSS is typically ~5.6% (5% + VAT). Lazada Free Shipping Max is similar.
  const programFeeRate = (isFss ? 0.056 : 0) + (isCcb ? 0.0336 : 0);
  const programFee = itemPrice * programFeeRate;

  // Total Deductions
  const totalDeductions = transactionFee + commissionFee + programFee;
  
  // Net Payout (What the seller receives)
  // Net = Item Price - Total Deductions (Seller does not keep shipping fee, logistics takes it)
  const netPayout = itemPrice - totalDeductions;
  
  // Profit Margin percentage
  const profitMargin = itemPrice > 0 ? (netPayout / itemPrice) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(amount);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link href="/" style={{ fontSize: "14px", display: "inline-block", marginBottom: "16px" }}>&larr; Back to Tools</Link>
        <h1 className="page-title">Shopee & Lazada Seller Fee Calculator</h1>
        <p className="page-subtitle">Calculate exact deductions (Commission, Transaction, FSS/CCB) and find out your actual net payout per item.</p>
      </div>

      <AdBanner dataAdSlot="ecommerce-top" />

      <div className="tool-grid" style={{ marginTop: "24px" }}>
        {/* Input Card */}
        <div className="card" style={{ alignSelf: "start" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px" }}>Order Details</h2>
          
          <div className="form-group" style={{ marginBottom: "16px" }}>
            <label className="form-label">E-Commerce Platform</label>
            <div style={{ display: "flex", gap: "12px" }}>
              <button 
                className={`btn-secondary ${platform === "shopee" ? "active" : ""}`}
                style={{ flex: 1, backgroundColor: platform === "shopee" ? "#ff5722" : "", color: platform === "shopee" ? "white" : "" }}
                onClick={() => setPlatform("shopee")}
              >Shopee</button>
              <button 
                className={`btn-secondary ${platform === "lazada" ? "active" : ""}`}
                style={{ flex: 1, backgroundColor: platform === "lazada" ? "#0f136d" : "", color: platform === "lazada" ? "white" : "" }}
                onClick={() => setPlatform("lazada")}
              >Lazada</button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="itemPrice">Selling Price of Item (PHP)</label>
            <input 
              type="number" 
              id="itemPrice"
              className="form-control" 
              value={itemPriceStr}
              onChange={(e) => setItemPriceStr(e.target.value)}
              min="0"
            />
          </div>

          <div className="form-group" style={{ marginTop: "16px" }}>
            <label className="form-label" htmlFor="shippingFee">Shipping Fee paid by Buyer (PHP)</label>
            <input 
              type="number" 
              id="shippingFee"
              className="form-control" 
              value={shippingFeeStr}
              onChange={(e) => setShippingFeeStr(e.target.value)}
              min="0"
            />
            <p className="form-hint" style={{ marginTop: "4px" }}>Transaction fees apply to the entire order amount, including shipping.</p>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border-color)" }}>
            <label className="form-label">Opt-in Programs (Extra Deductions)</label>
            
            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", cursor: "pointer", fontSize: "14px" }}>
              <input 
                type="checkbox" 
                checked={isFss} 
                onChange={(e) => setIsFss(e.target.checked)} 
                style={{ width: "16px", height: "16px" }}
              />
              Joined Free Shipping Program (~5.6% Fee)
            </label>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", cursor: "pointer", fontSize: "14px" }}>
              <input 
                type="checkbox" 
                checked={isCcb} 
                onChange={(e) => setIsCcb(e.target.checked)} 
                style={{ width: "16px", height: "16px" }}
              />
              Joined Cashback Program (~3.36% Fee)
            </label>
          </div>
        </div>

        {/* Results Card */}
        <div className="card" style={{ backgroundColor: "var(--bg-color)" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "16px", borderBottom: "1px solid var(--border-color)", paddingBottom: "8px", color: "var(--primary)" }}>Payout Breakdown</h2>
          
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontSize: "14px" }}>
            <span>Item Price</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(itemPrice)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Transaction Fee (2.24%)</span>
            <span style={{ color: "var(--text-secondary)" }}>- {formatCurrency(transactionFee)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
            <span>Commission Fee (~{platform === "shopee" ? "5" : "4.5"}%)</span>
            <span style={{ color: "var(--text-secondary)" }}>- {formatCurrency(commissionFee)}</span>
          </div>

          {(isFss || isCcb) && (
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "14px" }}>
              <span>Program Fees (FSS/CCB)</span>
              <span style={{ color: "var(--text-secondary)" }}>- {formatCurrency(programFee)}</span>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px", paddingTop: "16px", borderTop: "2px solid var(--border-color)", fontSize: "20px", fontWeight: 700, color: "var(--text-primary)" }}>
            <span>Net Payout</span>
            <span style={{ color: "#1b5e20" }}>{formatCurrency(netPayout)}</span>
          </div>
          
          <div style={{ textAlign: "right", marginTop: "8px", fontSize: "14px", color: profitMargin > 0 ? "#2e7d32" : "#b71c1c" }}>
            {profitMargin > 0 ? "Margin: " : "Loss: "} {profitMargin.toFixed(1)}% of Item Price
          </div>
        </div>
      </div>

      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border-color)", color: "var(--text-primary)" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>How are Seller Fees Computed?</h2>
        <p style={{ marginBottom: "16px" }}>
          Selling online in the Philippines involves several layers of fees. If you don&apos;t price your products correctly, you might end up losing money.
        </p>
        <ul style={{ paddingLeft: "24px", marginBottom: "16px", lineHeight: "1.6" }}>
          <li><strong>Transaction Fee (2.24%):</strong> Charged by the payment gateways. This is applied to the <em>Total Order Amount</em> (Item Price + Shipping Fee). Yes, you pay a fee on the shipping cost!</li>
          <li><strong>Commission Fee (3% - 5%):</strong> Charged by Shopee/Lazada for using their platform. Rate varies by product category.</li>
          <li><strong>Program Fees (3% - 6%):</strong> If you join Free Shipping Special (FSS) or Coins Cashback (CCB), the platform takes an extra percentage from your item price.</li>
        </ul>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>
          Note: Fees are subject to 12% VAT (already factored into the 2.24% and 5.6% estimates above). Actual rates may slightly vary based on your seller tier (Mall, Preferred, or Non-Preferred) and category.
        </p>
      </div>
    </div>
  );
}
