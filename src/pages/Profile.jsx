import {useState} from "react";
import {getAuth, updateProfile} from "firebase/auth";
import { useNavigate } from "react-router";
import {updateDoc} from "firebase/firestore"
import { toast } from "react-toastify";
import {db} from "../firebase";
export default function Profile() {
  const auth=getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false)


const [formData,setFormData] = useState({
  name:auth.currentUser.displayName,
  email:auth.currentUser.email,
});

const {name,email}=formData;
function onLogout() {
  auth.signOut();
  navigate("/");
}
function onChange(e){
  setFormData((prevState)=>({
    ...prevState,
    [e.target.id]:e.target.value,
  }));
}
async function onSubmit() {
  try {
    if(auth.currentUser.displayName !== name){
      // update displayName in firebase auth
      await updateProfile(auth.currentUser,{
        displayName:name
      });
  // update Name in firestore
  const docRef=(db,"users",auth.currentUser.uid)
  await updateDoc(docRef, {
  name,
  });
  
  
    }
    toast.error("Could not update the Profile Details");
    
    
  } catch (error) {
    toast.success("Profile details updated");
  }
  
   }
  



  




  return (
    <>
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
      <h1 className='text-3xl text-center mt-6 font-bold'>My Profile</h1>
    <div className="w-full md:w-[50%] mt-6 px-3">
      <form>
        {/*Name Input*/}

        <input type="text" id ="name" value={name} disabled={!changeDetail} 
        onChange={onChange}
        className={`mb-6 w-full px-4  py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`}/>


      {/*Email Input*/}

      <input type="email" id ="email" value={email} disabled className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"/>

    <div className="flex-justify-between whitespace-nowrap txt-sm:text-lg">
      <p className="flex items-center mb-6">Do You Want to Change Your Name?
        <span onClick={()=>{
          changeDetail && onSubmit();
        setChangeDetail((prevState)=>!prevState)
        }}
         className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
         >
         {changeDetail ? "Apply Change":"Edit"}
         </span>
      </p>

      <p onClick={onLogout}
      className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer">Sign Out</p>
    </div>
 

      </form>
    </div>
    
    
    
    
    
    
    
    </section>
    






    
    </>
  )
}
