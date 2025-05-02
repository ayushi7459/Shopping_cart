import { useEffect, useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { EditOutlined } from '@ant-design/icons';
import { yupResolver } from "@hookform/resolvers/yup";
import locationData from '../location.json';
import ProfileSchema from "../features/profileSchema";
import bcrypt from 'bcryptjs';

type FormData = {
  image: string;
  email: string;
  country: string;
  city: string;
  state: string;
  zip: number;
  password?: string;
  subscribe:boolean
}


type Props = {
  onClose: () => void;
}

type LocationData = {
  countries : {country:string}[];
  states:{country:string; state:string}[];
  cities:{country:string; state:string; city:string}[]
}

const data = locationData as LocationData;

const ProfileForm = ({ onClose }: Props) => {


  const userData = localStorage.getItem("user");
  const getUser = userData ? JSON.parse(userData) : null;
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(ProfileSchema) as Resolver<FormData>,
  });
  

  useEffect(() => {
    if (getUser) {
      setValue("email", getUser.email)
      setValue("city", getUser.city)
      setValue("state", getUser.state)
      setValue("country", getUser.country)
      setValue("zip", getUser.zip)
      setValue("image", getUser.image);
      setSelectedCountry(getUser.country);
      setSelectedState(getUser.state);
      setSelectedCity(getUser.city);
    }
    else {
      reset();
    }
    register("subscribe");
  }, [register]);


  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const base64 = reader.result as string
        setValue("image", base64);
      }
    }
  };


  const onSubmit = (data: FormData) => {
    // console.log("submit");
    let userData;
    const salt = bcrypt.genSaltSync(11);
    let hashedPassword
    if(data.password){
     hashedPassword= bcrypt.hashSync(data.password,salt);
     userData = {
      ...data,
      password:hashedPassword,
      isLoggedin: true,
      Subscribtion:isSubscribed
    };
    }
    else{
      userData = {
        ...data,
        isLoggedin: true,
        Subscribtion:isSubscribed
      };
    }

    localStorage.setItem("user", JSON.stringify(userData));
    reset();
    setSelectedCountry("");
    setSelectedState("");
    onClose();
  };


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form_div">
          <div className="form-group">
            {getUser && getUser.image ?
              <div style={{ position: "relative", display: "inline-block", marginLeft: "38%" }}>

                <input type="file" id="editImageInput" name="image" onChange={onImageChange} accept="image/*" style={{ display: "none" }} />
                <label htmlFor="editImageInput" className="Edit_profile" style={{
                  position: "absolute",
                  top: "7px",
                  right: "8px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  border: "1px solid black",
                  backgroundColor: "white",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)"
                }}>
                  {/* edit icon */}
                  <EditOutlined />
                </label>

                <img src={getUser.image} alt="Profile Image" className="profile_image" />
              </div>
              :
              <div>
                <label htmlFor="inputAddress">Profile Image:</label>
                <input type="file" name="image" onChange={onImageChange} accept="image/*" className="btn m-3" />
              </div>
            }
            {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
          </div>

          {/* subscription */}
          <div>
          <button
              type="button"
              className={`btn ${isSubscribed ? "btn-danger" : "btn-secondary"} m-4`}
              onClick={(e) => {
                e.preventDefault();
                setIsSubscribed(!isSubscribed);
                setValue("subscribe", !isSubscribed);
              }}
            >
              {isSubscribed ? "🔔 Subscribed" : "Subscribe"}
            </button>

          </div>

          {/* email */}
          <div className="form-group">
            <label htmlFor={"inputEmail4"}>Email:</label>
            <input {...register("email")} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
            {errors.email && <p style={{ color: "red", fontSize:"8px"}}>{errors.email.message}</p>}
          </div>

          {/* password */}
          {
            isSubscribed &&
            <div className="form-group">
            <label htmlFor={"inputPassword4"}>Password:</label>
            <input {...register("password")} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
            {errors.password && <p style={{ color: "red",fontSize:"10px" }}>{errors.password.message}</p>}
          </div>
          }
         
          {/*Country */}
          <div className="form-group">
            <label htmlFor="inputCountry">Country:</label>
            <select {...register("country")} className="form-control" value={selectedCountry} id="inputCoutry" onChange={(e) => {
              const country = e.target.value;
              setSelectedCountry(country);
              setValue("country", country);
              setSelectedState("");
              setValue("state", "");
              setValue("city", "");
            }}>
              <option value="">Select Country...</option>
              {data.countries.map((location, index) => (
                <option key={index}>{location.country}</option>
              ))}
            </select>
            {errors.country && <p style={{ color: "red", fontSize:"8px" }}>{errors.country.message}</p>}
          </div>

          {/*State */}
          <div className="form-group">
            <label htmlFor="inputState">State:</label>
            <select {...register("state")} className="form-control" value={selectedState} id="inputState" onChange={(e) => {
              const state = e.target.value;
              setSelectedState(state);
              setValue("state", state);
              // setValue("city", "");
            }}>
              <option value="">Select state...</option>
              {data.states
                .filter((c) => c.country === selectedCountry)
                .map((s, index) => (
                  <option key={index} value={s.state}>
                    {s.state}
                  </option>
                ))}

            </select>
            {errors.state && <p style={{ color: "red" , fontSize:"8px"}}>{errors.state.message}</p>}
          </div>

          {/*City */}
          <div className="form-group">
            <label htmlFor="inputCity">City:</label>
            <select   {...register("city")} className="form-control" id="inputCity" value={selectedCity} onChange={(e) => {
              const city = e.target.value;
              setSelectedCity(city);
              setValue("city", city);
            }}>
              <option value="">Select City</option>
              {data.cities
                .filter((c) => c.country === selectedCountry && c.state === selectedState)
                .map((s, index) => (
                  <option key={index}>
                    {s.city}
                  </option>
                ))}
            </select>
            {errors.city && <p style={{ color: "red", fontSize:"8px" }}>{errors.city.message}</p>}
          </div>

          {/* zip */}
          <div className="form-group">
            <label htmlFor="inputZip">Zip:</label>
            <input {...register("zip")} type="text" className="form-control" id="inputZip" />
            {errors.zip && <p style={{ color: "red", fontSize:"8px" }}>{errors.zip.message}</p>}
          </div>
          
          <button type="submit" className="btn btn-outline-primary mt-3">Submit details</button>
        </div>
      </form>
    </>
  )
}



export default ProfileForm