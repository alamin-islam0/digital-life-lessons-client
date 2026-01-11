import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Trash2, UserCog, ShieldCheck, User } from "lucide-react";
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
  Avatar,
  TablePagination,
} from "@mui/material";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/ui/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");
      // Simple client-side filtering
      if (searchTerm) {
        return res.data.filter(
          (u) =>
            u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return res.data;
    },
  });

  const updateUserRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => {
      await axiosSecure.patch(`/admin/users/${id}/role`, { role });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Role updated",
        showConfirmButton: false,
        timer: 2000,
      });
    },
  });

  const handleRoleUpdate = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    Swal.fire({
      title: "Change role?",
      text: `Do you want to make ${user.name}'s role ${
        newRole === "admin" ? "Admin" : "User"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateUserRoleMutation.mutate({ id: user._id, role: newRole });
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
          <p className="text-gray-500 dark:text-gray-400">Total Users: {users.length}</p>
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

      <TableContainer
        component={Paper}
        elevation={0}
        className="border border-gray-100 dark:border-gray-700 rounded-xl"
      >
        <Table>
          <TableHead className="bg-gray-50 dark:bg-gray-700">
            <TableRow>
              <TableCell className="font-bold">User</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Role</TableCell>
              <TableCell className="font-bold">Total Lessons</TableCell>
              <TableCell className="font-bold">Membership</TableCell>
              <TableCell className="font-bold text-right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar src={user.photoURL} alt={user.name}>
                        {user.name?.charAt(0)}
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        user.role === "admin" ? (
                          <ShieldCheck size={14} />
                        ) : (
                          <User size={14} />
                        )
                      }
                      label={user.role === "admin" ? "Admin" : "User"}
                      color={user.role === "admin" ? "primary" : "default"}
                      size="small"
                      className=""
                    />
                  </TableCell>
                  <TableCell>
                    {/* Display total lessons or 0 if not available */}
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {user.totalLessons || 0}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.isPremium ? "Premium" : "Free"}
                      color={user.isPremium ? "warning" : "default"}
                      size="small"
                      className=""
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Change Role">
                      <IconButton
                        color="primary"
                        onClick={() => handleRoleUpdate(user)}
                        className="mr-2"
                      >
                        <UserCog className="w-4 h-4" />
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
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ManageUsers;
