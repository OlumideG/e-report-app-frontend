import React, { useState} from 'react';





const DashboardDisplay =()=>{
    const [forwardedReports, setForwardedReports] = useState([]);
    const [pendingReports, setPendingReports] = useState([]);


      const allForwardedReports = () => {

        fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/forwarded`)
          .then(res => res.json())
          .then(result => {
            setForwardedReports(result.length)
    
            // console.log(result)
          })
          .catch(err => {
            console.log(err.message);
    
          })
      }
    
      allForwardedReports()
    
      const allpendingReports = () => {
    
        fetch(`https://ancient-citadel-22859.herokuapp.com/dashboard/admin/home/pending`)
          .then(res => res.json())
          .then(result => {
            setPendingReports(result.length)
    
            // console.log(result)
          })
          .catch(err => {
            console.log(err.message);
    
          })
      }
    
      allpendingReports()



      return(
          <div>
              <h1> forwarded Reports number:{forwardedReports}</h1>
              <h1> pending Reports number:{pendingReports}</h1>
           </div>
      )

}


export default DashboardDisplay;