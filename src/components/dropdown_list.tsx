import { useState } from 'react';
import dropdown_list from '../dropdown.json';
import Select from 'react-select';

const Dropdown_menu = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedValues, setSelectedValues] = useState<{ [key: number]: string[] }>({});
    const [count, setCount] = useState(1);

    let Dropdowns = [];

    for (let i=0; i<count; i++) {
        const filtered_list = dropdown_list.filter((item) => (item.category === i + 1));
        // console.log(filtered_list);
        
        Dropdowns.push(
            <div key={i} className="mb-3">
                <Select 
                    key={i}
                    className="form-multi-select"
                    id="ms1"
                    isMulti
                    data-coreui-search="global"
                    options={filtered_list && filtered_list.map((option) => (
                        {
                            value: option.name,
                            label: option.name
                        }
                    ))}
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
                    <div className='modal d-block'
                        style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <div className='modal-dialog mt-5'>
                            <div className="modal-content border border-info border-5 rounded-4">
                                <div className="modal-header">
                                    <h5 className="modal-title">Multi Select Dropdowns</h5>
                                    <button className="btn btn-secondary mx-2" onClick={handleIncrease}>
                                        +
                                    </button>
                                    <button className="btn btn-secondary mx-2" onClick={handleDecrease}>
                                        -
                                    </button>
                                    <button className="btn-close" onClick={() => setShowModal(false)} />
                                </div>
                                <div className="modal-body">{Dropdowns}</div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                    <button
                                        className="btn btn-info"
                                        onClick={() => {
                                            console.log('Selected Values:', selectedValues);
                                            setShowModal(false);
                                        }}
                                    >
                                        Save changes
                                    </button>
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