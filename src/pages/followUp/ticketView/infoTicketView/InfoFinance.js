import { Col, InputGroup, FormControl, Form } from 'react-bootstrap';
import moment from "moment"; 
const InfoFinance = ({data, handleInputChange}) => {

    const dateForPicker = (dateString) => {
        return moment(new Date(dateString)).format('YYYY-MM-DD');

    };


    function numberWithCommas(x) {

        if(x =='' || x == null)
        {
            return '';
        }
        return x.toLocaleString();
    }

    return (
        <Col>
            <Form.Label>Thông tin tài chính</Form.Label>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Ngày ký</InputGroup.Text>
                <FormControl readOnly type="date" value ={dateForPicker(data.registerDay)} onChange={handleInputChange}  aria-label="Small"  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Nợ Gốc</InputGroup.Text>
                <FormControl readOnly  aria-label="Small" value = {numberWithCommas(data.debitOriginal)} name ="debitOriginal" onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Tiền vay</InputGroup.Text>
                <FormControl readOnly aria-label="Small" value = {numberWithCommas(data.amountLoan)} name = "amountLoan" onChange={handleInputChange}   />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Trả tháng(EMI)</InputGroup.Text>
                <FormControl readOnly aria-label="Small"  value ={numberWithCommas(data.emi)} name ="emi" onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Tổng phạt</InputGroup.Text>
                <FormControl readOnly  aria-label="Small" value = {numberWithCommas(data.totalFines)} name ="totalFines" onChange={handleInputChange}   />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Tổng phải trả</InputGroup.Text>
                <FormControl readOnly aria-label="Small" value = {numberWithCommas(data.totalMoneyPaid)} name ="totalMoneyPaid" onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Kỳ hạn TT</InputGroup.Text>
                <FormControl readOnly  aria-label="Small" value = {data.tenure} name ="tenure" onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Số kỳ đã TT</InputGroup.Text>
                <FormControl readOnly aria-label="Small" value = {data.noTenure} name = "noTenure" onChange={handleInputChange}   />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Tổng đã TT</InputGroup.Text>
                <FormControl readOnly  aria-label="Small" value = {numberWithCommas(data.totalPaid)} name = "totalPaid"  onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>TT gần nhất</InputGroup.Text>
                <FormControl readOnly aria-label="Small" value = {numberWithCommas(data.lastPaid)} name ="lastPaid" onChange={handleInputChange}  />
            </InputGroup>
            <InputGroup size="sm" className="mb-1">
                <InputGroup.Text>Ngày TT</InputGroup.Text>
                <FormControl readOnly  type ="text" aria-label="Small" value ={dateForPicker(data.lastPadDay)} name ="lastPadDay"  onChange={handleInputChange}  />
            </InputGroup>
        </Col>
    );
};

export default InfoFinance;