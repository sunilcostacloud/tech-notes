import {
    useAddNewUserMutation,
    useDeleteUserMutation,
    useGetUsersQuery,
} from "../../redux/features/users/usersApiSlice";
import { Link, useNavigate } from "react-router-dom";
import {
    Button,
    Dialog,
    DialogContent,
    Grid,
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { ROLES } from "../../config/roles";

const Users = () => {
    const navigate = useNavigate();
    const { data, isFetching, isSuccess, isError, error } = useGetUsersQuery(
        "usersList",
        {
            pollingInterval: 20000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true,
        }
    );

    const [
        deleteUser,
        { isSuccess: isDelSuccess, isError: isDelError, error: delerror, reset },
    ] = useDeleteUserMutation();

    const [
        addNewUser,
        {
            isLoading: addIsLoading,
            isSuccess: addIsSuccess,
            isError: addIsError,
            error: addError,
            reset: addReset,
        },
    ] = useAddNewUserMutation();

    const columns = [
        {
            id: "Name",
            label: "Name",
            minwidth: 60,
            align: "left",
            background: "#755139FF",
        },
        {
            id: "Roles",
            label: "Roles",
            minwidth: 60,
            align: "left",
            background: "#755139FF",
        },
        {
            id: "actions",
            label: "Actions",
            minwidth: 60,
            align: "center",
            background: "#755139FF",
        },
    ];

    const handleDeleteClick = async (e, id) => {
        // console.log(id)
        await deleteUser({ id });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (isDelSuccess) {
            alert("user Deleted Succesfully");
            reset();
        } else if (isDelError) {
            alert(delerror?.data?.message);
        }
    }, [isDelSuccess, isDelError]);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Link to="/">Go to Home</Link>
                <h1>Users</h1>
                <div></div>
            </div>
            <hr />
            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        width: "95%",
                        margin: "auto",
                        paddingTop: "10px",
                    }}
                >
                    <div>
                        <TextField
                            id="standard-basic"
                            label="Add User"
                            variant="standard"
                        />
                        <Button variant="contained" size="large" onClick={handleClickOpen}>
                            Add
                        </Button>
                    </div>
                </div>
                {isFetching ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <LinearProgress style={{ width: "100%", marginTop: "20px" }} />
                    </div>
                ) : isError ? (
                    <div
                        style={{ width: "100%", display: "flex", justifyContent: "center" }}
                    >
                        <h4>{error?.data?.message}</h4>
                    </div>
                ) : data?.length == 0 ? (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <h1>No Data Found</h1>
                    </div>
                ) : isSuccess ? (
                    <>
                        <div style={{ width: "95%", margin: "auto" }}>
                            <Grid container>
                                <Grid
                                    item
                                    xs={12}
                                    style={{
                                        width: "100%",
                                        overflowX: "auto",
                                        display: "inline-grid",
                                        marginTop: "10px",
                                    }}
                                >
                                    <TableContainer component={Paper}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{
                                                            minWidth: column.minWidth,
                                                            background: column.background,
                                                            color: "#fff",
                                                        }}
                                                    >
                                                        {column.label}
                                                    </TableCell>
                                                ))}
                                            </TableHead>

                                            <TableBody>
                                                {data?.map((row) => {
                                                    return (
                                                        <TableRow
                                                            hover
                                                            role="checkbox"
                                                            tabIndex={-1}
                                                            key={row._id}
                                                            style={{
                                                                background: "#F2EDD7FF",
                                                            }}
                                                        >
                                                            <TableCell align="left">{row.username}</TableCell>
                                                            <TableCell
                                                                align="left"
                                                                style={{ display: "flex", gap: "10px" }}
                                                            >
                                                                {row.roles?.map((item) => (
                                                                    <div key={item}>{item},</div>
                                                                ))}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "space-between",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        variant="contained"
                                                                        color="secondary"
                                                                        onClick={() =>
                                                                            navigate(`/users/${row._id}`)
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        variant="contained"
                                                                        color="error"
                                                                        onClick={(event) =>
                                                                            handleDeleteClick(event, row._id)
                                                                        }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                ) : (
                    ""
                )}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        lskdjkfj
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default Users;
