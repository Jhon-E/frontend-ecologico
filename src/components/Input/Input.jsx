'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Input = ({ type, placeholder, icon, value, setValue }) => {
  return (
    <>
      <div className="flex flex-row gap-1 bg-white/80 rounded-md items-center p-2 text-black border-gray-500 border-[1px]">
        {icon ? <FontAwesomeIcon icon={icon} height={26} width={24} color="gray" /> : ''}
        <input
          className="w-full ml-1 py-2 bg-transparent outline-none"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
        />
      </div>
    </>
  )
}

export default Input
