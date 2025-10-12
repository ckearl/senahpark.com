"use client";

import React, { useEffect } from "react";
import { X, Keyboard } from "lucide-react";

interface KeyboardShortcutsModalProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function KeyboardShortcutsModal({
	isOpen,
	onClose,
}: KeyboardShortcutsModalProps) {
	// Close modal on Escape key
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onClose();
			}
		};

		window.addEventListener("keydown", handleEscape);
		return () => window.removeEventListener("keydown", handleEscape);
	}, [isOpen, onClose]);

	// Prevent body scroll when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const shortcuts = [
		{
			category: "Playback",
			items: [
				{ key: "Space", description: "Play / Pause", visual: "Space" },
				{ key: "K", description: "Play / Pause (alternate)", visual: "K" },
				{ key: "M", description: "Mute / Unmute", visual: "M" },
			],
		},
		{
			category: "Navigation",
			items: [
				{ key: "→", description: "Skip forward 10 seconds", visual: "→" },
				{ key: "←", description: "Skip backward 10 seconds", visual: "←" },
				{ key: "↑", description: "Skip forward 30 seconds", visual: "↑" },
				{ key: "↓", description: "Skip backward 30 seconds", visual: "↓" },
				{ key: "J", description: "Rewind 10 seconds", visual: "J" },
				{ key: "L", description: "Forward 10 seconds", visual: "L" },
				{ key: ",", description: "Previous frame (pauses)", visual: "," },
				{ key: ".", description: "Next frame (pauses)", visual: "." },
				{ key: "0-9", description: "Jump to 0%, 10%... 90%", visual: "0-9" },
			],
		},
		{
			category: "Interface",
			items: [
				{ key: "F", description: "Toggle transcript search", visual: "F" },
				{ key: "?", description: "Show keyboard shortcuts", visual: "?" },
			],
		},
	];

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black bg-opacity-20 z-50 animate-fade-in"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
				<div
					className="bg-white rounded-xl shadow-2xl max-w-lg w-full pointer-events-auto animate-scale-in"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200">
						<div className="flex items-center space-x-3">
							<div className="p-2 bg-blue-100 rounded-lg">
								<Keyboard className="w-5 h-5 text-blue-600" />
							</div>
							<h2 className="text-xl font-bold text-gray-900">
								Keyboard Shortcuts
							</h2>
						</div>
						<button
							onClick={onClose}
							className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
							title="Close"
						>
							<X className="w-5 h-5" />
						</button>
					</div>

					{/* Content */}
					<div className="p-6 max-h-[60vh] overflow-y-auto">
						<div className="space-y-6">
							{shortcuts.map((section, sectionIndex) => (
								<div key={sectionIndex}>
									<h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
										{section.category}
									</h3>
									<div className="space-y-2">
										{section.items.map((shortcut, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
											>
												<span className="text-sm text-gray-700">
													{shortcut.description}
												</span>
												<kbd className="px-3 py-1.5 text-sm font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg shadow-sm min-w-[3rem] text-center">
													{shortcut.visual}
												</kbd>
											</div>
										))}
									</div>
								</div>
							))}
						</div>

						<div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
							<p className="text-sm text-blue-800">
								<span className="font-semibold">Tip:</span> Keyboard shortcuts
								won&apos;t work when typing in a text field.
							</p>
						</div>
					</div>

					{/* Footer */}
					<div className="px-6 py-4 bg-gray-50 rounded-b-xl border-t border-gray-200">
						<button
							onClick={onClose}
							className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
						>
							Got it!
						</button>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}

				@keyframes scale-in {
					from {
						opacity: 0;
						transform: scale(0.95);
					}
					to {
						opacity: 1;
						transform: scale(1);
					}
				}

				.animate-fade-in {
					animation: fade-in 0.2s ease-out;
				}

				.animate-scale-in {
					animation: scale-in 0.2s ease-out;
				}
			`}</style>
		</>
	);
}
