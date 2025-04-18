import { useState } from 'react';
import dropdown_list from '../dropdown.json';


const Dropdowns = ()=>{
        const [modalOpen, setModalOpen] = useState(false);
        const [count ,setCount] = useState(1); 

    const DropdownElement = [];
    for(let i=0;i<count;i++){
        const filtered = dropdown_list.filter((item)=>{
            // console.log("item category ",item.category , "ith index",i);
            console.log(item.category === i);
            return item.category === i+1;
        });
        console.log(filtered);
        DropdownElement.push(
            <div>
                <select className='mt-2 p-1 w-100 border border-info'>
            {filtered.map((items)=>(
                <option key={items.id}>{items.name}</option>
            ))}
                </select>
            </div>
        )
    }

    const handleIncrease =()=>{
        setCount(count+1);
    }
    const handleDecrease=()=>{
      setCount(count-1);
      if(count < 2){
        setModalOpen(false);
      }
    }

return(
    <div className='dropdown_page'>
    <div className='border bg-info d-flex justify-content-end'>
        <button className='btn btn-secondary m-3 fw-normal' onClick={() => setModalOpen(true)}>Click</button>
    </div>

    {
    modalOpen &&  (
        <div className="modal d-block" style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1050
        }}>
            <div className="modal-dialog border border-info border-5 rounded-4 mt-5">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Dropdown_List</h5>
                        <button className='ml-3 btn btn-secondary' onClick={handleIncrease}>+</button>
                        <button className='ml-3 btn btn-secondary' onClick={handleDecrease}>-</button>
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