import { useFormStatus } from "react-dom"


const ConfirmOrder = ({state}: {state: string | null}) => {
    const { pending } = useFormStatus();
    return (
        <>
        <button className='btn btn-sm' type='submit' disabled={pending}>{pending ? 'Submitting Order' : 'Confirm Order'}</button>
        {
            state ? 
            <div style={{background: 'var(--light-oak)', padding: '2rem', border: '1px solid var(--oak)',borderRadius: '5px', textAlign: 'center'}}>
            <p className={``} style={{fontSize: '.875rem', lineHeight: '1.5', fontWeight: '600', textWrap: 'balance'}}>{state}</p> 
            </div>: null
        }
        </>
    )
}

export default ConfirmOrder;