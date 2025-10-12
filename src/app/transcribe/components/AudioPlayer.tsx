"use client";

import React, { useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const formatTime = (seconds: number): string => {
	const mins = Math.floor(seconds / 60);
	const secs = Math.floor(seconds % 60);
	return `${mins}:${secs.toString().padStart(2, "0")}`;
};

interface AudioPlayerProps {
	audioUrl: string;
	currentTime: number;
	duration: number;
	isPlaying: boolean;
	volume: number;
	showSkipPopover: { type: "forward" | "backward" | null; show: boolean };
	onTimeUpdate: (time: number) => void;
	onDurationChange: (duration: number) => void;
	onPlayStateChange: (isPlaying: boolean) => void;
	onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
	onSkip: (seconds: number) => void;
	onVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onTogglePlayPause: () => void;
}

export default function AudioPlayer({
	audioUrl,
	currentTime,
	duration,
	isPlaying,
	volume,
	showSkipPopover,
	onTimeUpdate,
	onDurationChange,
	onPlayStateChange,
	onSeek,
	onSkip,
	onVolumeChange,
	onTogglePlayPause,
}: AudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	// Audio event handlers
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		const handleTimeUpdate = () => onTimeUpdate(audio.currentTime);
		const handleLoadedMetadata = () => onDurationChange(audio.duration);
		const handlePlay = () => onPlayStateChange(true);
		const handlePause = () => onPlayStateChange(false);

		audio.addEventListener("timeupdate", handleTimeUpdate);
		audio.addEventListener("loadedmetadata", handleLoadedMetadata);
		audio.addEventListener("play", handlePlay);
		audio.addEventListener("pause", handlePause);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
			audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
			audio.removeEventListener("play", handlePlay);
			audio.removeEventListener("pause", handlePause);
		};
	}, [onTimeUpdate, onDurationChange, onPlayStateChange]);

	// Set audio URL
	useEffect(() => {
		if (audioUrl && audioRef.current) {
			audioRef.current.src = audioUrl;
			audioRef.current.load();
		}
	}, [audioUrl]);

	// Update audio volume
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.volume = volume;
		}
	}, [volume]);

	// Expose audio ref for play/pause control
	useEffect(() => {
		if (!audioRef.current) return;

		const playOrPause = async () => {
			try {
				if (isPlaying) {
					await audioRef.current?.play();
				} else {
					audioRef.current?.pause();
				}
			} catch (error) {
				console.error("Error controlling audio:", error);
			}
		};

		playOrPause();
	}, [isPlaying]);

	return (
		<div className="bg-white rounded-lg shadow-lg p-6">
			<audio ref={audioRef} preload="metadata">
				Your browser does not support the audio element.
			</audio>

			{/* Progress Bar */}
			<div
				className="w-full h-2 bg-gray-200 rounded-full mb-4 cursor-pointer"
				onClick={onSeek}
			>
				<div
					className="h-full bg-blue-600 rounded-full transition-all duration-100"
					style={{
						width: `${duration ? (currentTime / duration) * 100 : 0}%`,
					}}
				/>
			</div>

			{/* Controls */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-4">
					<div className="relative">
						<button
							onClick={() => onSkip(-10)}
							className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
						>
							<SkipBack className="w-5 h-5" />
						</button>
						{showSkipPopover.show && showSkipPopover.type === "backward" && (
							<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap animate-fade-in">
								-10s
							</div>
						)}
					</div>

					<button
						onClick={onTogglePlayPause}
						className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
					>
						{isPlaying ? (
							<Pause className="w-6 h-6" />
						) : (
							<Play className="w-6 h-6" />
						)}
					</button>

					<div className="relative">
						<button
							onClick={() => onSkip(10)}
							className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
						>
							<SkipForward className="w-5 h-5" />
						</button>
						{showSkipPopover.show && showSkipPopover.type === "forward" && (
							<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-sm font-medium whitespace-nowrap animate-fade-in">
								+10s
							</div>
						)}
					</div>

					<div className="flex items-center group ml-4">
						<div className="p-2 rounded-full hover:bg-gray-100 transition-colors">
							<Volume2 className="w-5 h-5 text-gray-500" />
						</div>
						<div className="overflow-hidden transition-all duration-300 ease-in-out max-w-0 group-hover:max-w-[6rem] group-hover:ml-2">
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={volume}
								onChange={onVolumeChange}
								className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
							/>
						</div>
					</div>
				</div>

				<div className="text-sm text-gray-600">
					{formatTime(currentTime)} / {formatTime(duration)}
				</div>
			</div>
		</div>
	);
}
