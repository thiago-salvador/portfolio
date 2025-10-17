"use client";

interface ProjectMediaProps {
  src: string;
  alt: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export default function ProjectMedia({
  src,
  alt,
  className = "",
  autoPlay = false,
  muted = true,
  loop = true
}: ProjectMediaProps) {
  // Check if the source is a video file
  const isVideo = src.match(/\.(mp4|mov|webm|ogg)$/i);

  if (isVideo) {
    return (
      <video
        src={src}
        className={className}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        preload="auto"
      >
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
    />
  );
}
