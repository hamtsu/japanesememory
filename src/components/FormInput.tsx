import { FC, ChangeEvent} from 'react'

type FormInputProps = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    defaultValue?: string,
    title: string,
    placeholder: string,
    invalid?: boolean,
}

const FormInput: FC<FormInputProps> = ({ title, onChange, defaultValue, placeholder, invalid }) => {
    return (
        <label className='w-full'>
            <div className="opacity-80 text-md">{title}</div>
            <input onChange={onChange} placeholder={placeholder} defaultValue={defaultValue}
                className={`${invalid ? 'outline-red-400 outline-1' : ''} bg-slate-300 dark:bg-neutral-800 border-slate-300 dark:border-neutral-800 rounded-md transition-[border] outline-none border-b 
                focus:border-neutral-800 focus:dark:border-slate-200 p-1 px-2 text-md w-full`} />
        </label>

    )
}

export default FormInput