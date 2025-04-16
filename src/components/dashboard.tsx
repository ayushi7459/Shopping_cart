import products from "../mock.json";
import Card from "./card";
import ProfileForm from "./ProfileForm";
import { useNavigate } from "react-router-dom";
import { Avatar} from "antd";
import {useState  } from "react";
import { UserOutlined } from "@ant-design/icons";



const Dashboard = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(products);

    const userdata = localStorage.getItem("user");
    const user  = userdata ? JSON.parse(userdata): null;


    const handleClick = () => {
        navigate("/cart");
    };

    const handleClickOnProfile = () => {
        setShowModal(true);
    };

    const handleSearch=(e: React.ChangeEvent<HTMLInputElement>)=>{
        const search = e.target.value.toLowerCase();
        if(search===""){
            setFilteredProducts(products);
        }
        if(search.trim()!=""){
            const filtered = products.filter((item)=>{
               return item.name.toLowerCase().includes(search);
            })
            setFilteredProducts(filtered);
        }
    }
     
    return (
        <>
             <nav className="navbar navbar-light bg-dark d-flex justify-content-end m-0">
                <div className="container d-flex justify-content-end m-1">
                            <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={handleSearch}
                                onKeyDown={(e)=>{
                                    if(e.key == 'Enter'){
                                        e.preventDefault();
                                    }
                                }}
                            />
                           
                            </form>
                            <div className="ms-auto d-flex justify-content-between align-items-center gap-2">
                            {!user ? (
                                <button className="btn btn-light" onClick={() => setShowModal(true)}>
                                Login
                                </button>
                            ) : (
                                <button type="submit" className="btn" onClick={handleClickOnProfile}>
                                {user && user.image ? (
                                    <div
                                    className="avatar_image"
                                    style={{
                                        width: "30px",
                                        height: "30px",
                                        borderRadius: "50%",
                                        backgroundImage: `url(${user.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                    ></div>
                                ) : (
                                    <Avatar style={{ backgroundColor: "black" }} icon={<UserOutlined />} />
                                )}
                                </button>
                            )}
                            <button className="btn btn-light" onClick={handleClick}>
                                Cart
                            </button>
                            </div>
                </div>
             </nav>


            <div className="px-3 py-3 item_conatiner">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-lg-5 gx-1 gy-3 row_class d-flex flex-wrap gap-4 justify-content-center">
                    {filteredProducts.length > 0 ?
                    (
                        filteredProducts.map((item,id)=>(
                            <div key={id} className="col" style={{width:"11rem"}}>
                                <Card id={item.id} imageUrl={item.imageUrl} name={item.name} price={`Price: $${item.price}`} quantity={0}/>
                            </div>
                        ))
                    )
                    :
                    ( 
                       <p>no result found</p>
                    )
                    }
                    
                </div>
            </div>


            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Profile</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)}>
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* form */}
                                <ProfileForm onClose={() => {
                                        setShowModal(false);
                                    }}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dashboard;
