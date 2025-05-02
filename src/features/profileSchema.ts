import * as yup from 'yup';

//validation using regex
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
let regexEmail = /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._-]{0,62}[a-zA-Z0-9]@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;


const ProfileSchema = yup.object().shape({
  image: yup.string().min(5, "upload valid image").required("This field is required"),

  email: yup.string()
    .matches(regexEmail, "Invalid email format") // regex
    .required("This field is required"),
  
  country: yup.string().required("This field is required"),
  state: yup.string()
    .default("")
    .transform((value) => value ?? "")
    .when("country", {
      is: (val: string) => val?.length > 0,
      then: (schema) => schema.required("State is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

    
  city: yup.string()
    .default("")
    .transform((value) => value ?? "")
    .when("state", {
      is: (val: string) => val?.length > 0,
      then: (schema) => schema.required("City is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  zip: yup.number().required("This field is required").min(5, "Zip should be 5 number"),
  
  subscribe : yup.boolean().required(),

  password: yup.
  string().
  notRequired()
  .when("subscribe",{
    is:true,
    then:(schema)=> schema
    .required("password is required")
    .matches(regexPassword,"password must conatain at least 8 charaacters, including uppercase, lowercase , number and a special character")
  })
})

export default ProfileSchema;

//  issue : without subscription the form is not getting submit this issue
//  is because of some validation or while i save data in localStorage 