import React, { useState, useEffect } from 'react';
import { Search, TrendingUp, Clock, Zap, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Mock function to simulate AI recommendations
const getAIRecommendations = () => {
  return [
    { id: 1, name: 'Butter Chicken', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80', reason: 'Based on your recent orders' },
    { id: 2, name: 'Vegetable Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', reason: 'Popular in your area' },
    { id: 3, name: 'Chocolate Cake', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', reason: 'You might like this' },
  ];
};

const Dashboard: React.FC = () => {
  const [foodSearch, setFoodSearch] = useState('');
  const [restaurantSearch, setRestaurantSearch] = useState('');
  const [aiRecommendations, setAIRecommendations] = useState<any[]>([]);
  const navigate = useNavigate();

  const popularFoods = [
    { id: 1, name: 'Margherita Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80', rating: 4.8 },
    { id: 2, name: 'Chicken Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', rating: 4.7 },
    { id: 3, name: 'Sushi Platter', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', rating: 4.6 },
  ];

  const discountedFoods = [
    { id: 1, name: 'Gourmet Burger', discount: '25% off', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', originalPrice: 300, discountedPrice: 225 },
    { id: 2, name: 'Pad Thai', discount: '20% off', image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=800&q=80', originalPrice: 250, discountedPrice: 200 },
    { id: 3, name: 'Tiramisu', discount: '15% off', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80', originalPrice: 200, discountedPrice: 170 },
  ];

  useEffect(() => {
    // Simulate fetching AI recommendations
    const recommendations = getAIRecommendations();
    setAIRecommendations(recommendations);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (foodSearch || restaurantSearch) {
      navigate('/compare', { state: { foodSearch, restaurantSearch } });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-dark-primary">Welcome to Dine2Day</h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <label htmlFor="foodSearch" className="block text-sm font-medium text-dark-secondary mb-1">
              Search for food
            </label>
            <div className="relative">
              <input
                type="text"
                id="foodSearch"
                className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-dark-secondary text-dark-primary placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., Burger"
                value={foodSearch}
                onChange={(e) => setFoodSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="restaurantSearch" className="block text-sm font-medium text-dark-secondary mb-1">
              Search for restaurant
            </label>
            <div className="relative">
              <input
                type="text"
                id="restaurantSearch"
                className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 bg-dark-secondary text-dark-primary placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="e.g., McDonald's"
                value={restaurantSearch}
                onChange={(e) => setRestaurantSearch(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
        >
          Compare Prices
        </button>
      </form>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-dark-primary">
          <Zap className="mr-2" /> AI Recommendations for You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiRecommendations.map((food) => (
            <div key={food.id} className="bg-dark-secondary rounded-lg shadow-md overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-dark-primary">{food.name}</h3>
                <p className="text-sm text-dark-secondary mt-1">{food.reason}</p>
                <Link
                  to="/compare"
                  state={{ foodSearch: food.name }}
                  className="mt-2 inline-block text-indigo-400 hover:text-indigo-300"
                >
                  Compare prices
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-dark-primary">
          <TrendingUp className="mr-2" /> Most Ordered Foods
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularFoods.map((food) => (
            <div key={food.id} className="bg-dark-secondary rounded-lg shadow-md overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-dark-primary">{food.name}</h3>
                <p className="text-sm text-yellow-400 flex items-center mt-1">
                  <Star className="mr-1 h-4 w-4" /> {food.rating}
                </p>
                <Link
                  to="/compare"
                  state={{ foodSearch: food.name }}
                  className="mt-2 inline-block text-indigo-400 hover:text-indigo-300"
                >
                  Compare prices
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-dark-primary">
          <Clock className="mr-2" /> Limited Time Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {discountedFoods.map((food) => (
            <div key={food.id} className="bg-dark-secondary rounded-lg shadow-md overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-dark-primary">{food.name}</h3>
                <p className="text-green-400 font-semibold">{food.discount}</p>
                <p className="text-sm text-dark-secondary">
                  <span className="line-through">₹{food.originalPrice}</span>{' '}
                  <span className="text-indigo-400 font-semibold">₹{food.discountedPrice}</span>
                </p>
                <Link
                  to="/compare"
                  state={{ foodSearch: food.name }}
                  className="mt-2 inline-block text-indigo-400 hover:text-indigo-300"
                >
                  Compare prices
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;