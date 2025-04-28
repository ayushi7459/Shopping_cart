import { useRef, useState } from "react";

const OddEvenPair = () => {


const input = useRef<HTMLInputElement | null>(null);
const fabonacciInput = useRef<HTMLInputElement | null>(null);
const [fabonacciSeries,setFabonacciSeries] = useState<Array<number>>([]);
const [primeSeries,setPrimeSeries] = useState<Array<number>>([]);


const handlePrime = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const number = Number(input.current?.value);

    if (number <= 1) {
        setPrimeSeries([]);
        return;
    }

    const series = [];
    for (let i = 2; i <= number; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            series.push(i);
        }
    }
    setPrimeSeries(series);
}


    const handleFabonacci =(e: React.FormEvent<HTMLFormElement>)=>{
        
        e.preventDefault();
        const number = fabonacciInput.current?.value
        const count = Number(number)
        
            if(count===0){
                setFabonacciSeries([0])
            }
            if(count===1){
                setFabonacciSeries([0,1])
            }
            else if (count>1){
                let series = [0,1]
                let sum = 0

                for(let i=2; ;i++){
                    sum = series[i-1] + series[i-2];
                    if(sum > count){
                        break;
                    }
                series.push(sum)
                }
                setFabonacciSeries(series);
        }
    }


    return (
        <div className="container py-5">
        <div className="row justify-content-center">
            {/* prime , composite number*/}
            <div className="col-md-6 col-sm-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center">Prime number / composite number</h4>
    
                        <form onSubmit={handlePrime} className="d-flex flex-column gap-3">
                            <input
                                type="number"
                                className="form-control w-50"
                                placeholder="Enter numbers"
                                ref={input}
                            />
                            <button type="submit" className="btn btn-primary fw-bold w-50"> Submit
                            </button>
                        </form>
                        <div className="mt-3">{primeSeries.map((item,index)=>(
                            <span key={index}>{item}, </span>
                        ))}</div>
                    </div>
                </div>
            </div>

            {/* fabonacci */}
            <div className="col-md-6 col-sm-12">
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h4 className="card-title mb-4 text-center">Fabonacci Series</h4>

                         <form onSubmit={handleFabonacci} className="d-flex flex-column gap-3">
                            <input
                                type="number"
                                className="form-control w-50"
                                placeholder="Enter numbers"
                                ref={fabonacciInput}
                            />
                            <button
                                type="submit"  className="btn btn-warning w-50 fw-bold"> Submit
                            </button>
                        </form>
                        <div className="mt-3">{fabonacciSeries.map((item,index)=>(
                            <span key={index}>{item}, </span>
                        ))}</div>
                    </div>
                </div>       
            </div>
        </div>
    </div>
    );
};

export default OddEvenPair;