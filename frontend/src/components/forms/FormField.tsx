interface FormFieldProps {
    label: string
    name: string
    type: string
}

function FormField({ label, name, type }: FormFieldProps) {
    return (
        <fieldset className="py-2 px-5">
            <legend>{label}</legend>
            <input name={name} type={type} className="w-full border shadow" />
        </fieldset>
    )
}

export default FormField