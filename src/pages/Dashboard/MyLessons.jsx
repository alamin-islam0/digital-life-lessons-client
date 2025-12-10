import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import {
    Edit,
    Trash2,
    Eye,
    Heart,
    Bookmark,
    Lock,
    Unlock,
    BookOpen,
} from 'lucide-react';
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
} from '@mui/material';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../components/ui/Loading';

const MyLessons = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: lessons = [], isLoading } = useQuery({
        queryKey: ['my-lessons'],
        queryFn: async () => {
            const res = await axiosSecure.get('/lessons/my');
            return res.data || [];
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/lessons/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-lessons']);
            queryClient.invalidateQueries(['user-stats']);
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'লেসন মুছে ফেলা হয়েছে',
                showConfirmButton: false,
                timer: 2000,
            });
        },
    });

    const toggleVisibilityMutation = useMutation({
        mutationFn: async ({ id, visibility }) => {
            await axiosSecure.patch(`/lessons/${id}`, { visibility });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['my-lessons']);
        },
    });

    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'নিশ্চিত করুন',
            text: `"${title}" লেসনটি মুছে ফেলতে চান?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'হ্যাঁ, মুছুন',
            cancelButtonText: 'বাতিল',
            customClass: {
                title: 'bangla-text',
                htmlContainer: 'bangla-text',
                confirmButton: 'bangla-text',
                cancelButton: 'bangla-text',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(id);
            }
        });
    };

    const handleToggleVisibility = (id, currentVisibility) => {
        const newVisibility = currentVisibility === 'public' ? 'private' : 'public';
        toggleVisibilityMutation.mutate({ id, visibility: newVisibility });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('bn-BD', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (isLoading) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 bangla-text mb-2">আমার লেসন</h1>
                    <p className="text-gray-600 bangla-text">মোট {lessons.length}টি লেসন</p>
                </div>
                <Link
                    to="/dashboard/add-lesson"
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all bangla-text shadow-md hover:shadow-lg"
                >
                    <BookOpen className="w-5 h-5" />
                    নতুন লেসন
                </Link>
            </div>

            {lessons.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 bangla-text mb-2">
                        এখনো কোনো লেসন নেই
                    </h3>
                    <p className="text-gray-600 bangla-text mb-6">
                        আপনার প্রথম লাইফ লেসন তৈরি করুন
                    </p>
                    <Link
                        to="/dashboard/add-lesson"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all bangla-text"
                    >
                        <BookOpen className="w-5 h-5" />
                        লেসন তৈরি করুন
                    </Link>
                </div>
            ) : (
                <TableContainer component={Paper} className="rounded-2xl shadow-md">
                    <Table>
                        <TableHead>
                            <TableRow className="bg-gray-50">
                                <TableCell className="bangla-text font-bold">শিরোনাম</TableCell>
                                <TableCell className="bangla-text font-bold">ক্যাটাগরি</TableCell>
                                <TableCell className="bangla-text font-bold">টোন</TableCell>
                                <TableCell className="bangla-text font-bold">প্রাইভেসি</TableCell>
                                <TableCell className="bangla-text font-bold">অ্যাক্সেস</TableCell>
                                <TableCell className="bangla-text font-bold">তারিখ</TableCell>
                                <TableCell className="bangla-text font-bold">স্ট্যাটস</TableCell>
                                <TableCell className="bangla-text font-bold">কাজ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lessons.map((lesson) => (
                                <TableRow key={lesson._id} hover>
                                    <TableCell className="bangla-text font-medium max-w-xs">
                                        <div className="line-clamp-2">{lesson.title}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lesson.category}
                                            size="small"
                                            className="bangla-text"
                                            color="primary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lesson.emotionalTone}
                                            size="small"
                                            className="bangla-text"
                                            color="secondary"
                                            variant="outlined"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lesson.visibility === 'public' ? 'পাবলিক' : 'প্রাইভেট'}
                                            size="small"
                                            className="bangla-text"
                                            color={lesson.visibility === 'public' ? 'success' : 'default'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={lesson.accessLevel === 'premium' ? 'প্রিমিয়াম' : 'ফ্রি'}
                                            size="small"
                                            className="bangla-text"
                                            color={lesson.accessLevel === 'premium' ? 'warning' : 'info'}
                                        />
                                    </TableCell>
                                    <TableCell className="text-sm text-gray-600">
                                        {formatDate(lesson.createdAt)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
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
                                            <Tooltip title="দেখুন">
                                                <Link to={`/lesson/${lesson._id}`}>
                                                    <IconButton size="small" color="primary">
                                                        <Eye className="w-4 h-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title="এডিট করুন">
                                                <Link to={`/dashboard/update-lesson/${lesson._id}`}>
                                                    <IconButton size="small" color="info">
                                                        <Edit className="w-4 h-4" />
                                                    </IconButton>
                                                </Link>
                                            </Tooltip>
                                            <Tooltip title={lesson.visibility === 'public' ? 'প্রাইভেট করুন' : 'পাবলিক করুন'}>
                                                <IconButton
                                                    size="small"
                                                    color="warning"
                                                    onClick={() => handleToggleVisibility(lesson._id, lesson.visibility)}
                                                >
                                                    {lesson.visibility === 'public' ? (
                                                        <Unlock className="w-4 h-4" />
                                                    ) : (
                                                        <Lock className="w-4 h-4" />
                                                    )}
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="মুছুন">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(lesson._id, lesson.title)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default MyLessons;
