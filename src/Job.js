// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import JoblyApi from "./api";

// const BASE_URL = "http://localhost:3000";

// function Job() {
//   const [job, setJob] = useState({});
//   // App crashes unless I separately track company data
//   // Do not know why
//   const [jobCompany, setJobCompany] = useState({});
//   const { id } = useParams();
//   useEffect(() => {
//     async function getJob() {
//       let res = await JoblyApi.getJob(id);
//       setJob(res);
//       setJobCompany(res.company);
//     }
//     getJob();
//   }, []);

//   return job ? (
//     <div>
//       <h5>Title:</h5>
//       {job.title}
//       <h5>Salary:</h5>
//       {job.salary}
//       <h5>Equity:</h5>
//       {job.equity ? job.equity : "none"}
//       <h5>Company:</h5>
//       <a href={`${BASE_URL}/companies/${jobCompany.handle}`}>
//         {jobCompany.name}
//       </a>
//     </div>
//   ) : (
//     "loading..."
//   );
// }

// export default Job;
