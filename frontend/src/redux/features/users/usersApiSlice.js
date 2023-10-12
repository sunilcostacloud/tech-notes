import { apiSlice } from "../../api/apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result, error, arg) => {
                //  console.log("checkingUserResults", result)
                return [{ type: 'User', id: 'LIST' }]
            }
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice;