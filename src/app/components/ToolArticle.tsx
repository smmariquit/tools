import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug } from "../../lib/mdx";
import AuthorBio from "./AuthorBio";
import AdBanner from "../../app/[locale]/components/AdBanner";
import Link from "next/link";
import React from "react";

export default function ToolArticle({ slug }: { slug: string }) {
    if (!slug) return null;
    try {
        const { content } = getPostBySlug(slug);

        const faqRegex = /###\s+(.+?)\n([^#]+)/g;
        let match;
        const faqEntities = [];
        
        while ((match = faqRegex.exec(content)) !== null) {
            const question = match[1].trim();
            const answer = match[2].trim();
            if (question && answer) {
                faqEntities.push({
                    "@type": "Question",
                    "name": question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            }
        }

        const faqSchema = faqEntities.length > 0 ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqEntities
        } : null;

        const components = {
            AdBanner: (props: any) => <AdBanner {...props} />,
            ToolEmbed: () => null,
            h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <h2
                    style={{
                        fontSize: "24px",
                        color: "var(--primary)",
                        marginTop: "48px",
                        marginBottom: "20px",
                        fontWeight: 700,
                        borderBottom: "1px solid var(--border-color)",
                        paddingBottom: "8px",
                    }}
                    {...props}
                />
            ),
            h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
                <h3
                    style={{
                        fontSize: "20px",
                        marginTop: "32px",
                        marginBottom: "16px",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                    }}
                    {...props}
                />
            ),
            p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
                <p
                    style={{
                        lineHeight: "1.8",
                        marginBottom: "20px",
                        color: "var(--text-primary)",
                        fontSize: "16px",
                    }}
                    {...props}
                />
            ),
            ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
                <ul
                    style={{
                        paddingLeft: "24px",
                        marginBottom: "24px",
                        lineHeight: "1.8",
                        fontSize: "16px",
                        color: "var(--text-primary)",
                    }}
                    {...props}
                />
            ),
            ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
                <ol
                    style={{
                        paddingLeft: "24px",
                        marginBottom: "24px",
                        lineHeight: "1.8",
                        fontSize: "16px",
                        color: "var(--text-primary)",
                    }}
                    {...props}
                />
            ),
            li: (props: React.HTMLAttributes<HTMLLIElement>) => (
                <li style={{ marginBottom: "10px" }} {...props} />
            ),
            a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
                <a
                    style={{
                        color: "var(--primary)",
                        textDecoration: "underline",
                        fontWeight: 500,
                    }}
                    {...props}
                />
            ),
            strong: (props: React.HTMLAttributes<HTMLElement>) => (
                <strong style={{ fontWeight: 700, color: "var(--text-primary)" }} {...props} />
            ),
            blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
                <blockquote
                    style={{
                        borderLeft: "4px solid var(--primary)",
                        paddingLeft: "16px",
                        marginLeft: "0",
                        marginRight: "0",
                        fontStyle: "italic",
                        backgroundColor: "var(--surface-color)",
                        padding: "16px",
                        borderRadius: "0 8px 8px 0",
                    }}
                    {...props}
                />
            ),
        };

        return (
            <div 
                style={{ 
                    maxWidth: "1000px", 
                    margin: "48px auto", 
                    padding: "0 16px" 
                }}
            >
                <div 
                    style={{ 
                        padding: "40px", 
                        backgroundColor: "var(--surface-color)", 
                        borderRadius: "16px", 
                        border: "1px solid var(--border-color)", 
                        boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                    }}
                >
                    <div style={{ marginBottom: "32px", textAlign: "center" }}>
                        <h2 
                            style={{ 
                                fontSize: "32px", 
                                fontWeight: 800,
                                marginBottom: "12px", 
                                color: "var(--text-primary)",
                                letterSpacing: "-0.5px"
                            }}
                        >
                            Comprehensive Guide & Methodology
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "16px", maxWidth: "600px", margin: "0 auto" }}>
                            Read the complete guide to understand the formulas, legal basis, and rules applied in the calculator above.
                        </p>
                    </div>
                    
                    {faqSchema && (
                        <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                        />
                    )}
                    <AuthorBio />
                    <div className="mdx-content">
                        <MDXRemote source={content} components={components} />
                    </div>
                </div>
            </div>
        );
    } catch(e) {
        return null;
    }
}
