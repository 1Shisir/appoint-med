import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const MyProfile = () => {

  const {userData, setUserData} = useContext(AppContext)

  const [willEdit, setWillEdit] = useState(0)

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      <img className='w-36 rounded' src={userData.image} alt="" />
      {
        willEdit
        ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name} onChange={e => setUserData(prev => ({...prev,name:e.target.value}))} />
        : <p className='text-neutral-800 font-medium text-3xl mt-4'>{userData.name}</p>
      }
      
      <hr className='bg-zinc-400 h-[1px] border-none'/>
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Email ID:</p>
          <p className='text-blue-600'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {
            willEdit
            ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone} onChange={e => setUserData(prev => ({...prev,phone:e.target.value}))} />
            : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Address:</p>
          {
            willEdit 
            ?<p>
              <input className='bg-gray-50' type="text" value={userData.address1} onChange={(e) => setUserData(prev => ({...prev,address : {...prev.address,line1:e.target.value}}))}/>
              <br />
              <input className='bg-gray-50' type="text" value={userData.address2} onChange={(e) => setUserData(prev => ({...prev,address : {...prev.address,line2:e.target.value}}))}/>
            </p>
            : <p className='text-gray-500'>
              {userData.address1}
              <br />
              {userData.address2}
            </p>
          }
        </div>
      </div>

      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            willEdit
            ?<select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({...prev,gender : e.target.value}))} value={userData.gender}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            : <p className='text-gray-500'>{userData.gender}</p>
          }
          <p className='font-medium'>Date-of-birth:</p>
          {
            willEdit
            ? <input className='max-w-28 bg-gray-100' type="date" onChange={(e) => setUserData(prev => ({...prev,dob : e.target.value}))} value={userData.dob}/>
            : <p className='text-gray-500'>{userData.dob}</p>
          }
        </div>
      </div>

      <div className='mt-10'>
        {
          willEdit 
          ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setWillEdit(false)}>Save information</button>
          : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all' onClick={() => setWillEdit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
