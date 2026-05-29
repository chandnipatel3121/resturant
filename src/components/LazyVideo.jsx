import React, { useRef, useEffect, useState } from "react";

/**
 * LazyVideo loads video sources only when the component is near the viewport.
 * It supports MP4 and WebM sources and starts autoplaying automatically once loaded.
 * No preload or poster attributes are used to avoid blocking the initial page load.
 */
const LazyVideo = ({ mp4Src, webmSrc, className }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            const video = videoRef.current;
            if (video) {
              const srcMp4 = document.createElement("source");
              srcMp4.src = mp4Src;
              srcMp4.type = "video/mp4";
              video.appendChild(srcMp4);

              if (webmSrc) {
                const srcWebm = document.createElement("source");
                srcWebm.src = webmSrc;
                srcWebm.type = "video/webm";
                video.appendChild(srcWebm);
              }

              video.load();
              setIsLoaded(true);
            }
          }
        });
      },
      { rootMargin: "200px" }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [mp4Src, webmSrc, isLoaded]);

  return (
    <video
      ref={videoRef}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    />
  );
};

export default LazyVideo;
