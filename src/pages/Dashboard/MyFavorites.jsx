import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Bookmark,
  Eye,
  Heart,
  Trash2,
  BookOpen,
  Search,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ui/Loading";

const MyFavorites = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterTone, setFilterTone] = useState("all");

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["my-favorites"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons/favorites`);
      return res.data;
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async (lessonId) => {
      await axiosSecure.delete(`/lessons/favorites/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-favorites"]);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Removed from favorites",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const handleRemove = (lessonId, title) => {
    Swal.fire({
      title: "Remove from Favorites?",
      text: `Do you want to remove "${title}" from your favorites?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFavoriteMutation.mutate(lessonId);
      }
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Extract unique categories and tones
  const categories = [
    ...new Set(
      favorites.map((fav) => (fav.lesson || fav).category).filter(Boolean)
    ),
  ];
  const tones = [
    ...new Set(
      favorites
        .map((fav) => (fav.lesson || fav).emotionalTone)
        .filter(Boolean)
    ),
  ];

  // Filter favorites
  const filteredFavorites = favorites.filter((fav) => {
    const lesson = fav.lesson || fav;
    const matchesSearch =
      lesson.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || lesson.category === filterCategory;
    const matchesTone =
      filterTone === "all" || lesson.emotionalTone === filterTone;

    return matchesSearch && matchesCategory && matchesTone;
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Saved Lessons
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Total {favorites.length} lessons saved
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search saved lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white dark:bg-gray-700 dark:text-white"
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterTone}
          onChange={(e) => setFilterTone(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary bg-white dark:bg-gray-700 dark:text-white"
        >
          <option value="all">All Emotional Tones</option>
          {tones.map((tone) => (
            <option key={tone} value={tone}>
              {tone}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {favorites.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
          <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No saved lessons yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Start saving lessons you want to read later
          </p>
          <Link
            to="/public-lessons"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            <BookOpen className="w-5 h-5" />
            Explore Lessons
          </Link>
        </div>
      ) : filteredFavorites.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 text-center">
          <p className="text-gray-600 dark:text-gray-300">No lessons match your filters.</p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCategory("all");
              setFilterTone("all");
            }}
            className="mt-4 text-primary hover:underline font-semibold"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <TableContainer
          component={Paper}
          className="rounded-2xl shadow-md dark:shadow-gray-900/50"
          sx={{
            backgroundColor: 'white',
            '& .MuiPaper-root': {
              backgroundColor: 'white',
            },
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: '#1f2937',
              '& .MuiPaper-root': {
                backgroundColor: '#1f2937',
              },
            },
            '.dark &': {
              backgroundColor: '#1f2937',
              '& .MuiPaper-root': {
                backgroundColor: '#1f2937',
              },
            },
          }}
        >
          <Table
             sx={{
              '& .MuiTableCell-root': {
                borderColor: 'rgba(229, 231, 235, 1)',
                color: 'inherit',
              },
              '& .MuiTableRow-root:hover': {
                backgroundColor: 'rgba(249, 250, 251, 1)',
              },
              '@media (prefers-color-scheme: dark)': {
                '& .MuiTableCell-root': {
                  borderColor: 'rgba(55, 65, 81, 0.5)',
                  color: '#e5e7eb',
                },
                '& .MuiTableRow-root:hover': {
                  backgroundColor: 'rgba(50, 178, 201, 0.1)',
                },
              },
              '.dark &': {
                '& .MuiTableCell-root': {
                  borderColor: 'rgba(55, 65, 81, 0.5)',
                  color: '#e5e7eb',
                },
                '& .MuiTableRow-root:hover': {
                  backgroundColor: 'rgba(50, 178, 201, 0.1)',
                },
              },
            }}
          >
            <TableHead>
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Title</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Category</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Emotional Tone</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Author</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Saved On</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Stats</TableCell>
                <TableCell className="font-bold border-b border-gray-200 dark:border-gray-600">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredFavorites.map((fav) => {
                const lesson = fav.lesson || fav;
                const author = lesson.creator || lesson.createdBy || {};
                
                return (
                  <TableRow key={fav._id || lesson._id} hover>
                    <TableCell className="font-medium max-w-xs text-gray-900 dark:text-gray-100">
                      <div className="line-clamp-2">{lesson.title}</div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lesson.category}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(50, 178, 201, 0.2)',
                          color: '#32B2C9',
                          fontWeight: 600,
                          '.dark &': {
                             color: 'white',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={lesson.emotionalTone}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(11, 44, 86, 0.1)',
                          color: '#0B2C56',
                           '.dark &': {
                             backgroundColor: 'rgba(11, 44, 86, 0.3)',
                             color: '#e5e7eb',
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {author.name || author.displayName || "Unknown"}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(fav.createdAt || lesson.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {lesson.likesCount || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Bookmark className="w-4 h-4" />
                          {lesson.favoritesCount || 0}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Tooltip title="View Lesson">
                          <Link to={`/lesson/${lesson._id}`}>
                            <IconButton size="small" className="text-primary hover:bg-primary/10">
                              <Eye className="w-4 h-4" />
                            </IconButton>
                          </Link>
                        </Tooltip>
                        <Tooltip title="Remove from Favorites">
                          <IconButton
                            size="small"
                            className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                            onClick={() =>
                              handleRemove(lesson._id, lesson.title)
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default MyFavorites;
