import { useState } from "react";

const OddEvenPair = () =>{
      const [input, setInput] = useState('');
      const [oddEven,setOddEven] = useState<Array<string>>([]);
      const [remainingOdd , setRemainingOdd] = useState<Array<string>>([]);
      const [remainingEven , setRemainingEven] = useState<Array<string>>([]);

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(input);
        const array = input.split(" ");
        console.log(array)
        const even = array.filter((num) => Number(num) % 2 === 0);
        const odd = array.filter((num)=>
            Number(num) %2 !== 0
        )
        console.log("Type od odd",typeof(odd))

        const n = Math.min(even.length , odd.length);
        const result = [];

        for(let i=0;i<n;i++){
            result.push(`[${odd[i]},${even[n-i-1]}]`);
        }
        setOddEven(result);

        const leftOdd = odd.slice(n);
        const leftEven = even.slice(0, even.length - n);

        setRemainingOdd(leftOdd);
        setRemainingEven(leftEven);
        // console.log(oddEven);
        console.log("Remaining Odd:", leftOdd);
        console.log("Remaining Even:", leftEven);

        setInput("");
    }

    return(
            <div className="p-4 mx-auto">
              <h4 className="font-bold mb-4">Odd-Even Pairing</h4>
        
              <form onSubmit={handleSubmit}>
                <input type="text" className="p-2 mb-2" value={input} onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-black px-4 py-2 rounded">
                  Submit
                </button>
              </form>
        
              <div className="mt-4">
                <h4 className="font-semibold">Pairs (Odd, Even): {oddEven}</h4>
        
                <h4 className="font-semibold mt-4">Left odd: {remainingOdd.toString()}</h4>
                <h4 className="font-semibold mt-4">Left even: {remainingEven.toString()}</h4>
               

              </div>
            </div>
          );
        };

export default OddEvenPair;