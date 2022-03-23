import { useState, useEffect } from 'react';
import './form.css';
import { v4 as uuidv4 } from 'uuid';



const FormComponent = (props) => {
     
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [formValid, setFormValid] = useState(false);

    const inputTitle = (e) => {
        setTitle(e.target.value)
    }
    
    const inputAmount = (e) => {
        setAmount(e.target.value)
    }
    
    const saveItem = (e) => {
        e.preventDefault()
        const itemData = {
            id:uuidv4(),
            title:title,
            amount:Number(amount)
        }
        props.onAddItem(itemData)
        setTitle('')
        setAmount(0)
    }

    //Check value from input.
    useEffect(() => {
        const checkData = title.trim().length > 0 && amount !== 0
        if (checkData) {
            setFormValid(checkData)
        }
    },[title, amount])
    
    return (
        <div>
            <form onSubmit={saveItem}>
                <div className='form__control'>
                    <label>ชื่อรายการ</label>
                    <input type='text' value={title} placeholder='ระบุชื่อรายการของคุณ' onChange={inputTitle}/>
                </div>

                <div className='form__control'>
                    <label>จำนวนเงิน</label>
                    <input type='number' value={amount} placeholder='(+ รายรับ , - รายจ่าย)' onChange={inputAmount}/>
                </div>

                <div>
                    <button className='btn' type='submit' disabled={!formValid}>เพิ่มข้อมูล</button>
                </div>
            </form>
        </div>
    )
}

export default FormComponent