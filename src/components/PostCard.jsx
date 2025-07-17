import { useState } from 'react';

const PostCard = ({ post }) => {
  const { title, published_at, small_image, medium_image } = post;
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback image jika semua gagal
  const fallbackImage = "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80";

  // Format tanggal
  const date = new Date(published_at).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Ambil gambar terbaik yang tersedia
  const imageSrc = imageError || (!small_image && !medium_image)
    ? fallbackImage
    : (medium_image || small_image);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Gambar dengan rasio 4:3 */}
      <div className="relative w-full aspect-[4/3] bg-gray-100">
        {/* Placeholder saat loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400 text-sm">Loading...</div>
          </div>
        )}

        <img
          loading="lazy"
          src={imageSrc}
          alt={title || 'Article image'}
          onError={handleImageError}
          onLoad={handleImageLoad}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Konten */}
      <div className="p-4">
        <p className="text-xs text-gray-500 mb-2">{date}</p>
        <h2 className="text-sm font-semibold text-gray-800 line-clamp-3 hover:text-orange-600 transition-colors duration-200">
          {title || 'No title available'}
        </h2>
      </div>
    </div>
  );
};

export default PostCard;
