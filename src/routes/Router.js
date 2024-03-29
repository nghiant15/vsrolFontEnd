import { Routes, Route } from 'react-router-dom';
import Layout from '../pages/layout/Layout';

function Router() {
    return (
          <Routes>
                        <Route path="/" element={<Layout page="login" />} />
                         <Route path="test-line" element={<Layout page="test-line" />}>
                                <Route path=":detail" element={<Layout page="test-line" />} />
                         </Route>
                         <Route path="danh-sach-goc" element={<Layout page="workplace2" />}>
                         </Route>
                         <Route path="nhom" element={<Layout page="detailGroup" />}>
                                    <Route path=":detail" element={<Layout page="detailGroup" />} />
                         </Route>
                         <Route path="login" element={<Layout page="login" />} />
                         <Route path="home" element={<Layout page="home" />} />
                       
                         <Route path="quan-ly-nguoi-dung" element={<Layout page="user" />} />
                         <Route path="dashboard" element={<Layout page="dashboard" />} />

                         <Route path="tong-quan-tin-nhan" element={<Layout page="smsDashboard" />}>
                              
                         </Route>
                         <Route path="campaignAssign" element={<Layout page="campaignAssign" />}>
                              <Route path=":id" element={<Layout page="campaignAssign" />} />
                         </Route>
                         <Route path="follow-up-new"  element={<Layout page="follow-up-new" />}>
                         <Route path=":detail" element={<Layout page="follow-up-new" />} />
                         </Route>
                         <Route path="kho-luu-tru"  element={<Layout page="kho-luu-tru" />}>
                         <Route path=":detail" element={<Layout page="kho-luu-tru" />} />
                         
                         </Route>

                         <Route path="tra-cuu"  element={<Layout page="tra-cuu" />}>
                       
                         </Route>
                         <Route path="follow-up" element={<Layout page="follow-up" />}>
                              <Route path=":detail" element={<Layout page="follow-up" />} />
                         </Route>
                         <Route path="reason" element={<Layout page="reason" />}>
                              <Route path=":detail" element={<Layout page="reason" />} />
                         </Route>
                         <Route path="groupReason" element={<Layout page="groupReason" />}>
                              <Route path=":detail" element={<Layout page="groupReason" />} />
                         </Route>
                         <Route path="campangn" element={<Layout page="campangn" />}>
                              <Route path=":edit" element={<Layout page="campangn" />} />
                         </Route>
                         <Route path="report" element={<Layout page="reportMaster" />}>
                              <Route path=":reportId" element={<Layout page="reportMaster" />} />
                         </Route>
                         <Route path="historical" element={<Layout page="reporthistorical" />}>
                        </Route>
                         <Route path="masterData" element={<Layout page="relationship" />}>
                              <Route path=":edit" element={<Layout page="relationship" />} />
                         </Route>
                          <Route path="reportCDR" element={<Layout page="reportCDR" />}>
                              <Route path=":edit" element={<Layout page="reportCDR" />} />
                         </Route>
                         <Route path="bao-cao-ghi-am" element={<Layout page="recording" />}>
                              
                         </Route>

                         <Route path="fist-call-last-call" element={<Layout page="fistlastCall" />}>
                              
                         </Route>
                         <Route path="bao-cao-du-lieu-goi" element={<Layout page="reportCall" />}>
                              
                          </Route>
                         <Route path="bao-cao-tong-quan-qc" element={<Layout page="viewRecordingOverviewFile" />}>
                         </Route>
                         <Route path="bao-cao-qc" element={<Layout page="viewRecording" />}>
                         </Route>
                         <Route path="document-data" element={<Layout page="documentData" />}>
                         </Route>
                         <Route path="bao-cao-ghi-am-theo-so-hop-dong" element={<Layout page="recordingNoAgree" />}>
                          </Route>
                         <Route path="bao-cao-tin-nhan" element={<Layout page="smsReport" />}>

                         </Route>
                         <Route path="bao-cao-talktime"
                             element={<Layout page="reportTalkTime" />}>
                         </Route>

                         <Route path="tracking-call"
                             element={<Layout page="tracking" />}>
                         </Route>
                         <Route path="quan-ly-line" element={<Layout page="lineManagement" />}>
                            <Route path=":detail" element={<Layout page="lineManagement" />} />
                         </Route>
                         <Route path="thong-tin-chien-dich" 
                              element={<Layout page="infoManagement" />}>
                              <Route path=":detail" element={<Layout page="infoManagement" />} />
                         </Route>
                         
                         <Route path="quan-ly-goi" element={<Layout page="managementPackage" />}>
                             
                         </Route>
                         <Route path="quan-ly-dpd" element={<Layout page="quan-ly-dpd" />}>

                         </Route>
                         
                         <Route path="danh-sach-nhom" element={<Layout page="GroupUser" />}>

                         </Route>
     
                       
                         
          </Routes>
     );
}

export default Router;