import React, { useEffect } from "react";
import "../../styles/components/lightbox.css";

const Lightbox = ({ src, alt, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>
        <span className="material-icons">close</span>
      </button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className="lightbox-image" />
        {alt && <p className="lightbox-caption">{alt}</p>}
      </div>
    </div>
  );
};

export default Lightbox;
