import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, sortUsers } from "../../../store/userSlice";

import { MdOutlineAddCircleOutline } from "react-icons/md";

import Button from "../../../UI/Button";
import AdminAddUser from "./AdminAddUser";
import AdminUpdateUser from "./AdminUpdateUser";
import AdminDeleteUser from "./AdminDeleteUser";
import SearchBar from "../../../components/Search/AdminSearchBar";
import { USER_SORT_OPTIONS } from "../../../utils/sortOptions";

export default function AdminUsers() {
  const { list = [], error, loading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [addOpen, setAddOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [openFilters, setOpenFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  // console.log("admin:", list);

  const [sortIndex, setSortIndex] = useState(0);

  useEffect(() => {
    const { sortBy, order } = USER_SORT_OPTIONS[sortIndex];
    dispatch(sortUsers({ sortBy, order }));
  }, [dispatch, sortIndex]);

  const [filters, setFilters] = useState({
    role: "all",
    country: "all",
    state: "all",
    gender: "all",
  });

  const filteredUsers = useMemo(() => {
    let result = [...list];

    if (filters.role !== "all") {
      result = result.filter((u) => u.role === filters.role);
    }

    if (filters.country !== "all") {
      result = result.filter((u) => u.address.country === filters.country);
    }

    if (filters.state !== "all") {
      result = result.filter((u) => u.address.state === filters.state);
    }

    if (filters.gender !== "all") {
      result = result.filter((u) => u.gender === filters.gender);
    }

    return result;
  }, [filters, list]);

  function handleOpenFilters() {
    setOpenFilters(!openFilters);
  }

  if (loading) return <p className="para">Loading...</p>;
  if (error) return <p className="para">{error}</p>;

  return (
    <div className="admin-users-page">
      <h2>Users</h2>
      <div className="admin-user-header-buttons">
        <div className="search-bar-user" style={{ margin: "2rem" }}>
          <SearchBar />
        </div>

        <div className="sort-bar" style={{ marginRight: "0rem" }}>
          <Button onClick={() => setAddOpen(true)}>
            {" "}
            <MdOutlineAddCircleOutline /> Add User
          </Button>

          <select
            value={sortIndex}
            onChange={(e) => setSortIndex(Number(e.target.value))}
          >
            {USER_SORT_OPTIONS.map((option, index) => (
              <option key={option.label} value={index}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="filters-open">
            <Button onClick={handleOpenFilters}>
              {openFilters ? "Close Filters" : "View Filters"}
            </Button>
            {openFilters && (
              <div className="admin-user-filters">
                <select
                  value={filters.role}
                  onChange={(e) =>
                    setFilters({ ...filters, role: e.target.value })
                  }
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
                <select
                  value={filters.country}
                  onChange={(e) =>
                    setFilters({ ...filters, country: e.target.value })
                  }
                >
                  <option value="all">All Countries</option>
                  <option value="USA">United States</option>
                  <option value="Canada">Canada</option>
                </select>
                <select
                  value={filters.state}
                  onChange={(e) =>
                    setFilters({ ...filters, state: e.target.value })
                  }
                >
                  <option value="all">All States</option>
                  <option value="California">California</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                  <option value="New York">New York</option>
                  <option value="Illinois">Illinois</option>
                  <option value="Pennsylvania">Pennsylvania</option>
                  <option value="Ohio">Ohio</option>
                  <option value="Georgia">Georgia</option>
                  <option value="North Carolina">North Carolina</option>
                  <option value="Michigan">Michigan</option>
                </select>
                <select
                  value={filters.gender}
                  onChange={(e) =>
                    setFilters({ ...filters, gender: e.target.value })
                  }
                >
                  <option value="all">All Genders</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <Button
                  onClick={() =>
                    setFilters({
                      role: "all",
                      country: "all",
                      state: "all",
                      gender: "all",
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-users-grid">
        {filteredUsers.map((u) => (
          <div className="admin-user-card" key={u.id}>
            <div className="admin-user-profile-header">
              <div className="admin-user-img">
                <img src={u.image} alt={u.firstName} />
              </div>
              <div className="admin-user-header-info">
                <h4>
                  {u.firstName} {u.lastName}
                </h4>
                <p>{u.role}</p>
                <p className="admin-user-loaction">
                  {u.address.city}, {u.address.country}
                </p>
              </div>
            </div>
            <Button onClick={() => setEditUser(u)}>Edit</Button>
            <Button onClick={() => setDeleteUser(u)}>Delete</Button>
          </div>
        ))}
      </div>
      {addOpen && <AdminAddUser onClose={() => setAddOpen(false)} />}
      {editUser && (
        <AdminUpdateUser onClose={() => setEditUser(null)} user={editUser} />
      )}
      {deleteUser && (
        <AdminDeleteUser
          onClose={() => setDeleteUser(null)}
          user={deleteUser}
        />
      )}
    </div>
  );
}
