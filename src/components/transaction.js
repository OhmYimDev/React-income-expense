import Item from "./Item";
import './transaction.css';

const Transaction = (props) => {
    const {item} = props;
    
    return (
        <div>
            <ul className="item__list">
                {item.map((e) => {
                    return  <Item {...e} key={e.id} />
                })} 
            </ul>
        </div>
    )
}

export default Transaction