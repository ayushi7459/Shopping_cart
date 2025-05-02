import React, { useEffect, useState } from 'react';
import { DeleteFilled } from '@ant-design/icons'

const ListPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]); 
    const [isChecked , setIsChecked] = useState<boolean>(false);
    let [checkedList, setCheckedList] = useState<Array<string>>([]);

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

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const search = e.target.value;
        const searchValue = search.toLowerCase();
        if(search.trim() != ""){
            const filtered = allUsers.filter((user)=>{
               return user.firstName.toLowerCase().includes(searchValue);
            })
            setUsers(filtered);
        }
        else{
            setUsers(allUsers);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
    
        if (name === "allSelect") {
            setIsChecked(checked);
            const allIds = users.map((user) => user.id.toString());
            setCheckedList(checked ? allIds : []);
        }
        else {
                let updatedList = [...checkedList];
                if (checked) {
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
        setUsers(filteredUsers);
        setAllUsers(filteredUsers);
    
        setCheckedList([]);
        setIsChecked(false);
    };
    
    

    return (
        <>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light overflow-visible">
                    <div className="container-fluid">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        id="navbarDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Filter
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleFilter("male")}>
                                                Male
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleFilter("female")}>
                                                Female
                                            </button>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={() => handleFilter("all")}>
                                                Reset
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                            <div className='mr-4'>
                                <button className='btn btn-primary' onClick={handleDelete}><DeleteFilled /></button>
                          
                            </div>
                            <form className="d-flex">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search by Name"
                                    aria-label="Search"
                                    onChange={handleSearch}
                                    onKeyDown={(e)=>{
                                        if(!isNaN(Number(e.key)) && e.key!==' '){
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </form>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="container-fluid">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th className='d-flex'>
                                <input
                                type="checkbox"
                                className="form-check-input ml-3"
                                name="allSelect"
                                onChange={handleChange}
                                />
                            </th>
                            <th scope="col">First Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                 <td className='d-flex'>
                                    <input
                                    type="checkbox" 
                                    className="form-check-input ml-3"
                                    name={user.id.toString()}
                                    checked={checkedList.includes(user.id.toString())}
                                    onChange={handleChange}
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
        </>
    );
};

export default ListPage;

//i want to delete the selected value on click on deleted button



// else {
//     if (checked) {
//         checkedList.push(name);
//         // console.log(checkedList);
//     } else {
//          checkedList = checkedList.filter((id) => id !== name);
//     }
//     setCheckedList(checkedList);
// }