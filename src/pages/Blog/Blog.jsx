import { Calendar, User, ArrowRight, TrendingUp, BookOpen, Heart } from "lucide-react";

const Blog = () => {
  const featuredPost = {
    id: 1,
    title: "The Power of Sharing Life Experiences: How Stories Shape Our Growth",
    excerpt: "Discover how sharing your life experiences can not only help others but also accelerate your own personal development and self-awareness.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    author: "Sarah Johnson",
    date: "January 10, 2026",
    category: "Personal Growth",
    readTime: "8 min read",
  };

  const blogPosts = [
    {
      id: 2,
      title: "5 Ways to Turn Failures Into Valuable Life Lessons",
      excerpt: "Learn practical strategies to reframe setbacks and extract meaningful insights from challenging experiences.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80",
      author: "Michael Chen",
      date: "January 8, 2026",
      category: "Learning",
      readTime: "6 min read",
    },
    {
      id: 3,
      title: "Building a Community of Lifelong Learners",
      excerpt: "Explore how collaborative learning environments foster growth and create lasting connections.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
      author: "Emily Rodriguez",
      date: "January 5, 2026",
      category: "Community",
      readTime: "5 min read",
    },
    {
      id: 4,
      title: "The Science Behind Reflective Practice",
      excerpt: "Understanding the psychological benefits of documenting and reflecting on your experiences.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
      author: "Dr. James Wilson",
      date: "January 3, 2026",
      category: "Psychology",
      readTime: "7 min read",
    },
    {
      id: 5,
      title: "How to Write Impactful Life Lessons",
      excerpt: "Tips and techniques for crafting lessons that resonate with readers and create meaningful impact.",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80",
      author: "Lisa Anderson",
      date: "December 30, 2025",
      category: "Writing",
      readTime: "6 min read",
    },
    {
      id: 6,
      title: "Overcoming Fear of Vulnerability in Sharing",
      excerpt: "Addressing common concerns about opening up and sharing personal experiences online.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
      author: "Marcus Thompson",
      date: "December 28, 2025",
      category: "Mindset",
      readTime: "5 min read",
    },
    {
      id: 7,
      title: "The Ripple Effect: How Your Story Impacts Others",
      excerpt: "Real stories of how shared experiences have transformed lives and created positive change.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
      author: "Sarah Johnson",
      date: "December 25, 2025",
      category: "Impact",
      readTime: "8 min read",
    },
  ];

  const categories = [
    { name: "All Posts", count: 24, icon: BookOpen },
    { name: "Personal Growth", count: 8, icon: TrendingUp },
    { name: "Community", count: 6, icon: Heart },
    { name: "Learning", count: 5, icon: BookOpen },
    { name: "Psychology", count: 3, icon: User },
    { name: "Writing", count: 2, icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-secondary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center" data-aos="fade-up">
            <BookOpen className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Insights, stories, and tips to help you on your learning journey
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Post */}
            <article
              data-aos="fade-up"
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden h-96">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-secondary text-white rounded-full text-sm font-bold">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {featuredPost.author}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </article>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={post.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300 mb-3">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full font-semibold">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {post.author}
                        </span>
                      </div>
                      <button className="text-primary font-bold text-sm hover:gap-2 flex items-center gap-1 transition-all">
                        Read
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center" data-aos="fade-up">
              <button className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold hover:opacity-90 transition-all shadow-lg hover:shadow-xl">
                Load More Posts
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div data-aos="fade-left" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-base-200 text-gray-600 dark:text-gray-300 rounded-full text-sm font-bold">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-lg p-6 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="mb-6 opacity-90">
                Subscribe to our newsletter for the latest insights and stories
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="w-full py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 dark:bg-gray-800 transition-all">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div data-aos="fade-left" data-aos-delay="200" className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Growth", "Learning", "Mindset", "Success", "Community", "Reflection", "Wisdom", "Experience"].map(
                  (tag, index) => (
                    <button
                      key={index}
                      className="px-4 py-2 bg-base-200 hover:bg-primary hover:text-white rounded-full text-sm font-semibold transition-all"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
