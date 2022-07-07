import React, { useState, useRef } from 'react'
import Cards from 'react-credit-cards'
import toast, { Toaster } from 'react-hot-toast';

export default function PaymentForm(){
    const formulario = useRef(null);
    const [state, setState] = useState({
        number: '',
        name: '',
        cvc: '',
        expiry: '',
        focus: ''
    })
    const handleFocus = (e) => {
        setState({
            ...state,
            focus: e.target.name
        })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ 
            ...state,
            [name]: value 
        });
    }
    const submitPayment = () => {
        const data = new FormData(formulario.current);
        console.log(...data.entries())
        const objectData = Object.fromEntries([...data.entries()])
        console.log(objectData)
        if(!objectData.name.trim()){
            return(
                toast.error("Missing name field")
            )
        }
        if(!objectData.number.trim()){
            return(
                toast.error("Missing number field")
            )
        }
        if(!objectData.expiry.trim()){
            return(
                toast.error("Missing expiry field")
            )
        }
        if(!objectData.cvc.trim()){
            return(
                toast.error("Missing cvv field")
            )
        }
        toast.success(
            "Successful transaction\nName: " + state.name + "\nNumber: "+ state.number + "\nExpiry: "+ state.expiry + "\nCVV: " + state.cvc,
            {
              duration: 6000,
            }
        );
    }
    const limpiar = () => {
        setState({
            number: '',
            name: '',
            cvc: '',
            expiry: '',
            focus: ''
        })
        credit_form.reset();
    }
    return(
        <div className="card mx-auto" >
            <Toaster />
            <div className="card-body m-3">
                <label htmlFor="title">Current credit card</label>
                <Cards
                    cvc={state.cvc}
                    expiry={state.expiry}
                    focused={state.focus}
                    name={state.name}
                    number={state.number}
                    preview={true}
                />
                <form id="credit_form" ref={formulario}>
                    <div className="form-group my-3">
                        <label htmlFor="Nombre">Name of card holder</label>
                        <input
                            type="text"
                            className="form-control form-custom-control"
                            name="name"
                            maxLength="50"
                            placeholder="Name"
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="form-group my-3">
                        <label htmlFor="number">Credit card number</label>
                        <input
                            type="text"
                            className="form-control form-custom-control"
                            name="number"
                            maxLength="16"
                            placeholder="Número de tarjeta"
                            onChange={handleChange}
                            onFocus={handleFocus}
                        />
                    </div>
                    <div className="row my-3">
                        <div className="form-group col-md-6">
                            <label htmlFor="expiry">Expiration</label>
                            <input
                                type="text"
                                className="form-control form-custom-control"
                                name="expiry"
                                maxLength="5"
                                placeholder="Expiración"
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="cvc">CVV</label>
                            <input
                                type="text"
                                className="form-control form-custom-control"
                                name="cvc"
                                maxLength="3"
                                placeholder="CVC"
                                onChange={handleChange}
                                onFocus={handleFocus}
                            />
                        </div>
                    </div>
                    <div className="row my-3 ">
                        <div className="form-group col-md-6 ">
                            <button
                                type="button"
                                className="btn btn-custom-payment btn-block btn-lg"
                                onClick={submitPayment}
                            >Make Payment</button>
                        </div>
                        <div className="form-group col-md-6">
                            <button
                                type="button"
                                className="btn btn-custom-cancel btn-block btn-lg"
                                onClick={limpiar}
                            >Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}