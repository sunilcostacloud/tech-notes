import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Users from './components/users/Users'
import PersistLogin from './components/PersistLogin'
import AdminPage from './components/AdminPage'
import ManagerPage from './components/ManagerPage'
import UserPage from './components/UserPage'
import { ROLES } from './config/roles'
import RequireAuth from './components/RequireAuth'
import Unauthorized from './components/Unauthorized'
import Missing from './components/Missing'
import EditUser from './components/users/EditUser'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="unauthorized" element={<Unauthorized />} />

      <Route element={<PersistLogin />}>
        <Route path="/" element={<Home />} />
        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<EditUser />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin-page" element={<AdminPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
          <Route path="/manager-page" element={<ManagerPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.Employee]} />}>
          <Route path="/user-page" element={<UserPage />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<Missing />} />
    </Routes>
  )
}

export default App