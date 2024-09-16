import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap 14 my-10 mt-40 text-sm '>
        {/* left section */}
        <div>
            <img  className = 'mb-5 w-40'src={assets.logo} alt="" />
            <p className='w-full md:w-1/2 text-gray-600 leading-6'>AppointMed,system designed to simplify healthcare access for patients featuring separate dashboards for administrators, doctors, and customers, allowing easy appointment scheduling, management, and communication all within a user-friendly interface</p>

        </div>

        {/* center section */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Ploicy</li>
            </ul>

        </div>

        {/* right section */}
        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+977 98xxxxxxx</li>
                <li>example.info@gmail.com</li>
            </ul>

        </div>
      </div>

      {/* copyright section */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2024 AppointMed - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
