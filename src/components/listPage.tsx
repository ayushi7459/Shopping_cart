import { useEffect, useState } from 'react';

const ListPage = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [allUsers, setAllUsers] = useState<any[]>([]); 

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
        // console.log(e.target.value);
        const search = e.target.value;
        const searchValue = search.toLowerCase();
        if(search.trim() != ""){
            const filtered = allUsers.filter((user)=>{
               return user.firstName.toLowerCase().includes(searchValue);
            })
            // console.log("->",filtered);
            setUsers(filtered);
        }
        else{
            setUsers(allUsers);
        }
    }
    

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
                            <th scope="col">S.no</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <th>{index + 1}</th>
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
