"use client"
import { filter } from '@/public/icons';
import Image from 'next/image';

export default function Filter() {
  return (
    <div className='dropdown'>
      <button className="px-4 py-2 mr-3 flex items-center justify-center border rounded-md">
            <Image src={filter} alt="filter icon" width={25} height={20} />
            <span className="text-lg text-dark-gray">Filter</span>
        </button>

        <div className="dropdown-content">
            
        </div>
    </div>
  )
}
