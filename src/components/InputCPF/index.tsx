import { useRef } from 'react'
import { IMaskInput } from "react-imask"

export function InputCPF({ handleCPF }: any) {
    const ref = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)
    return (
        <div>
            <IMaskInput
                ref={ref}
                mask={"000.000.000-00"} inputRef={cpfRef}
                onAccept={(value, mask) => handleCPF(value)} />
        </div>
    )
}