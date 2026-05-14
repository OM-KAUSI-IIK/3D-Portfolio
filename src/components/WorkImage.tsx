import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward, MdClose, MdOpenInFull } from "react-icons/md";

interface Props {
  images: string[];
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [props.images]);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight" && props.images.length > 1) {
        setActiveImageIndex((currentIndex) => (currentIndex + 1) % props.images.length);
      }

      if (event.key === "ArrowLeft" && props.images.length > 1) {
        setActiveImageIndex((currentIndex) => (currentIndex - 1 + props.images.length) % props.images.length);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, props.images.length]);

  useEffect(() => {
    if (props.images.length <= 1 || isVideo) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => (currentIndex + 1) % props.images.length);
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, [isVideo, props.images]);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const goToPrevImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex - 1 + props.images.length) % props.images.length);
  };

  const goToNextImage = () => {
    setActiveImageIndex((currentIndex) => (currentIndex + 1) % props.images.length);
  };

  return (
    <div className="work-image">
      <div
        className="work-image-in"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        data-cursor={"disable"}
      >
        <button
          type="button"
          className="work-link"
          onClick={() => setIsLightboxOpen(true)}
          aria-label={`Open ${props.alt ?? "project"} image`}
        >
          <MdOpenInFull />
        </button>
        <div className="work-image-frame">
          <div
            className="work-image-track"
            style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
          >
            {props.images.map((image, index) => (
              <img
                key={`${props.alt ?? "project"}-${index}`}
                src={image}
                alt={props.alt}
                className="work-slide-image"
              />
            ))}
          </div>
        </div>
        {props.images.length > 1 && (
          <div className="work-image-dots">
            {props.images.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`work-image-dot ${index === activeImageIndex ? "work-image-dot-active" : ""}`}
              />
            ))}
          </div>
        )}
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </div>
      {isLightboxOpen && (
        <div
          className="work-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={props.alt ?? "Project image preview"}
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="work-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="work-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close image preview"
            >
              <MdClose />
            </button>
            {props.images.length > 1 && (
              <button
                type="button"
                className="work-lightbox-arrow work-lightbox-arrow-left"
                onClick={goToPrevImage}
                aria-label="Previous image"
              >
                <MdArrowBack />
              </button>
            )}
            <img
              src={props.images[activeImageIndex]}
              alt={props.alt}
              className="work-lightbox-image"
            />
            {props.images.length > 1 && (
              <button
                type="button"
                className="work-lightbox-arrow work-lightbox-arrow-right"
                onClick={goToNextImage}
                aria-label="Next image"
              >
                <MdArrowForward />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkImage;
