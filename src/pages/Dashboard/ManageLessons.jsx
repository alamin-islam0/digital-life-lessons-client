import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2, Eye, Star } from "lucide-react";
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
  TablePagination,
} from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ui/Loading";

const ManageLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterAccess, setFilterAccess] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState("all");

  const { data: allLessons = [], isLoading } = useQuery({
    queryKey: ["all-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/lessons");
      return res.data;
    },
  });

  // Get unique categories
  const categories = [...new Set(allLessons.map((l) => l.category))];

  // Apply filters
  const lessons = allLessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.creator?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || lesson.category === filterCategory;
    const matchesAccess =
      filterAccess === "all" || lesson.accessLevel === filterAccess;
    const matchesFeatured =
      filterFeatured === "all" ||
      (filterFeatured === "featured" && lesson.isFeatured) ||
      (filterFeatured === "not-featured" && !lesson.isFeatured);
    return matchesSearch && matchesCategory && matchesAccess && matchesFeatured;
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/admin/lessons/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-lessons"]);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Lesson deleted",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: async ({ id, isFeatured }) => {
      await axiosSecure.patch(`/admin/lessons/${id}/feature`, { isFeatured });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["all-lessons"]);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Status updated",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const handleDelete = (id, title) => {
    Swal.fire({
      title: "Confirm",
      text: `Do you want to delete lesson "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: {
        title: "bangla-text",
        htmlContainer: "bangla-text",
        confirmButton: "bangla-text",
        cancelButton: "bangla-text",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(id);
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Lesson Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Total Lessons: {lessons.length}</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-secondary/20 dark:text-white"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white dark:bg-secondary/20 dark:text-white"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={filterAccess}
          onChange={(e) => setFilterAccess(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white dark:bg-secondary/20 dark:text-white"
        >
          <option value="all">All Access Levels</option>
          <option value="premium">Premium</option>
          <option value="free">Free</option>
        </select>

        <select
          value={filterFeatured}
          onChange={(e) => setFilterFeatured(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white dark:bg-secondary/20 dark:text-white"
        >
          <option value="all">All Status</option>
          <option value="featured">Featured</option>
          <option value="not-featured">Not Featured</option>
        </select>
      </div>

      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-100 dark:border-gray-700 rounded-xl"
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
          <TableHead className="bg-gray-50 dark:bg-gray-700 dark:bg-gray-700">
            <TableRow>
              <TableCell className="bangla-text font-bold">Title</TableCell>
              <TableCell className="bangla-text font-bold">Author</TableCell>
              <TableCell className="bangla-text font-bold">Category</TableCell>
              <TableCell className="bangla-text font-bold">Access</TableCell>
              <TableCell className="bangla-text font-bold">Featured?</TableCell>
              <TableCell className="bangla-text font-bold text-right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lessons
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((lesson) => (
                <TableRow key={lesson._id} hover>
                  <TableCell className="font-medium max-w-xs truncate">
                    {lesson.title}
                  </TableCell>
                  <TableCell className="bangla-text text-sm">
                    {lesson?.creatorName || "Unknown"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={lesson.category}
                      size="small"
                      className="bangla-text"
                      sx={{
                        backgroundColor: 'rgba(50, 178, 201, 0.2)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        lesson.accessLevel === "premium" ? "Premium" : "Free"
                      }
                      size="small"
                      className="bangla-text"
                      sx={{
                        backgroundColor: lesson.accessLevel === "premium" ? '#f59e0b' : '#3b82f6',
                        color: 'white',
                        '@media (prefers-color-scheme: dark)': {
                          backgroundColor: lesson.accessLevel === "premium" ? '#32B2C9' : 'rgba(11, 44, 86, 0.2)',
                          color: lesson.accessLevel === "premium" ? 'white' : '#32B2C9',
                        },
                        '.dark &': {
                          backgroundColor: lesson.accessLevel === "premium" ? '#32B2C9' : 'rgba(11, 44, 86, 0.2)',
                          color: lesson.accessLevel === "premium" ? 'white' : '#32B2C9',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      title={
                        lesson.isFeatured
                          ? "Remove from Featured"
                          : "Make Featured"
                      }
                    >
                      <IconButton
                        onClick={() =>
                          toggleFeaturedMutation.mutate({
                            id: lesson._id,
                            isFeatured: !lesson.isFeatured,
                          })
                        }
                        sx={{
                          backgroundColor: lesson.isFeatured ? 'transparent' : 'rgba(50, 178, 201, 0.2)',
                          color: lesson.isFeatured ? '#32B2C9' : '#6b7280',
                          '&:hover': {
                            backgroundColor: lesson.isFeatured ? 'rgba(50, 178, 201, 0.1)' : 'rgba(50, 178, 201, 0.3)',
                          },
                        }}
                      >
                        <Star
                          className={`w-5 h-5 ${
                            lesson.isFeatured ? "fill-current" : ""
                          }`}
                        />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Details">
                      <Link
                        to={`/lesson/${lesson._id}`}
                        className="mr-2 inline-block"
                      >
                        <IconButton size="small" color="primary">
                          <Eye className="w-4 h-4" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(lesson._id, lesson.title)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={lessons.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            backgroundColor: 'white',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              color: '#32B2C9',
              fontWeight: 600,
            },
            '& .MuiTablePagination-select': {
              color: '#32B2C9',
              fontWeight: 600,
            },
            '& .MuiTablePagination-actions button': {
              color: '#32B2C9',
              '&:hover': {
                backgroundColor: 'rgba(50, 178, 201, 0.1)',
              },
              '&.Mui-disabled': {
                color: 'rgba(50, 178, 201, 0.3)',
              },
            },
            '@media (prefers-color-scheme: dark)': {
              backgroundColor: '#1f2937',
            },
            '.dark &': {
              backgroundColor: '#1f2937',
            },
          }}
        />
      </TableContainer>
    </div>
  );
};

export default ManageLessons;
