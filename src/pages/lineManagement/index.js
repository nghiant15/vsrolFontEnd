import React, { useState } from "react";
import { FaTable, FaFilter } from "react-icons/fa";
import Table from "./Table";
import DataJson from "../../utils/Data";
import Model from "../../components/model/Model";
import ModelPopup from "./ModelPopup";
import "./User.scss";
import { useEffect,useRef  } from 'react';
import ConstantData from '../../utils/Constants';
import LineService from '../../services/LineService';
import Paging from  "./Paging";
import { toast } from 'react-toastify';

import Swal from 'sweetalert2'
let XLSX = require("xlsx");

const Index = () => {
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
            getData();

            setInit(false);
    }

    const [employeeItem, setDataItem] = useState({

            "code": "",
            "fullName": "",
            "status": "",
            "folder": "",
            "description": 0

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

    const handleToPageReason = (id)=> {
         window.open("/reason/"+id);

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
        LineService.exportData( ConstantData.HEADERS, bodySearch, (response) => {
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
             document.title = "Danh sách nhóm trạng thái";
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
    
    const getData = ()=> {
        
        let bodySearch = {
                Token: obejctSearch.tokenSearch, 
                Page:  obejctPaging.currentPage,
                Limit: obejctPaging.limt
          };
        LineService.GetAll( bodySearch, (response) => {
        if (response.statusCode === 200) {
            renderData(response.value);
        } else {



            }
        }, (error) => {
        
        });

    }

    const exportDataExcel = (dataReder) => {

        var DataExport = dataReder;
          let workBook = XLSX.utils.book_new();
        const workSheet = XLSX.utils.json_to_sheet(DataExport);

        XLSX.utils.book_append_sheet(workBook, workSheet, `data`);

        let exportFileName = `dataEmployee.xls`;
         XLSX.writeFile(workBook,exportFileName);
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

           

            getData();

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
          LineService.delete(
            deleteIdModel,
            handleDeleteSucess, 
            handleDeleteError);
    }
    const handleDeleteSucess = (data) => {
        if(data.statusCode == 200)
        {   
                getData();
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
                    Trạng thái
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

                <Table theadData={ DataJson.theadLine } 
                    dataDraw={dataEmployee} 
                    handleDelete = {handleDeleteEmpl}
                    handleViewById = {handleViewById}
                    handleUpdateById = {handleUpdateById} 
                    handleToPageReason = {handleToPageReason}
                    tbodyData={ DataJson.tbodyDataUser } tblClass="tbl-custom-data" />
                <Paging dataPaging = {obejctPaging} handlePaging = {handlePaging}/>
            
            </div>

            { isOpenModel && <Model handleClose ={handleShowModel} content={<ModelPopup dataItem= {employeeItem}  handleAdd={handleAddUser}  handleUpdate={handleUpdate}  handleClose={handleShowModel} />} /> }


        </div>
    );
};

export default Index;