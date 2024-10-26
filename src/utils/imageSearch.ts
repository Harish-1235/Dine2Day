// Utility function to get food images from Unsplash
export const getFoodImage = (foodName: string): string => {
  // Create a search-friendly version of the food name
  const searchTerm = encodeURIComponent(foodName.toLowerCase());
  
  // Fallback images for common Indian dishes
  const fallbackImages: Record<string, string> = {
    'dosa': 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80',
    'idli': 'https://images.unsplash.com/photo-1668236543090-82c96a12c6e5?auto=format&fit=crop&w=800&q=80',
    'butter chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    'biryani': 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    'pizza': 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
    'burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    'pasta': 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80',
    'sushi': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'
  };

  // Check if we have a fallback image for this food
  const fallbackImage = fallbackImages[foodName.toLowerCase()];
  if (fallbackImage) {
    return fallbackImage;
  }

  // If no fallback, use Unsplash search URL
  return `https://source.unsplash.com/featured/800x600?${searchTerm}+food+dish`;
};