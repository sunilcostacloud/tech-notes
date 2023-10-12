import { useGetUsersQuery } from "../redux/features/users/usersApiSlice"
import { Link } from 'react-router-dom'

const Users = () => {
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 20000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // console.log("checkUserError", error)

    return (
        <div>
            <Link to="/">Go to Home</Link>
            <hr />
            {isError ? <h1>{error?.data?.message}</h1> :
                <h1>
                    Users
                    {JSON.stringify(data)}
                </h1>}
        </div>
    )
}

export default Users