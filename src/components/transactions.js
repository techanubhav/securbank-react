import './transactions.css';
import shopicon from '../resources/shop_icon.svg';
import financeicon from '../resources/finance_icon.svg';
import entertainmenticon from '../resources/entertainment_icon.svg';

export default function Transactions() {
    return (
        <div className='transactions'>
            <h4 className='sectionHeading'>Latest Transactions</h4>
            <table id="transactionList">
                <tr>
                    <td><img src={shopicon} alt="" /></td><td><strong>Farmer's Shop</strong><br/>15/05/2023</td><td>Grocery</td><td>Card Payment</td><td>-$345</td>
                </tr>
                <tr>
                    <td><img src={financeicon} alt="" /></td><td><strong>Mobile Bill</strong><br/>15/05/2023</td><td>Finance</td><td>Transfer</td><td>-$95</td>
                </tr>
                <tr>
                    <td><img src={financeicon} alt="" /></td><td><strong>Internet Bill</strong><br/>13/05/2023</td><td>Finance</td><td>Transfer</td><td>-$220.40</td>
                </tr>
                <tr>
                    <td><img src={entertainmenticon} alt="" /></td><td><strong>Cinema</strong><br/>12/05/2023</td><td>Entertainment</td><td>Card Payment</td><td>-$20</td>
                </tr>
                <tr>
                    <td><img src={shopicon} alt="" /></td><td><strong>Farmer's Shop</strong><br/>12/05/2023</td><td>Grocery</td><td>Card Payment</td><td>-$23</td>
                </tr>

            </table>
        </div>
    )
}