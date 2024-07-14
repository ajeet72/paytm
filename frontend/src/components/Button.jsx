

export const Button = ({label, onClick}) => {
    return <div className="flex justify-center">
        <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm w-full py-2.5 px-4 mb-2 dark:hover:bg-gray-700">{label}</button>
    </div>
}