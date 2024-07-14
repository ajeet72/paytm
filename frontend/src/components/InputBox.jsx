

export const InputBox = ({heading, placeholder, onChange}) => {
    return <div className="pb-6">
        <label className="block">
          <span className="block text-sm font-bold text-black text-start">
            {heading}
          </span>
          <input onChange={onChange} type="email" name="email" className="mt-1 px-3 py-2 bg-white border-slate-300 border placeholder-slate-400 focus:outline-none block w-full rounded-md sm:text-sm focus:ring-1" placeholder={placeholder} />
        </label>
    </div>
}