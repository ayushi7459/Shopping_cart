import { useState } from 'react';
import rawDropdown from '../dropdown.json';
// import makeAnimated from 'react-select/animated';
import Select from 'react-select';

type dropdownItems = {
    name:string,
    id:number,
    category:number
}

const dropdown_list :dropdownItems[] = rawDropdown;

const Dropdown_menu = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedValues, setSelectedValues] = useState<{ [key: number]: string[] }>({});
    const [count, setCount] = useState(1);
    // const animatedComponents = makeAnimated();

    
    const storedOptions = localStorage.getItem("selected_values");
    const Options = storedOptions ? JSON.parse(storedOptions): [];

    const renderDropdowns = () =>{
        let Dropdowns = [];
        for (let i=0; i<=count; i++) {
            const filtered_list = dropdown_list.filter((item) => (item.category === i + 1));
            // console.log(filtered_list);

            const options = filtered_list.map(option => ({
                value: option.name,
                label: option.name
              }));

            const preselectValues = Options[i+1] && Options[i+1].map((val:string)=>({
                value:val,
                label:val
            }))
            console.log("preselectValues:",preselectValues);

            Dropdowns.push(
                <div key={i} className="mb-3">
                    <Select
                        className="form-multi-select"
                        id="ms1"
                        isMulti
                        // isLoading
                        // components={animatedComponents}
                        options={options}
                        defaultValue={preselectValues}
                        onChange={(selectedOptions) =>
                            setSelectedValues((ele) => ({
                                ...ele,
                                [i + 1]: selectedOptions ? selectedOptions.map((option) => option.value) : [],
                            }))
                        }
                    />
                </div>
            )
        }
        return Dropdowns;
    }

    // console.log(selectedValues);

    const handleIncrease = () => {
        setCount(count + 1);
    }
    const handleDecrease = () => {
        setCount(count - 1);
        if (count < 1) {
            setShowModal(false);
        }
    } 

    return (
        <div className='dropdown_page'>
            <div className="border bg-info d-flex justify-content-end">

                <button className='btn btn-secondary m-3' onClick={() => { setShowModal(true) }}>Click
                </button>

                {showModal &&
                    <div className='modal d-block overlay'>
                        <div className='modal-dialog modal-dialog-centered'>
                            <div className="modal-content border border-info border-5 rounded-4">
                                <div className="modal-header">
                                    <button className="btn btn-secondary mx-2" onClick={handleIncrease}> + </button>
                                    <button className="btn btn-secondary mx-2" onClick={handleDecrease}> - </button>
                                    <button className="btn-close" onClick={() => setShowModal(false)} />
                                </div>
                                <div className="modal-body">{renderDropdowns()}</div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => {
                                            console.log('Selected Values:', selectedValues);
                                            setShowModal(false);
                                            localStorage.setItem("selected_values" ,JSON.stringify(selectedValues));
                                        }}> Save changes </button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dropdown_menu