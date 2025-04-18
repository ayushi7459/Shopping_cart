import { ChangeEvent, useState } from 'react';
import dropdown_list from '../dropdown.json';


const Dropdowns = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [count, setCount] = useState(1);

    const DropdownElement = [];
    const selectedItem :string[] = []

    const handleChange =(e:ChangeEvent<HTMLSelectElement>)=>{
        console.log(e.target.value);
        selectedItem.push(e.target.value);
        console.log(selectedItem)
    }

    for (let i = 0; i < count; i++) {
        const filtered = dropdown_list.filter((item) => {
            return item.category === i + 1;
        });
        DropdownElement.push(
            <div key={dropdown_list[i].id}>
                <select className='mt-2 p-1 w-100 border border-info' onChange={handleChange}>
                <option value="" >Select...</option>
                    {filtered.map((items) => (
                        <option
                        key={items.id}
                        value={items.category}
                        >{items.name}</option>
                    ))} 
                </select>
            </div>
        )
    }

    const handleIncrease = () => {
        setCount(count + 1);
    }
    const handleDecrease = () => {
        setCount(count - 1);
        if (count < 2) {
            setModalOpen(false);
        }
    }

    return (
        <div className='dropdown_page'>
            <div className='border bg-info d-flex justify-content-end'>
                <button className='btn btn-secondary m-3 fw-normal' onClick={() => setModalOpen(true)}>Click</button>
            </div>

            {
                modalOpen && (
                    <div className="modal d-block" style={{
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}>
                        <div className="modal-dialog border border-info border-5 rounded-4 mt-5">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Dropdown_List</h5>
                                    <button className='ml-3 btn btn-secondary shadow  rounded' onClick={handleIncrease}>+</button>
                                    <button className='ml-3 btn btn-secondary shadow  rounded' onClick={handleDecrease}>-</button>
                                    <button
                                        type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                                </div>
                                <div className="modal-body">
                                    {DropdownElement}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Close</button>
                                    <button type="button" className="btn btn-info" onClick={() => setModalOpen(false)}>Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Dropdowns;