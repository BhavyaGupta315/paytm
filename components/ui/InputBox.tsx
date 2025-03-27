interface InputBox {
    label: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

export const InputBox = ({label, placeholder, onChange, ...otherProps} : InputBox)=>{
    return <div>
        <div className="text-sm font-medium text-left py-2">
            {label}
        </div>
        <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" {...otherProps}/>
    </div>
}