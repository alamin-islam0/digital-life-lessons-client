import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2, AlertTriangle, Eye, CheckCircle } from 'lucide-react';
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
} from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/ui/Loading';

const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Fetch grouped reports (list of lessons with reports)
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ['reported-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/reported-lessons');
            return res.data;
        },
    });

    // Fetch details for selected lesson
    const { data: reportDetails = [], isLoading: detailsLoading } = useQuery({
        queryKey: ['report-details', selectedLessonId],
        queryFn: async () => {
            if (!selectedLessonId) return [];
            const res = await axiosSecure.get(`/admin/reported-lessons/${selectedLessonId}`);
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
            queryClient.invalidateQueries(['reported-lessons']);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'লেসন মুছে ফেলা হয়েছে',
                showConfirmButton: false,
                timer: 2000,
            });
            setSelectedLessonId(null);
        },
    });

    const handleDelete = (lessonId) => {
        Swal.fire({
            title: 'নিশ্চিত করুন',
            text: 'এই লেসনটি মুছে ফেলতে চান?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'হ্যাঁ, মুছুন',
            cancelButtonText: 'বাতিল',
            customClass: { title: 'bangla-text', htmlContainer: 'bangla-text' },
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 bangla-text">রিপোর্টেড লেসন</h1>
                    <p className="text-gray-500 bangla-text">
                        মোট রিপোর্টেড লেসন: {reports.length}
                    </p>
                </div>
            </div>

            <TableContainer component={Paper} elevation={0} className="border border-gray-100 rounded-xl">
                <Table>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="bangla-text font-bold">লেসন শিরোনাম</TableCell>
                            <TableCell className="bangla-text font-bold">মোট রিপোর্ট</TableCell>
                            <TableCell className="bangla-text font-bold text-right">অ্যাকশন</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reports
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((report) => (
                                <TableRow key={report._id} hover>
                                    <TableCell className="font-medium bangla-text max-w-xs truncate">
                                        {report.lesson?.title || 'মুছে ফেলা লেসন'}
                                    </TableCell>
                                    <TableCell className="bangla-text text-sm">
                                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold">
                                            <AlertTriangle className="w-4 h-4" />
                                            {report.reportCount}
                                        </span>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="বিস্তারিত দেখুন">
                                            <IconButton
                                                color="info"
                                                onClick={() => setSelectedLessonId(report._id)}
                                                size="small"
                                                className="mr-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="লেসন মুছুন">
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
                />
            </TableContainer>

            {/* Report Details Dialog */}
            <Dialog open={!!selectedLessonId} onClose={() => setSelectedLessonId(null)} maxWidth="md" fullWidth>
                <DialogTitle className="bangla-text font-bold">রিপোর্ট বিস্তারিত</DialogTitle>
                <DialogContent dividers>
                    {detailsLoading ? (
                        <div className="flex justify-center p-4">
                            <Loading fullScreen={false} />
                        </div>
                    ) : reportDetails.length > 0 ? (
                        <div className="space-y-6">
                            {/* Lesson Info */}
                            <div className="bg-blue-50 p-4 rounded-xl mb-4">
                                <Typography variant="subtitle2" color="textSecondary" className="bangla-text mb-1">
                                    লেসন
                                </Typography>
                                <Link
                                    to={`/lesson/${selectedLessonId}`}
                                    className="text-lg font-bold text-primary-700 hover:underline bangla-text block"
                                    target="_blank"
                                >
                                    {/* Since backend details endpoint doesn't return lesson title in the list of reports, 
                                        we assume context or just show link. 
                                        Or we could pass title from parent. But link is sufficient.
                                        Wait, reports array from details endpoint has populate('reporter').
                                        It does not seem to populate lesson info again.
                                     */}
                                    লেসনটি দেখতে এখানে ক্লিক করুন
                                </Link>
                            </div>

                            {/* Reports List */}
                            <Typography variant="h6" className="bangla-text mb-3">
                                অভিযোগসমূহ ({reportDetails.length})
                            </Typography>

                            <div className="space-y-4">
                                {reportDetails.map((detail) => (
                                    <div key={detail._id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <Typography variant="subtitle2" className="bangla-text font-bold text-gray-900">
                                                    {detail.reporter?.name || 'অজানা ব্যবহারকারী'} ({detail.reporter?.email})
                                                </Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(detail.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </div>
                                            <span className="px-3 py-1 bg-red-50 text-red-700 text-xs rounded-lg font-medium border border-red-100">
                                                {detail.reason}
                                            </span>
                                        </div>
                                        {detail.message && (
                                            <div className="bg-white p-3 rounded-lg border border-gray-100 text-gray-700 text-sm bangla-text mt-2">
                                                {detail.message}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500 bangla-text">
                            কোনো বিস্তারিত তথ্য পাওয়া যায়নি
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedLessonId(null)} className="bangla-text">
                        বন্ধ করুন
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDelete(selectedLessonId)}
                        className="bangla-text"
                    >
                        লেসন ডিলিট করুন
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ReportedLessons;
