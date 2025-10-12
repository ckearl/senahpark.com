"use client";

import React from "react";

interface Insights {
	key_terms: string[];
	summary: string;
	main_ideas: string[];
	review_questions: string[];
}

interface InsightsPanelProps {
	insights: Insights | null | undefined;
}

export default function InsightsPanel({ insights }: InsightsPanelProps) {
	if (!insights) {
		return null;
	}

	return (
		<div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
			<h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Text Insights</h3>

			<div className="grid gap-4 md:gap-6">
				{/* Key Terms */}
				<div>
					<h4 className="text-sm md:text-base font-medium text-gray-900 mb-2">Key Terms</h4>
					<div className="flex flex-wrap gap-1.5 md:gap-2">
						{insights.key_terms.map((term, index) => (
							<span
								key={index}
								className="px-2 md:px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
							>
								{term}
							</span>
						))}
					</div>
				</div>

				{/* Summary */}
				<div>
					<h4 className="text-sm md:text-base font-medium text-gray-900 mb-2">Summary</h4>
					<p className="text-xs md:text-sm text-gray-700 leading-relaxed">
						{insights.summary}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
				{/* Main Ideas */}
				<div>
					<h4 className="text-sm md:text-base font-medium text-gray-900 mb-2">Main Ideas</h4>
					<ul className="space-y-1.5 md:space-y-1">
						{insights.main_ideas.map((idea, index) => (
							<li key={index} className="text-xs md:text-sm text-gray-700 flex items-start">
								<span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 md:mt-2 mr-2 flex-shrink-0" />
								{idea}
							</li>
						))}
					</ul>
				</div>

				{/* Review Questions */}
				<div>
					<h4 className="text-sm md:text-base font-medium text-gray-900 mb-2">
						Questions for Review
					</h4>
					<ul className="space-y-1.5 md:space-y-1">
						{insights.review_questions.map((question, index) => (
							<li key={index} className="text-xs md:text-sm text-gray-700 flex items-start">
								<span className="text-blue-600 mr-2 flex-shrink-0 text-xs md:text-sm">
									Q{index + 1}:
								</span>
								{question}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
