import React ,{ useState } from "react";
import { Row, Form, InputGroup, Col, FormControl, Button } from 'react-bootstrap';
import { FaTable, FaFilter, FaAngleRight } from "react-icons/fa";
import {
    FaUser, FaAt, FaLock, FaBuilding, FaPhone, FaEnvelope, FaPortrait
} from 'react-icons/fa';
import Table from "./Table";
import moment from "moment";
import DataJson from "../../utils/Data";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import DashboardService from '../../services/DashboardService';
import Services from '../../services/ReportTalkTimeService';
import { useEffect,useRef  } from 'react';
import CommonService from "../../services/CommonService";
let XLSX = require("xlsx");
const Dashboard = () => {
    const [objectDataOverview, setobjectDataOverview] = useState({
            dataOverview: {}
    });
    const [obejctPaging, setObjectPaging] = useState({
            limt: 10,
            totalRecord: 28,
            totalPage: 3,
            currentPage: 1
    });

    const [objectDetail, setobjectDetail] = useState({
        data: []
});

const [dataMember, setDataMember] = useState({
    data: [],
    
  });
  const [dataGroupMember, setDataGroup] = useState({
    data: [],
    
  });

const [obejctSearch, setKeySearch] = useState({
    tokenSearch: "",
    from: moment(),
    endTime: moment()
    
});



const handleInputChange = (event) => {
    let valueControl = event.target.value;
    let nameControl = event.target.name;

    setKeySearch((prevalue) => {
        return {
            ...prevalue,   // Spread Operator               
            [nameControl]: valueControl
        }
    })

}
const handleInputChangeDay = (event) => {
    if( event.target.value=="on")
    {
        setKeySearch((prevalue) => {
            return {
                    ...prevalue,              
                    from: moment().subtract(1, 'day'),
                    endTime: moment().subtract(1, 'day')
            }
        })
    }
    else 
    {
        setKeySearch((prevalue) => {
            return {
                    ...prevalue,              
                    from: moment().subtract(0, 'day'),
                    endTime: moment().subtract(0, 'day')
            }
        })

    }
    
}





const jsonProfile =  JSON.parse(localStorage.getItem('user-info'));

const roleUser = jsonProfile.role;

var isAdmin = false;
if(roleUser === "2" || roleUser === "5" || roleUser === "3" ) {
    isAdmin = true;
}

const dateForPicker = (dateString) => {
    return moment(new Date(dateString)).format('YYYY-MM-DD')
};

    const [isInit, setInit] = useState(false);
    const toHHMMSS = (secs) => {

                if(!isNaN(parseFloat(secs)) && isFinite(secs))
                {
                    
                }
                else 
                {
                    return  "";
                }
                var sec_num = parseInt(secs, 10)
                var hours   = Math.floor(sec_num / 3600)
                var minutes = Math.floor(sec_num / 60) % 60
                var seconds = sec_num % 60
            
                return [hours,minutes,seconds]
                    .map(v => v < 10 ? "0" + v : v)
                    .filter((v,i) => v !== "00" || i > 0)
                    .join(":")
    }

    const percentFix2 = (number) => {

        if(!isNaN(parseFloat(number)) && isFinite(number))
        {
                return number.toFixed(2) +"%";
        }
        return "";
    }

     const searchData = () => {
        getData();

    }
    
    const exportData = () => {
    
        let fromDate = obejctSearch.from;
        if(fromDate=="")
        {
            fromDate = null;
        }
        let bodySearch = {

                Token: obejctSearch.tokenSearch,
                Page: obejctPaging.currentPage,
                Limit: obejctPaging.limt,
                LineCode: obejctSearch.lineCode,
                phoneLog: obejctSearch.phoneLog,
                Disposition: obejctSearch.status,
                from:fromDate,
                memberId: obejctSearch.memberId,
                groupId: obejctSearch.groupId,
                to: obejctSearch.endTime

        };

        Services.exportData(  bodySearch, (response) => {
            if (response.statusCode === 200) {
                exportDataExcel(response.value.data);
            } else {



            }
        }, (error) => {

        });

    }

    const exportDataExcel = (dataReder) => {

        var DataExport = dataReder;
        const Heading = [
            [
                'Họ tên',
                'Line gọi',
                'Số HĐ',
                'Ngày',
                'Tổng cuộc gọi',
                'Phần trăm kết nối',
                'Tổng thời gian gọi',
                'Tổng thời gian chờ',
                'Thời gian đàm thoại',
                'Trả lời',
                'Không trả lời',
                'Cuộc gọi hủy',
                'Busy',
                'Kênh lỗi',
                'Không gọi được',
                'Lỗi server',
                'Thời gian tạo'

            ]
        ];
        let workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(DataExport,  
        { origin: 'A2', skipHeader: true }
        );
        XLSX.utils.sheet_add_aoa(workSheet, Heading, { origin: 'A1' });
   
        // const workSheet = XLSX.utils.json_to_sheet(DataExport);

        XLSX.utils.book_append_sheet(workBook, workSheet, `data`);
        
        let exportFileName = `talktimeReport.xls`;
        XLSX.writeFile(workBook, exportFileName);

    }

  

  const handleInputChangeChange = (event) => {
    let valueControl = event.target.value;
    let nameControl = event.target.name;

    setKeySearch((prevalue) => {
      return {
        ...prevalue, // Spread Operator
        [nameControl]: valueControl,
      };
    });

    getDataMember(valueControl);



  };
  const getDataMember = (groupId) => {
    let fromDate = obejctSearch.fromTime;
    if (fromDate == "") {
      fromDate = null;
    }
    let bodySearch = {
        groupId: groupId
      
    };
    CommonService.GetAllMemberByGroup(
      bodySearch,
      (response) => {
        if (response.statusCode === 200) {

            setDataMember((prew) => ({ ...prew, data: response.value.data }));

        } else {
        }
      },
      (error) => {}
    );
  };

  const getDataGroup = () => {
    let fromDate = obejctSearch.fromTime;
    if (fromDate == "") {
      fromDate = null;
    }
    let bodySearch = {
      
    };
    CommonService.GetAll(
      bodySearch,
      (response) => {
        if (response.statusCode === 200) {
            debugger;
            
            setDataGroup((prew) => ({ ...prew, data: response.value.data }));

        } else {
        }
      },
      (error) => {}
    );
  };

    const getData = ()=> {
           

            let fromDate = obejctSearch.from;
            if(fromDate=="")
            {
                fromDate = null;
            }
            let bodySearch = {
                // Token: obejctSearch.tokenSearch,
                Page: obejctPaging.currentPage,
                Limit: obejctPaging.limt,
                LineCode: obejctSearch.lineCode,
                memberId: obejctSearch.memberId,
                groupId: obejctSearch.groupId,
                from:fromDate,
                to: obejctSearch.endTime

            };
            
            DashboardService.getInformationOverviewDashboard(bodySearch, (response) => {
                        if (response.statusCode === 200) {
                        

                            setobjectDataOverview((prevalue) => {
                                return {
                                ...prevalue,   // Spread Operator               
                                 dataOverview: response.value.data[0]
                                }
                            })
                          
                            

                        } else {
                            
                        }
            }, (error) => {
                
            });
            
            DashboardService.getDetailOverview(bodySearch, (response) => {
              
                        if (response.statusCode === 200) {
                            setobjectDetail((prevalue) => {
                                            return {
                                            ...prevalue,   // Spread Operator               
                                            data: response.value.data
                                            }
                            })
                        }
                        else{

                        }

            }, (error) => {

            });

    }
    useEffect(() => {
        if(!isInit)
        {
             getData();
             getDataGroup();
             getDataMember(-1);
             setInit(true);
        }
    }, [objectDataOverview,objectDetail]);



    return (
        <div className="dashboard">
            <h2 className="tit-dash">Dashboard</h2>

            <form className='form-login'>
                    <div>

                        <Form>
                            <Row>
                                <Col>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Từ ngày:</Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text className="input-group-icon"><FaAt /></InputGroup.Text>
                                            <Form.Control
                                                type="date"
                                                name="from"
                                                value={dateForPicker(obejctSearch.from)}
                                                placeholder="Từ ngày"
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>

                                        
                                    </Form.Group>

                                    <Form.Check 
                                                type="switch"
                                                id="custom-switch"
                                                label="Ngày hôm qua"
                                                onChange={handleInputChangeDay}
                                                />
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Đến ngày:</Form.Label>
                                        <InputGroup className="mb-2">
                                            <InputGroup.Text className="input-group-icon"><FaAt /></InputGroup.Text>
                                            <Form.Control
                                                type="date"
                                                name="endTime"
                                                value={dateForPicker(obejctSearch.endTime)}
                                                placeholder="Đến ngày"
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>

                                            
                                </Col>
                                {
                                isAdmin? 

                            
                                <Col >

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>line gọi:</Form.Label>
                                        <InputGroup className="mb-2">
                                        <Form.Control
        type="text" name ="lineCode"  onChange={handleInputChange} value ={obejctSearch.lineCode} 
      />
                                        </InputGroup>
                                    </Form.Group>
                                </Col>



                      
                                
                            :<></>
                            }
                            </Row>
                            {isAdmin ? (
                <Row>
                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Nhóm:</Form.Label>
                      <InputGroup className="mb-2">
                    
                      <Form.Select
                          name="groupId"
                          value ={obejctSearch.groupId}
                          onChange={handleInputChangeChange}
                        >

                          <option value='0'>Tất cả</option>
                          {  dataGroupMember!=null &&dataGroupMember.data.map((item, index) => {
                                return <option value={item.id}>{item.name}</option>;
                            })
                          }
                          
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Thành viên:</Form.Label>
                      <InputGroup className="mb-2">
                    
                      <Form.Select
                          name="memberId"
                          value ={obejctSearch.memberId}
                          onChange={handleInputChange}
                        >

                          <option value='0'>Tất cả</option>
                          {  dataMember!=null &&dataMember.data.map((item, index) => {
                                return <option value={item.id}>{item.lineCode}:{item.userName}</option>;
                            })
                          }
                          
                        </Form.Select>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                </Row>
              ) : (
                <></>
              )}

                           
                        </Form>

                       



                    </div>
                </form>
                <div className="list-feature">
                    
                    <div className="search-feature">
                    { isAdmin?
                     <button className="btn-search"  onClick={exportData} >Xuất file</button> : <></> 
                     }
                    
                        <button className="btn-search"  onClick={searchData} >Tìm kiếm</button>
                    </div>
                </div>


            <div className="list-box-info">
                <div className="box-detail-info">
                    <h4 className="tit-info">Tổng cuộc gọi {objectDataOverview.dataOverview.sumCall}</h4>
                    <Link className="link-info" to="/">
                        <span>View details</span>
                        <FaAngleRight className="icon-link" />
                    </Link>
                </div>
                <div className="box-detail-info">
                    <h4 className="tit-info">Tổng hợp đồng {objectDataOverview.dataOverview.sumNoAgree}</h4>
                    <Link className="link-info" to="/">
                        <span>View details</span>
                        <FaAngleRight className="icon-link" />
                    </Link>
                </div>
                <div className="box-detail-info">
                    <h4 className="tit-info">Kết nối {percentFix2(objectDataOverview.dataOverview.perpercent)}</h4>
                    <Link className="link-info" to="/">
                        <span>View details</span>
                        <FaAngleRight className="icon-link" />
                    </Link>
                </div>
                <div className="box-detail-info">
                    <h4 className="tit-info">Talktime {toHHMMSS(objectDataOverview.dataOverview.timeTalking)}</h4>
                    <Link className="link-info" to="/">
                        <span>View details</span>
                        <FaAngleRight className="icon-link" />
                    </Link>
                </div>
            </div>

            <div className='box-tbl'>
                <h4 className='box-tit'>
                    <FaTable className="icon-tit" />
                    BC Talktime
                </h4>

                <Table theadData={ DataJson.theadDataDashboard } tbodyData={ objectDetail.data } tblClass="tbl-custom-data" />

            
            </div>
        </div>
    );
};

export default Dashboard;