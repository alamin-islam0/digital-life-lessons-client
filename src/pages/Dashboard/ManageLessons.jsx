import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Search, Trash2, Eye, Star } from 'lucide-react';
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
} from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/ui/Loading';

const ManageLessons = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ['all-lessons', searchTerm],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/lessons');
            if (searchTerm) {
                return res.data.filter(
                    (l) =>
                        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.creator?.name?.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }
            return res.data;
        },
    });

    const deleteLessonMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/admin/lessons/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['all-lessons']);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Lesson deleted',
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
            queryClient.invalidateQueries(['all-lessons']);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Status updated',
                showConfirmButton: false,
                timer: 2000,
            });
        },
    });

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'Confirm',
            text: `Do you want to delete lesson "${title}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
            customClass: {
                title: 'bangla-text',
                htmlContainer: 'bangla-text',
                confirmButton: 'bangla-text',
                cancelButton: 'bangla-text',
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
        <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Lesson Management</h1>
                    <p className="text-gray-500">Total Lessons: {lessons.length}</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>

            <TableContainer component={Paper} elevation={0} className="border border-gray-100 rounded-xl">
                <Table>
                    <TableHead className="bg-gray-50">
                        <TableRow>
                            <TableCell className="bangla-text font-bold">Title</TableCell>
                            <TableCell className="bangla-text font-bold">Author</TableCell>
                            <TableCell className="bangla-text font-bold">Category</TableCell>
                            <TableCell className="bangla-text font-bold">Access</TableCell>
                            <TableCell className="bangla-text font-bold">Featured?</TableCell>
                            <TableCell className="bangla-text font-bold text-right">Action</TableCell>
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
                                        {lesson?.creatorName || 'Unknown'}
                                    </TableCell>
                                    <TableCell>
                                        <Chip label={lesson.category} size="small" variant="outlined" className="bangla-text" />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lesson.accessLevel === 'premium' ? 'Premium' : 'Free'}
                                            color={lesson.accessLevel === 'premium' ? 'warning' : 'info'}
                                            size="small"
                                            className="bangla-text"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title={lesson.isFeatured ? 'Remove from Featured' : 'Make Featured'}>
                                            <IconButton
                                                color={lesson.isFeatured ? 'warning' : 'default'}
                                                onClick={() => toggleFeaturedMutation.mutate({ id: lesson._id, isFeatured: !lesson.isFeatured })}
                                            >
                                                <Star className={`w-5 h-5 ${lesson.isFeatured ? 'fill-current' : ''}`} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Details">
                                            <Link to={`/lesson/${lesson._id}`} className="mr-2 inline-block">
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
                />
            </TableContainer>
        </div>
    );
};

export default ManageLessons;
