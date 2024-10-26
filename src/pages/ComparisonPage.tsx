import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Clock, Star, Truck, DollarSign, Percent } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { getFoodImage } from '../utils/imageSearch';

interface Platform {
  name: string;
  price: number;
  deliveryTime: number;
  rating: number;
  deliveryFee: number;
  discount?: number;
}

interface FoodItem {
  id: number;
  name: string;
  restaurant: string;
  image: string;
  platforms: Platform[];
}

const ComparisonPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<keyof Platform>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const location = useLocation();

  useEffect(() => {
    const { foodSearch, restaurantSearch } = location.state as { foodSearch: string; restaurantSearch: string };
    
    // Simulating API call to fetch comparison data
    const fetchComparisonData = async () => {
      // Get the appropriate image for the searched food
      const foodImage = getFoodImage(foodSearch || 'Indian Food');

      // In a real app, you would make an API call here
      // For now, we'll use mock data
      const mockData: FoodItem[] = [
        {
          id: 1,
          name: foodSearch || 'Popular Dishes',
          restaurant: restaurantSearch || 'Local Restaurant',
          image: foodImage,
          platforms: [
            { name: 'Swiggy', price: 280, deliveryTime: 30, rating: 4.2, deliveryFee: 20, discount: 10 },
            { name: 'Zomato', price: 270, deliveryTime: 35, rating: 4.0, deliveryFee: 25 },
            { name: 'Uber Eats', price: 290, deliveryTime: 25, rating: 4.5, deliveryFee: 15, discount: 5 },
          ],
        },
        {
          id: 2,
          name: `${foodSearch || 'Special'} Combo`,
          restaurant: restaurantSearch || 'Premium Kitchen',
          image: getFoodImage(foodSearch ? `${foodSearch} platter` : 'Indian thali'),
          platforms: [
            { name: 'Swiggy', price: 300, deliveryTime: 40, rating: 4.3, deliveryFee: 30 },
            { name: 'Zomato', price: 290, deliveryTime: 45, rating: 4.1, deliveryFee: 20, discount: 15 },
            { name: 'Uber Eats', price: 310, deliveryTime: 35, rating: 4.4, deliveryFee: 25 },
          ],
        },
      ];
      setFoodItems(mockData);
    };

    fetchComparisonData();
  }, [location]);

  const sortedFoodItems = foodItems.map((item) => ({
    ...item,
    platforms: [...item.platforms].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] - b[sortBy];
      } else {
        return b[sortBy] - a[sortBy];
      }
    }),
  }));

  const handleSort = (criteria: keyof Platform) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-dark-primary">Compare Prices and Delivery Times</h1>

      <div className="mb-4 flex flex-wrap justify-end space-x-4">
        <button
          onClick={() => handleSort('price')}
          className={`flex items-center ${sortBy === 'price' ? 'text-indigo-400' : 'text-dark-secondary'}`}
        >
          Price <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
        <button
          onClick={() => handleSort('deliveryTime')}
          className={`flex items-center ${sortBy === 'deliveryTime' ? 'text-indigo-400' : 'text-dark-secondary'}`}
        >
          Delivery Time <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
        <button
          onClick={() => handleSort('rating')}
          className={`flex items-center ${sortBy === 'rating' ? 'text-indigo-400' : 'text-dark-secondary'}`}
        >
          Rating <ArrowUpDown className="ml-1 h-4 w-4" />
        </button>
      </div>

      {sortedFoodItems.map((item) => (
        <div key={item.id} className="bg-dark-secondary rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row">
            <img src={item.image} alt={item.name} className="w-full md:w-1/3 h-48 object-cover rounded-lg mb-4 md:mb-0 md:mr-6" />
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-dark-primary">{item.name}</h2>
              <p className="text-dark-secondary mb-4">{item.restaurant}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {item.platforms.map((platform, index) => (
              <div key={index} className="border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 text-dark-primary">{platform.name}</h3>
                <p className="text-2xl font-bold text-indigo-400 mb-2">₹{platform.price}</p>
                {platform.discount && (
                  <p className="text-green-400 font-semibold flex items-center">
                    <Percent className="mr-1 h-4 w-4" /> {platform.discount}% off
                  </p>
                )}
                <p className="flex items-center text-dark-secondary mb-2">
                  <Clock className="mr-2 h-4 w-4" /> {platform.deliveryTime} mins
                </p>
                <p className="flex items-center text-yellow-400 mb-2">
                  <Star className="mr-2 h-4 w-4" /> {platform.rating.toFixed(1)}
                </p>
                <p className="flex items-center text-dark-secondary mb-2">
                  <Truck className="mr-2 h-4 w-4" /> Delivery fee: ₹{platform.deliveryFee}
                </p>
                <p className="flex items-center text-dark-secondary mb-4">
                  <DollarSign className="mr-2 h-4 w-4" /> Total: ₹{platform.price + platform.deliveryFee}
                </p>
                <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComparisonPage;