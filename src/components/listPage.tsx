import React, { useEffect, useState } from 'react';
import { DeleteFilled, FilterOutlined, SearchOutlined } from '@ant-design/icons';

const ListPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [checkedList, setCheckedList] = useState<Array<string>>([]);

    const fetchUser = async () => {
        const data = await fetch("https://dummyjson.com/users");
        const userData = await data.json();
        setUsers(userData.users);
        setAllUsers(userData.users);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const handleFilter = (gender: string) => {
        if (gender === "all") {
            setUsers(allUsers);
        } else {
            const filtered = allUsers.filter((user) => user.gender === gender);
            setUsers(filtered);

        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        const searchValue = search.toLowerCase();
        if (search.trim() != "") {
            const filtered = allUsers.filter((user) => {
                return user.firstName.toLowerCase().includes(searchValue);
            })
            setUsers(filtered);
        }
        else {
            setUsers(allUsers);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        if (name === "allSelect") {
            setIsChecked(checked);
            const allIds = users.map((user) => user.id.toString());
            // console.log("allIds",allIds)
            setCheckedList(checked ? allIds : []);
            // console.log("checkedList",checkedList)
        }
        else {
            let updatedList = [...checkedList];
            if (checked) {
                // console.log(name)
                updatedList.push(name);
            } else {
                updatedList = updatedList.filter((id) => id !== name);
            }
            setCheckedList(updatedList);
        }
    };

    const handleDelete = () => {
        const filteredUsers = users.filter(
            (user) => !checkedList.includes(user.id.toString())
        );
        setUsers(filteredUsers)
        setAllUsers(filteredUsers)
        setCheckedList([])
        setIsChecked(false)
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-3">
                <div className="container-fluid">
                    <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="filterDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FilterOutlined className='mr-2' />Filter
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                                    <li><button className="dropdown-item" onClick={() => handleFilter("male")}>Male</button></li>
                                    <li><button className="dropdown-item" onClick={() => handleFilter("female")}>Female</button></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={() => handleFilter("all")}>Reset</button></li>
                                </ul>
                            </li>
                        </ul>

                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-outline-danger d-flex align-items-center" onClick={handleDelete}>
                                <DeleteFilled style={{ marginRight: 4 }} />
                                Delete
                            </button>

                            <form className="d-flex">
                                <div className='d-flex align-item-center justify-content-center border rounded p-1'>
                                    <SearchOutlined className='ml-1 mr-1' />
                                    <input
                                        className="form-control"
                                        style={{ border: "none", outline: "none", boxShadow: "none" }}
                                        type="search"
                                        placeholder="Search by Name"
                                        aria-label="Search"
                                        onChange={handleSearch}
                                        onKeyDown={(e) => {
                                            if (!isNaN(Number(e.key)) && e.key !== ' ') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            {/* table */}
            <div className="container-fluid shadow p-3 mb-5 bg-white rounded" style={{ width: "90%" }}>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: "5%" }}>
                                    <input
                                        type="checkbox"
                                        name="allSelect"
                                        checked={isChecked}
                                        onChange={handleChange}
                                    />
                                </th>
                                <th>First Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th>Country</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            name={user.id.toString()}
                                            onChange={handleChange}
                                            checked={checkedList.includes(user.id.toString())}
                                        // checked={isChecked}
                                        />
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.address.country}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default ListPage;







// else {
//     if (checked) {
//         checkedList.push(name);
//         // console.log(checkedList);
//     } else {
//          checkedList = checkedList.filter((id) => id !== name);
//     }
//     setCheckedList(checkedList);
// }