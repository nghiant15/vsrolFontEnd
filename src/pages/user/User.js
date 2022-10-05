import React, { useState } from "react";
import { FaTable, FaFilter } from "react-icons/fa";
import Table from "./Table";
import DataJson from "../../utils/Data";
import Model from "../../components/model/Model";
import ModelAddUser from "./ModelUser";
import "./User.scss";
import { useEffect,useRef  } from 'react';
import ConstantData from '../../utils/Constants';
import EmployeeService from '../../services/EmployeeService';
import Paging from  "./Paging";
import { toast } from 'react-toastify';

import Swal from 'sweetalert2'
let XLSX = require("xlsx");

const User = () => {
    const [isOpenModel, setIsOpenModel] = useState(false);
    const [isInit, setInit] = useState(false);
    const [obejctPaging, setObjectPaging ] = useState({
        limt: 10, 
        totalRecord : 28,
        totalPage: 3,
        currentPage: 1
    });
    const [obejctSearch, setKeySearch] = useState({
        tokenSearch: ""
    });



    const handlePaging = (data)=> {

            const key = 'currentPage';
            const value = data;
            setObjectPaging(prevState => ({
            ...prevState,
            [key]: value
            }
            ));
            getDataEmployee();

            setInit(false);
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


    
    const handleUpdateById = (id)=> {
            setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                id:id
            }
            });
            setDataItem((prevalue) => {
                return {
                    ...prevalue,   // Spread Operator               
                    isView:false
                }
                });
            setIsOpenModel(!isOpenModel);
    }

    const handleViewById = (id)=> {
        setDataItem((prevalue) => {
        return {
            ...prevalue,   // Spread Operator               
            id:id
        }
        });
        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                    isView:true
            }
            })


            setIsOpenModel(!isOpenModel);
    }


    const handleExportData = ()=> {
        let bodySearch = {
            Token: obejctSearch.tokenSearch, 
            Page:  obejctPaging.currentPage,
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



    

    const [dataEmployee, setData] = useState( {
        tbodyDataUser: [
         
        ],
    }  );


    useEffect(() => {

        if(!isInit)
        {

            document.title = "Danh sách nhân viên";
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const token = params.get('token');
           
            //  console.log(token)//123
            if( token!= null && token !="")
             {
                  let valueControl =token;
                  let nameControl ="tokenSearch";
                 
                  setKeySearch((prevalue) => {
                      return {
                        ...prevalue,   // Spread Operator               
                        [nameControl]: valueControl
                      }
                    })
                    
    
             }
             getDataEmployee();
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
        getDataEmployee();
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
        getDataEmployee();
    }


    


    const getDataEmployee = ()=> {

         
        
         let bodySearch = {
            Token: obejctSearch.tokenSearch, 
            Page:  obejctPaging.currentPage,
            Limit: obejctPaging.limt

          };
          EmployeeService.GetAll(ConstantData.URL_Employee_GetALl, ConstantData.HEADERS, bodySearch, (response) => {
            if (response.statusCode === 200) {
                renderData(response.value);
            } else {



             }
          }, (error) => {
           
          });

    }

    const exportDataExcel = (dataReder) => {

        var DataExport = dataReder;
          
        var DataExport2 = [
            {
                "userName": "BNT154",
                "roleId": "2",
                "email": "BNT154@email.com",
                "fullName": "Mai",
                "phoneNumber": "0907455177",
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "20",
                "success": true,
                "createdTime": "2022-10-05T09:23:47.223",
                "updatedTime": "2022-10-05T09:23:47.223",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia39",
                "roleId": "2",
                "email": "nghiait06@gmail.com",
                "fullName": "Nghia39",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "19",
                "success": true,
                "createdTime": "2022-10-04T17:01:49.283",
                "updatedTime": "2022-10-04T17:01:49.283",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia36",
                "roleId": "2",
                "email": "Nghia35@email.com",
                "fullName": "Nghia36",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "18",
                "success": true,
                "createdTime": "2022-10-04T17:01:31.943",
                "updatedTime": "2022-10-04T17:01:31.943",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia35",
                "roleId": "2",
                "email": "nghiait06@gmail.com",
                "fullName": "Nghia35",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "17",
                "success": true,
                "createdTime": "2022-10-04T17:01:14.39",
                "updatedTime": "2022-10-04T17:01:14.39",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia3",
                "roleId": "2",
                "email": "Nghia2@email.com",
                "fullName": "Nghia3",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "16",
                "success": true,
                "createdTime": "2022-10-04T17:00:53.737",
                "updatedTime": "2022-10-04T17:00:53.737",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia3",
                "roleId": "2",
                "email": "Nghia2",
                "fullName": "Nghia3",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "15",
                "success": true,
                "createdTime": "2022-10-04T17:00:27.287",
                "updatedTime": "2022-10-04T17:00:27.287",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "Nghia2",
                "roleId": "2",
                "email": "Nghia2@email.com",
                "fullName": "Nghia2",
                "phoneNumber": null,
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "14",
                "success": true,
                "createdTime": "2022-10-04T16:59:58.4",
                "updatedTime": "2022-10-04T16:59:58.4",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "NghiaNT20",
                "roleId": "2",
                "email": "nghaiit06@gmail.com",
                "fullName": "Nghĩa",
                "phoneNumber": "0378900987",
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "13",
                "success": true,
                "createdTime": "2022-10-04T13:08:21.117",
                "updatedTime": "2022-10-04T13:08:21.117",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "NghiaNT18",
                "roleId": "2",
                "email": "nghiait063@gmail.com",
                "fullName": "Nghĩa",
                "phoneNumber": "0207455272",
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "12",
                "success": true,
                "createdTime": "2022-10-04T11:52:16.83",
                "updatedTime": "2022-10-04T11:52:16.83",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            },
            {
                "userName": "NghiaNT167",
                "roleId": "2",
                "email": "nghiait06@gmail.com",
                "fullName": "NghiaNT167",
                "phoneNumber": "0383338840",
                "isActive": "False",
                "lineCode": "352",
                "positionName": "Collection",
                "departmentName": null,
                "companyName": "ACS",
                "totalRecord": 12,
                "id": "6",
                "success": true,
                "createdTime": "2022-10-04T08:20:37.807",
                "updatedTime": "2022-10-04T08:20:37.807",
                "authorName": "Nguyễn Trường Nghĩa",
                "updateByName": "Nguyễn Trường Nghĩa"
            }
        ];
        // let workBook = XLSX.utils.book_new();
        // const workSheet = XLSX.utils.json_to_sheet(DataExport);
        // debugger;
        // XLSX.utils.book_append_sheet(workBook, workSheet, `data`);
        // let exportFilePath = `public/employee.xls`;
        // XLSX.writeFile(workBook, exportFilePath);

      
        let workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(DataExport);

        XLSX.utils.book_append_sheet(workBook, workSheet, `data`);

        let exportFileName = `dataEmployee.xls`;
         XLSX.writeFile(workBook,exportFileName);

        //  const link = document.createElement('a');
        // link.href = exportFileName;
        // link.setAttribute(
        //   'download',
        //   `employeeReport.xls`,
        // );
    
        // // Append to html link element page
        // document.body.appendChild(link);
    
        // // Start download
        // link.click();
    
        // // Clean up and remove the link
        // link.parentNode.removeChild(link);
        
      



}

    const renderData = (dataReder) => {

          
            let totalPage = 1;

            if(dataReder.total <1 )
            {
                totalPage = 1;
            }
            if( obejctPaging.limt <1)
            {
                totalPage = 1;
               

            }
            else 
            {
                totalPage = Math.floor(dataReder.total/obejctPaging.limt ) +1;

    
            }
           
            setData(prew=>({...prew,tbodyDataUser:dataReder.data}));

            setObjectPaging((prevalue) => {
                return {
                  ...prevalue,
                  totalRecord:dataReder.total,
                  totalPage: totalPage

                }
              })

    }


    const handleShowModel = () => {

        setDataItem((prevalue) => {
            return {
                ...prevalue,   // Spread Operator               
                id:"-1"
            }
            })
      setIsOpenModel(!isOpenModel);
        // setIsOpenModel(!isOpenModel);
    }

    const searchData =()=> {

           

            getDataEmployee();

    }

    const handleInputChangesearch =(event)=> {
        let valueControl = event.target.value;
        let nameControl = event.target.name;
       
        setKeySearch((prevalue) => {
            return {
              ...prevalue,   // Spread Operator               
              [nameControl]: valueControl
            }
          })
     
    }

    
    const  deleteEmploy = (idEmp) => { 
       
    
        const deleteIdModel = {
            Id:  idEmp,
           
          };
          EmployeeService.delete(ConstantData.URL_Employee_Delete,ConstantData.HEADERS,
            deleteIdModel,
            handleDeleteSucess, 
            handleDeleteError);
    }
    const handleDeleteSucess = (data) => {
        if(data.statusCode == 200)
        {   
                getDataEmployee();
                Swal.fire(
                'Đã xóa!',
                'Đã xóa thành công.',
                'success'
                )
        }
        else 
        {
                toast.error('Có lỗi khi xóa:'+ data.value, {
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
    
    const handleDeleteEmpl = (id)=> {
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
                    Nhân viên
                </h4>

                <div className="list-feature">
                <div className="button-feature">
                    <button className="btn-ft btn-add" onClick={() => handleShowModel()}>Thêm</button>
                    <button className="btn-ft btn-export" onClick={()=>handleExportData()}>Xuất Excel</button>
                    {/* <button className="btn-ft btn-more">Mở rộng</button> */}
                </div>
                <div className="search-feature">
                    <FaFilter />
                    <input className="input-search" name ="tokenSearch" onChange={handleInputChangesearch} value= {obejctSearch.tokenSearch}  type="text" placeholder="Tìm kiếm" />
                    <button  className="btn-search"  onClick= {searchData}>Tìm kiếm</button>
                </div>
                </div>

                <Table theadData={ DataJson.theadDataUser } dataDraw={dataEmployee} handleDelete = {handleDeleteEmpl} handleViewById = {handleViewById} handleUpdateById = {handleUpdateById} tbodyData={ DataJson.tbodyDataUser } tblClass="tbl-custom-data" />
                <Paging dataPaging = {obejctPaging} handlePaging = {handlePaging}/>
            
            </div>

            { isOpenModel && <Model handleClose ={handleShowModel} content={<ModelAddUser dataItem= {employeeItem}  handleAdd={handleAddUser}  handleUpdate={handleUpdate}  handleClose={handleShowModel} />} /> }


        </div>
    );
};

export default User;