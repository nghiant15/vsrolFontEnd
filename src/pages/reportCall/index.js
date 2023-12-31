import React, { useState } from "react";
import { Row, Form, InputGroup, Col, FormControl, Button } from 'react-bootstrap';
import {
    FaUser, FaAt, FaLock, FaBuilding, FaPhone, FaEnvelope, FaPortrait
} from 'react-icons/fa';
import { FaTable, FaFilter } from "react-icons/fa";
import Table from "./Table";
import moment from "moment";
import DataJson from "../../utils/Data";
import Model from "../../components/model/Model";
import ModelAddUser from "./ModelUser";
import "./User.scss";
import { useEffect, useRef } from 'react';
import ConstantData from '../../utils/Constants';
import EmployeeService from '../../services/ReportService';
import Paging from "./Paging";
import { toast } from 'react-toastify';
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-bootstrap-time-picker';
import Swal from 'sweetalert2'
import { findAllInRenderedTree } from "react-dom/test-utils";
let XLSX = require("xlsx");

const User = () => {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isInit, setInit] = useState(false);
    const [obejctPaging, setObjectPaging] = useState({
        limt: 10,
        totalRecord: 28,
        totalPage: 3,
        currentPage: 1
    });
    const [obejctSearch, setKeySearch] = useState({
        tokenSearch: "",
        linecode: "",
        timeTalkBegin: 0,
        timeTalkEnd: 600,
        timeFrom1: 21600,
        timeFrom2: 68400,
        noAgree: "",
        fromTime: moment(),
        endTime: moment()
    });

    const [value, onChange] = useState(new Date());

    const [model, setmodel] = useState({

    });
    const exportData = () => {
 
        let fromDate = obejctSearch.fromTime;
        if(fromDate=="")
        {
            fromDate = null;
        }
        let timeTalkBegin =obejctSearch.timeTalkBegin;
        let timeTalkEnd = obejctSearch.timeTalkEnd;
        let timeFrom1 = obejctSearch.timeFrom1;
        let timeFrom2 = obejctSearch.timeFrom2;
        let noAgree = obejctSearch.noAgree;
        let bodySearch = {
            timeTalkBegin: obejctSearch.timeTalkBegin,
            timeTalkEnd: obejctSearch.timeTalkEnd,
            timeFrom1: obejctSearch.timeFrom1,
            timeFrom2: obejctSearch.timeFrom2,
            Token: obejctSearch.tokenSearch,
            Page: obejctPaging.currentPage,
            Limit: obejctPaging.limt,
            LineCode: obejctSearch.lineCode,
            phoneLog: obejctSearch.phoneLog,
            Disposition: obejctSearch.status,
            from:fromDate,
            to: obejctSearch.endTime,
            noAgree: obejctSearch.noAgree
        };

        EmployeeService.exportData(  bodySearch, (response) => {
            if (response.statusCode === 200) {
                exportDataExcel(response.value.data);
            } else {



            }
        }, (error) => {

        });

    }
    const dateForPicker = (dateString) => {
        return moment(new Date(dateString)).format('YYYY-MM-DD')
    };
    
    const jsonProfile =  JSON.parse(localStorage.getItem('user-info'));

    const roleUser = jsonProfile.role;

    var isAdmin = false;
    if(roleUser === "2" || roleUser === "4" || roleUser === "5" || roleUser === "3" ) {
        isAdmin = true;
    }

    const handleInputChange = (event) => {
        debugger;
        let valueControl = event.target.value;
        let nameControl = event.target.name;

        setKeySearch((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [nameControl]: valueControl
            }
        })

    }

    const SetTimeTalk1Change = (time) => {
        
        let valueControl = time;
        let nameControl =  "timeTalkBegin";

        setKeySearch((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [nameControl]: valueControl
            }
        })

    }
    const SetTimeTalk2Change = (time) => {
        
        let valueControl = time;
        let nameControl =  "timeTalkEnd";

        setKeySearch((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [nameControl]: valueControl
            }
        })

    }

 
    const SetTimeFrom1Change = (time) => {
        
        let valueControl = time;
        let nameControl =  "timeFrom1";

        setKeySearch((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [nameControl]: valueControl
            }
        })

    }
    const SetTimeFrom2Change = (time) => {
        
        
        let valueControl = time;
        let nameControl =  "timeFrom2";

        setKeySearch((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                [nameControl]: valueControl
            }
        })

    }

    const [employeeItem, setDataItem] = useState({
        "id": "12",
        "fullName": "",
        "userName": "",
        "phoneNumber": "",
        "email": "",
        "address": "",
        "RoleIdL": "1",
        "companyName": "2"
    });

    const exportDataExcel = (dataReder) => {

        var DataExport = dataReder;
        const Heading = [
        [
            'Line gọi',
            'Thời gian gọi',
            'Số điện thoại',
            'Time talking',
            'Tổng thời  gian gọi',
            'File Ghi âm',
            'Số HĐ'


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

    const handleUpdateById = (id) => {
        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                id: id
            }
        });
        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                isView: false
            }
        });
        setIsOpenModel(!isOpenModel);
    }

    const handleViewById = (id) => {
        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                id: id
            }
        });
        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                isView: true
            }
        })


        setIsOpenModel(!isOpenModel);
    }


    const handleExportData = () => {
        let bodySearch = {
            Token: obejctSearch.tokenSearch,
            Page: obejctPaging.currentPage,
            Limit: obejctPaging.limt

        };
        EmployeeService.exportData(ConstantData.URL_Employee_GetALl, ConstantData.HEADERS, bodySearch, (response) => {
            if (response.statusCode === 200) {
                exportDataExcel(response.value.data);
            } else {



            }
        }, (error) => {

        });

    }





    const [dataEmployee, setData] = useState({
        tbodyDataUser: [

        ],
    });


    useEffect(() => {

        if (!isInit) {

            document.title = "Danh sách nhân viên";
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const token = params.get('token');

            //  console.log(token)//123
            if (token != null && token != "") {
                let valueControl = token;
                let nameControl = "tokenSearch";

                setKeySearch((prevalue) => {
                    return {
                        ...prevalue,   // Spread Operator               
                        [nameControl]: valueControl
                    }
                })


            }
            getData();
            setInit(true);
        }




    }, [obejctPaging]);

    const btnSerachKey = useRef(null);

    const handleAddUser = (data) => {

        setIsOpenModel(!isOpenModel);
        toast.success('Thêm thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        getData();
    }



    const handleUpdate = (data) => {

        toast.success('Câp nhật thành công!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        getData();
    }

    const SearchData = () => {
        let fromTime =obejctSearch.fromTime;
        let linecode = obejctSearch.linecode;
        let phoneLog = obejctSearch.phoneLog;

        let noAgree = obejctSearch.noAgree;
        if(fromTime !='' && fromTime != null)
        {
            fromTime = fromTime;
        }
        let endTime =obejctSearch.endTime;

        let page = 1;
        

        if(endTime !='' && endTime != null)
        {
            endTime = endTime;
        }
         var urlPag= "/bao-cao-du-lieu-goi";
      
        urlPag +='?page=' +page;
        if(fromTime !='' && fromTime !='')
        {
            urlPag +='&fromTime=' +fromTime;
        }
       
        if(endTime !='' && endTime !='')
        {
            urlPag +='&endTime=' +endTime;
        }
        if(noAgree != null && noAgree !='' && noAgree !='')
        {
            urlPag +='&appid=' +noAgree;
        }
        if(linecode !='' && linecode !='')
        {
            urlPag +='&linecode=' +linecode;
        }
        if(phoneLog != null && phoneLog !='' && phoneLog !='')
        {
            urlPag +='&phoneLog=' +phoneLog;
        }
    
        window.location.replace(urlPag);
    }
    const handlePaging = (data) => {
           let fromTime =obejctSearch.fromTime;
        let linecode = obejctSearch.linecode;
         let phoneLog = obejctSearch.phoneLog;

      
        let noAgree = obejctSearch.noAgree;
        if(fromTime !='' && fromTime != null)
        {
            fromTime = fromTime;
        }
        let endTime =obejctSearch.endTime;

        if(endTime !='' && endTime != null)
        {
            endTime = endTime;
        }


         var urlPag= "/bao-cao-ghi-am";
      
        urlPag +='?page=' +data;
        if(fromTime !='' && fromTime !='')
        {
            urlPag +='&fromTime=' +fromTime;
        }
        
        if(endTime !='' && endTime !='')
        {
            urlPag +='&endTime=' +endTime;
        }

        if(linecode != null && linecode !='' && linecode !='')
        {
            urlPag +='&linecode=' +linecode;
        }
        if(noAgree != null && noAgree !='' && noAgree !='')
        {
            urlPag +='&appid=' +noAgree;
        }
        if(phoneLog != null && phoneLog !='' && phoneLog !='')
        {
            urlPag +='&phoneLog=' +phoneLog;
        }
        if(phoneLog != null && phoneLog !='' && phoneLog !='')
        {
            urlPag +='&phoneLog=' +phoneLog;
        }
       
        
         window.location.replace(urlPag);
       

        return;
        // const key = 'currentPage';
        // const value = data;
        // setObjectPaging(prevState => ({
        //     ...prevState,
        //     [key]: value
        // }
        // ));
        // getData();

        // setInit(false);
    }



    const getData = () => {
        const search = window.location.search;
        const query = new URLSearchParams(search);
        const page = query.get('page');
        const limit = query.get('limit');
        const fromDateQuery = query.get('fromTime');
        const toDateQuerry = query.get('endTime');

        let linecodeInput = query.get('linecode');
        let phoneLogInput = query.get('phoneLog');

        let noAgreeInput = query.get('appid');





        let timeTalkBeginQuery = query.get('timeTalkBegin');
        let timeTalkEndQuerry = query.get('timeTalkEnd');

        let timeFrom1Input = query.get('timeFrom1');
        let timeFrom2Input = query.get('timeFrom2');
        // if(typeof num1 == 'number')
        // {
        //     let valueControl =linecode;
        //     let nameControl ="linecode";
        //     setKeySearch((prevalue) => {
        //         return {
        //             ...prevalue,   // Spread Operator               
        //             [nameControl]: valueControl
        //         }
        //         })

            
        //  }
        // else {
           
        //     linecode = obejctSearch.linecode;
           
        // }
        if( linecodeInput!= null && linecodeInput !="")
        {
                let valueControl =linecodeInput;
                let nameControl ="linecode";
                setKeySearch((prevalue) => {
                    return {
                        ...prevalue,   // Spread Operator               
                        [nameControl]: valueControl
                    }
                 })
         }
         else 
         {
            linecodeInput = obejctSearch.linecode;
         }

         if( phoneLogInput!= null && phoneLogInput !="")
         {
                 let valueControl =phoneLogInput;
                 let nameControl ="phoneLog";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            phoneLogInput = obejctSearch.phoneLog;
          }

       
          if( noAgreeInput!= null && noAgreeInput !="")
         {
                 let valueControl =noAgreeInput;
                 let nameControl ="noAgree";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            if( obejctSearch.noAgree)
            {
                noAgreeInput = obejctSearch.noAgree;
            }
           
          }
        
        if( timeTalkBeginQuery!= null && timeTalkBeginQuery > -1)
         {
                 let valueControl =timeTalkBeginQuery;
                 let nameControl ="timeTalkBegin";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            timeTalkBeginQuery = obejctSearch.timeTalkBegin;
          }


          if( timeTalkEndQuerry!= null && timeTalkEndQuerry > -1)
         {
                 let valueControl =timeTalkEndQuerry;
                 let nameControl ="timeTalkEnd";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            timeTalkEndQuerry = obejctSearch.timeTalkEnd;
          }

          
    
         

          if( timeFrom1Input!= null && timeFrom1Input  > 0)
         {
                 let valueControl =timeFrom1Input;
                 let nameControl ="timeFrom1";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            timeFrom1Input = obejctSearch.timeFrom1;
          }
         
          if( timeFrom2Input!= null && timeFrom2Input > 0)
         {
                 let valueControl =timeFrom2Input;
                 let nameControl ="timeFrom2";
                 setKeySearch((prevalue) => {
                     return {
                         ...prevalue,   // Spread Operator               
                         [nameControl]: valueControl
                     }
                  })
          }
          else 
          {
            timeFrom2Input = obejctSearch.timeFrom2;
          }
        if( fromDateQuery!= null && fromDateQuery !="")
        {
                let valueControl =fromDateQuery;
                let nameControl ="fromTime";
                setKeySearch((prevalue) => {
                    return {
                        ...prevalue,   // Spread Operator               
                        [nameControl]: valueControl
                    }
                    })
         }
        else {
            fromDateQuery = obejctSearch.fromTime;

        }

        if( toDateQuerry!= null && toDateQuerry !="")
        {
                let valueControl =toDateQuerry;
                let nameControl ="endTime";
                setKeySearch((prevalue) => {
                    return {
                        ...prevalue,   // Spread Operator               
                        [nameControl]: valueControl
                    }
                 })
         }
         else 
         {
            toDateQuerry = obejctSearch.endTime;
         }
         
        
            if( page!= null && page !="")
            {
                        let valueControl =page*1;
                        let nameControl ="Page";
                        setKeySearch((prevalue) => {
                            return {
                                ...prevalue,   // Spread Operator               
                                [nameControl]: valueControl
                            }
                            })
                        

                            setObjectPaging((prevalue) => {
                                return {
                                    ...prevalue,   // Spread Operator               
                                    ["currentPage"]: valueControl
                                }
                                })
    
    

                        
            }

            let fromDate = fromDateQuery;

          
            if(fromDate=="")
            {
                fromDate = null;
            }

            let toDateRquest = toDateQuerry;
            if(fromDate=="")
            {
                toDateRquest = null;
            }
            



            let bodySearch = {
                Token: obejctSearch.tokenSearch,
                Page: obejctPaging.currentPage,
                Limit: obejctPaging.limt,
                linecode: linecodeInput, 
                
                phoneLog: phoneLogInput,
                Disposition: obejctSearch.status,
                from:fromDate,
                noAgree:  noAgreeInput,
                to: toDateRquest
            };

            if(page)
            {
                bodySearch.Page =page; 

            }
            if(limit)
            {
                bodySearch.Limit =limit; 

            }
            EmployeeService.GetAllDataCall(bodySearch, (response) => {
                if (response.statusCode === 200) {
                    renderData(response.value);
                } else {
                }
            }, (error) => {

            });

    }

    

    const renderData = (dataReder) => {
        let totalPage = 1;

        if (dataReder.total < 1) {
            totalPage = 1;
        }
        if (obejctPaging.limt < 1) {
            totalPage = 1;


        }
        else {
            totalPage = Math.floor(dataReder.total / obejctPaging.limt) + 1;


        }

        setData(prew => ({ ...prew, tbodyDataUser: dataReder.data }));

        setObjectPaging((prevalue) => {
            return {
                ...prevalue,
                totalRecord: dataReder.total,
                totalPage: totalPage

            }
        })

    }
    const calendarIcon = () => {
        return <img src="/datetimecontrol/calander.png" />;
    }

    const handleShowModel = () => {

        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                id: "-1"
            }
        })
        setIsOpenModel(!isOpenModel);
        // setIsOpenModel(!isOpenModel);
    }

    // const searchData = () => {

    //     getData();

    // }




    const deleteEmploy = (idEmp) => {


        const deleteIdModel = {
            Id: idEmp,

        };
        EmployeeService.delete(ConstantData.URL_Employee_Delete, ConstantData.HEADERS,
            deleteIdModel,
            handleDeleteSucess,
            handleDeleteError);
    }
    const handleDeleteSucess = (data) => {
        if (data.statusCode == 200) {
            getData();
            Swal.fire(
                'Đã xóa!',
                'Đã xóa thành công.',
                'success'
            )
        }
        else {
            toast.error('Có lỗi khi xóa:' + data.value, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }

    }

    const handleDeleteError = (data) => {

    }

    const handleDeleteEmpl = (id) => {
        Swal.fire({
            title: 'Bạn chắc chắn xóa',
            text: "Bạn sẽ không lấy lại được dữ liệu",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng ý!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEmploy(id);

            }
        })

    }


    return (
        <div className="user">
            <div className='box-tbl'>
                <h4 className='box-tit'>
                    <FaTable className="icon-tit" />
                    Báo cáo dữ liệu gọi
                </h4>

            
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
                                                name="fromTime"
                                                value={dateForPicker(obejctSearch.fromTime)}
                                                placeholder="Từ ngày"
                                                onChange={handleInputChange}
                                            />
                                        </InputGroup>
                                    </Form.Group>
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
                            </Row>

                            
                          
                          
                            <Row>
                            {
                                    isAdmin? <Col>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>line gọi:</Form.Label>
                                            <InputGroup className="mb-2">
                                            <Form.Control
                     type="text" name ="linecode"  onChange={handleInputChange} value ={obejctSearch.linecode} 
          />
                                            </InputGroup>
                                        </Form.Group>
                                    </Col>:<></>
                            }
                               

                                <Col>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Số điện thoại:</Form.Label>
        <InputGroup className="mb-2">
        <Form.Control
type="text"
name ="phoneLog"  value ={obejctSearch.phoneLog} onChange={handleInputChange}
/>
        </InputGroup>
    </Form.Group>
</Col>


                                <Col>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Trạng thái gọi:</Form.Label>
        <InputGroup className="mb-2">
        <Form.Select aria-label="Default select example" name ="status" value ={obejctSearch.status}   onChange={handleInputChange} >
      <option>Chọn trạng thái</option>
      <option value="FAILED">FAILED</option>
      <option value="ANSWERED">ANSWERED</option>
      <option value="NO ANSWER">NO ANSWER</option>

      <option value="BUSY">BUSY</option>
    </Form.Select >
        </InputGroup>
    </Form.Group>
</Col>
                                
                            </Row>
                            <Row>
                          
                               

                          <Col>

<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
  <Form.Label>Số hợp đồng:</Form.Label>
  <InputGroup className="mb-2">
  <Form.Control
type="text"
name ="noAgree"  value ={obejctSearch.noAgree} onChange={handleInputChange}
/>
  </InputGroup>
</Form.Group>
</Col>


                     
                          
                      </Row>

                            <Row>


                            </Row>
                        </Form>

                       



                    </div>
                </form>
                <div className="list-feature">
                    
                    <div className="search-feature">
                    { isAdmin?
                     <button className="btn-search" onClick={exportData}>Xuất file</button> : <></> 
                     }
                        <button className="btn-search" onClick={SearchData}>Tìm kiếm</button>
                    </div>
                </div>
               
                <Table theadData={DataJson.theadDataCall} dataDraw={dataEmployee} handleDelete={handleDeleteEmpl} handleViewById={handleViewById} handleUpdateById={handleUpdateById} tbodyData={DataJson.tbodyDataUser} tblClass="tbl-custom-data" />
                <Paging dataPaging={obejctPaging} handlePaging={handlePaging} />

            </div>

            {isOpenModel && <Model handleClose={handleShowModel} content={<ModelAddUser dataItem={employeeItem} handleAdd={handleAddUser} handleUpdate={handleUpdate} handleClose={handleShowModel} />} />}


        </div>
    );
};

export default User;