import axios from 'axios';
import { useEffect, useState } from 'react';
import FeaturedPostCard from '@/components/featured-post-card';
import LatestPostCard from '@/components/latest-post-card';
import { FeaturedPostCardSkeleton } from '@/components/skeletons/featured-post-card-skeleton';
import { LatestPostCardSkeleton } from '@/components/skeletons/latest-post-card-skeleton';
import CategoryPill from '@/components/category-pill';
import { categories } from '@/utils/category-colors';

export default function BlogFeed() {
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Define base URL once
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    let categoryEndpoint =
      selectedCategory === 'featured'
        ? '/api/posts/featured'
        : `/api/posts/categories/${selectedCategory}`;

    setLoading(true);
    axios
      .get(`${API_BASE_URL}${categoryEndpoint}`) // ✅ safe template string
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching category posts:', error);
        setLoading(false);
      });
  }, [selectedCategory, API_BASE_URL]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/posts/latest`) // ✅ safe template string
      .then((response) => {
        setLatestPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching latest posts:', error);
      });
  }, [API_BASE_URL]);

  return (
    <div className="mx-auto my-6">
      <div className="-mx-4 flex flex-wrap">
        {/* Left Column */}
        <div className="w-full p-4 md:w-2/3">
          <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
            What's hot?
          </div>
          <h1 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
            {selectedCategory === 'featured'
              ? 'Featured Posts'
              : `Posts related to "${selectedCategory}"`}
          </h1>
          <div className="flex flex-col gap-6">
            {posts.length === 0 || loading
              ? Array(5)
                  .fill(0)
                  .map((_, index) => <FeaturedPostCardSkeleton key={index} />)
              : posts
                  .slice(0, 5)
                  .map((post, index) => <FeaturedPostCard key={index} post={post} />)}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full p-4 md:w-1/3">
          {/* Categories */}
          <div className="mb-6">
            <div className="-mb-1 cursor-text text-base tracking-wide text-light-tertiary dark:text-dark-tertiary">
              Discover by topic
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Categories
            </h2>
            <div className="flex flex-wrap gap-3 dark:rounded-lg dark:bg-dark-card dark:p-3">
              {categories.map((category) => (
                <button
                  key={category}
                  aria-label={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === category ? 'featured' : category
                    )
                  }
                >
                  <CategoryPill
                    category={category}
                    selected={selectedCategory === category}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Latest Posts */}
          <div>
            <div className="-mb-1 cursor-text text-base tracking-wide text-slate-500 dark:text-dark-tertiary">
              What's new?
            </div>
            <h2 className="mb-2 cursor-text text-xl font-semibold dark:text-dark-primary">
              Latest Posts
            </h2>
            <div className="flex flex-col gap-4">
              {latestPosts.length === 0
                ? Array(5)
                    .fill(0)
                    .map((_, index) => <LatestPostCardSkeleton key={index} />)
                : latestPosts
                    .slice(0, 5)
                    .map((post, index) => (
                      <LatestPostCard key={index} post={post} />
                    ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
