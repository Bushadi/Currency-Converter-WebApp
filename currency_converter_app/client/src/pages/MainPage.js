import React, {useEffect, useState} from 'react';
import axios from "axios";

export default function MainPage() {
    //states for the form fields
    const [date,setDate] = useState(null);
    const [sourceCurrency,setsourceCurrency] = useState(null);
    const [targetCurency,settargetCurency] = useState(null);
    const [amountInSourceCurrency,setamountInSourceCurrency] = useState(0);
    const [amountInTargetCurrency,setamountInTargetCurrency] = useState(0);
    const [currencyNames,setcurrencyNames] = useState([]);
    const [loading,setLoading] = useState(false);

    //handleSubmit method
    const handleSubmit = async (e) =>{
        e.preventDefault();
        //console.log(date, sourceCurrency, targetCurency, amountInSourceCurrency);
        try {
            const responce = await axios.get(
                "http://localhost:5000/convert",{
                params:{date,sourceCurrency,targetCurency,amountInSourceCurrency},
            });
            setamountInTargetCurrency(responce.data);
            setLoading(true);

        } catch (error) {
            console.error(error);
            
        }
    }

    //get all currency names
    useEffect(()=>{
        const getCurrencyNames = async () => {
            try {
                const responce = await axios.get(
                    "http://localhost:5000/getAllCurrencies"
                );
                setcurrencyNames(responce.data);
            } catch (err) {
                console.log(err);    
            }
        }
        getCurrencyNames();
    },[])

  return (
    <div>
        <h1 className='lg:mx-32 text-5xl font-bold text-green-500'>Convert Your Currencies</h1>
        <p className='lg:mx-32 opacity-40 py-8'>
            Easily convert between international currencies in real time. 
            Perfect for travelers, online shoppers, and businesses needing 
            accurate exchange rates on the go. Stay informed and make smarter 
            financial decisions anywhere, anytime.
        </p>
        <div className='mt-5 flex items-center justify-center flex-col'>
            <section className='w-full lg:w-1/2'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label 
                            htmlFor='date' 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Date
                        </label>
                        <input 
                            onChange={(e)=>setDate(e.target.value)}
                            id={date}
                            name={date}
                            type="date"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            placeholder="name@flowbite.com" 
                            required 
                        />
                    </div>
                    <div className="mb-5">
                        <label 
                            htmlFor='sourceCurrency' 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Source Currency
                        </label>
                        <select 
                            onChange={(e)=>setsourceCurrency(e.target.value)}
                            id={sourceCurrency}
                            name={sourceCurrency}
                            value={sourceCurrency}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                        >
                            <option>select source curency</option>
                            {Object.keys(currencyNames).map((currency)=>(
                                <option className='p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <label 
                            htmlFor='targetCurency' 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Target Currency
                        </label>
                        <select 
                            onChange={(e)=>settargetCurency(e.target.value)}
                            id={targetCurency}
                            name={targetCurency}
                            value={targetCurency}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                        >
                            <option>select target curency</option>
                            {Object.keys(currencyNames).map((currency)=>(
                                <option className='p-1' key={currency} value={currency}>
                                    {currencyNames[currency]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-5">
                        <label 
                            htmlFor='amountInSourceCurrency' 
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Amount in source Currency
                        </label>
                        <input 
                            onChange={(e)=>setamountInSourceCurrency(e.target.value)}
                            type='number'
                            id={amountInSourceCurrency}
                            name={amountInSourceCurrency}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" 
                            placeholder="Amount in source Currncy" 
                            required 
                        />
                    </div>
                    <button className='bg-green-700 hover:bg-green-800
                     text-white font-medium py-2 px-4 rounded-md'>
                        Get the target currency
                    </button>
                </form>
            </section>
        </div>
        {loading?(
            <section className='mt-5 lg:mx-60 text-xl'>
            {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to {""}
            <span className='text-green-500 font-bold'>{amountInTargetCurrency}</span> {currencyNames[targetCurency]}
        </section>
        ):null} 
    </div>
  )
}
