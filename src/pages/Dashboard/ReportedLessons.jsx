import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, AlertTriangle, Eye, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ui/Loading";

const ReportedLessons = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedLessonId, setSelectedLessonId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Fetch grouped reports (list of lessons with reports)
  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["reported-lessons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reported-lessons");
      return res.data;
    },
  });

  // Fetch details for selected lesson
  const { data: reportDetails = [], isLoading: detailsLoading } = useQuery({
    queryKey: ["report-details", selectedLessonId],
    queryFn: async () => {
      if (!selectedLessonId) return [];
      const res = await axiosSecure.get(
        `/admin/reported-lessons/${selectedLessonId}`
      );
      return res.data;
    },
    enabled: !!selectedLessonId,
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (lessonId) => {
      // Admin lesson delete endpoint
      await axiosSecure.delete(`/admin/lessons/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reported-lessons"]);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Lesson deleted",
        showConfirmButton: false,
        timer: 2000,
      });
      setSelectedLessonId(null);
    },
  });

  const handleDelete = (lessonId) => {
    Swal.fire({
      title: "Confirm",
      text: "Do you want to delete this lesson?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: { title: "bangla-text", htmlContainer: "bangla-text" },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLessonMutation.mutate(lessonId);
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reported Lessons</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Total Reported Lessons: {reports.length}
          </p>
        </div>
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
              <TableCell className="bangla-text font-bold">
                Lesson Title
              </TableCell>
              <TableCell className="bangla-text font-bold">
                Total Reports
              </TableCell>
              <TableCell className="bangla-text font-bold text-right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <TableRow key={report._id} hover>
                  <TableCell className="font-medium max-w-xs truncate">
                    {report.lesson?.title || "Deleted Lesson"}
                  </TableCell>
                  <TableCell className="bangla-text text-sm">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-error/10 text-error rounded-full font-bold">
                      <AlertTriangle className="w-4 h-4" />
                      {report.reportCount}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View Details">
                      <IconButton
                        color="info"
                        onClick={() => setSelectedLessonId(report._id)}
                        size="small"
                        className="mr-2"
                      >
                        <Eye className="w-4 h-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Lesson">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(report._id)}
                        size="small"
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
          count={reports.length}
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

      {/* Report Details Dialog */}
      <Dialog
        open={!!selectedLessonId}
        onClose={() => setSelectedLessonId(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="bangla-text font-bold">
          Report Details
        </DialogTitle>
        <DialogContent dividers>
          {detailsLoading ? (
            <div className="flex justify-center p-4">
              <Loading fullScreen={false} />
            </div>
          ) : reportDetails.length > 0 ? (
            <div className="space-y-6">
              {/* Lesson Info */}
              <div className="bg-info/10 p-4 rounded-xl mb-4">
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  className="bangla-text mb-1"
                >
                  Lesson
                </Typography>
                <Link
                  to={`/lesson/${selectedLessonId}`}
                  className="text-lg font-bold text-primary hover:underline block"
                  target="_blank"
                >
                  Click here to view lesson
                </Link>
              </div>

              {/* Reports List */}
              <Typography variant="h6" className="bangla-text mb-3">
                Complaints ({reportDetails.length})
              </Typography>

              <div className="space-y-4">
                {reportDetails.map((detail) => (
                  <div
                    key={detail._id}
                    className="border border-gray-200 dark:border-gray-700 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:bg-gray-700 dark:bg-gray-700 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <Typography
                          variant="subtitle2"
                          className="bangla-text font-bold text-gray-900 dark:text-white"
                        >
                          {detail.reporter?.name || "Unknown User"} (
                          {detail.reporter?.email})
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {new Date(detail.createdAt).toLocaleDateString()}
                        </Typography>
                      </div>
                      <span className="px-3 py-1 bg-error/5 text-error text-xs rounded-lg font-medium border border-error/20">
                        {detail.reason}
                      </span>
                    </div>
                    {detail.message && (
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm mt-2">
                        {detail.message}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No details found
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setSelectedLessonId(null)}
            className="bangla-text"
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(selectedLessonId)}
            className="bangla-text"
          >
            Delete Lesson
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportedLessons;
