export const Friends = ({starts, name}) => {
    return <div className="gap-3 mt-10 mb-2 flex justify-start">
        <div className="w-10 h-10 pt-1 rounded-full bg-yellow-500 text-2xl text-white font-medium text-center">{starts}</div>
        <div className="pt-1 text-center text-2xl font-bold">{name}</div>
    </div>
}