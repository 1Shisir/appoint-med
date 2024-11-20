import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorProfile = () => {

  const {dToken, profiledata, setProfileData, getProfileData} = useContext(DoctorContext)
  const {backendUrl,currency, slotDateFormat} = useContext(AppContext)


  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return  profiledata &&(
    <div>

      <div className='flex flex-col gap-4 m-5'>

        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profiledata.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* doci info  name degree experience*/}
          <p>{profiledata.name}</p>
          <div>
            <p>{profiledata.degree} - {profiledata.speciality}</p>
            <button>{profiledata.experience}</button>
          </div>

          {/* doctor about */}
          <div>
            <p>About</p>
            <p>{profiledata.about}</p>
          </div>

          <p>Appointment fee: <span>{currency}{profiledata.fees}</span> </p>

          <div>
            <p>Address</p>
            <p>{profiledata.address}</p>
          </div>

          <div>
            <input type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          <button>Edit</button>

        </div>

      </div>
      
    </div>
  )
}

export default DoctorProfile
