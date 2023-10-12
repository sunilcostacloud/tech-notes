import { useNavigate, useParams } from "react-router-dom"
import { useGetUserByIdQuery, useUpdateUserMutation } from "../../redux/features/users/usersApiSlice";
import { Button, Dialog, DialogContent, LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";

const EditUser = () => {
    const { id } = useParams();
    const { data, isFetching, isError, error, isSuccess } = useGetUserByIdQuery(id)
    const [username, setUserName] = useState("");

    const [updateUser, {
        isFetching: updateIsFetching,
        isSuccess: updateIsSuccess,
        isError: updateIsError,
        error: updateError,
        reset
    }] = useUpdateUserMutation()

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        updateUser({ id: data._id, username, roles: data?.roles, active: data?.active })
    }

    useEffect(() => {
        setUserName(data?.username)
    }, [data])

    useEffect(() => {
        if (updateIsSuccess) {
            alert("user successfully updated")
            reset()
            setOpen(false)
        } else if (updateIsError) {
            alert(updateError?.data?.message)
            reset()
        }
    }, [updateIsSuccess, updateIsError])

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h1>EditUser</h1>
            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "5px" }}>
                <button onClick={() => navigate(-1)}>Go Back</button>
            </div>
            {
                isFetching ? (
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
                ) : isSuccess ? (
                    <>
                        <div style={{ display: "flex", justifyContent: "center" }} >
                            <div>
                                <h2>Username: {data?.username}</h2>
                                <h3>Status: {JSON.stringify(data?.active)}</h3>
                                <Button variant="outlined" onClick={handleClickOpen}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <input type="text" defaultValue={data?.username} value={username} onChange={(e) => setUserName(e.target.value)} />
                                <button onClick={handleUpdate} disabled={updateIsFetching}>{updateIsFetching ? "Loading.." : "Update"}</button>
                            </DialogContent>
                        </Dialog>
                    </>
                ) : ""
            }

        </div>
    )
}

export default EditUser