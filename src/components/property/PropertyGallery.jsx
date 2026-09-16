import { useState } from 'react';
import './PropertyGallery.css';

export default function PropertyGallery({ images, title }) {
  const [active, setActive] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery__main">
        <img src={images[active]} alt={`${title} — view ${active + 1}`} />
      </div>
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`gallery__thumb ${i === active ? 'gallery__thumb--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
            >
              <img src={src} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
