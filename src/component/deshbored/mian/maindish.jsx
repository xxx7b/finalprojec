import React, { useState, useEffect, useRef } from 'react';
import style from './main.module.css';
import { Chart, ArcElement, CategoryScale, LinearScale, BarController, PieController, BarElement } from 'chart.js';

Chart.register(ArcElement, CategoryScale, LinearScale, BarController, PieController, BarElement);



function Maindish() {
  const [usersCount, setUsersCount] = useState(0);
  const [workersCount, setWorkersCount] = useState(0);
  const [usersPercentage, setUsersPercentage] = useState(0);
  const [workersPercentage, setWorkersPercentage] = useState(0);
  const [usersFromSolo, setUsersFromSolo] = useState(0);
  const [usersFromJogja, setUsersFromJogja] = useState(0);
  const [usersFromJakarte, setUsersFromJakarte] = useState(0);
  const [workersFromSolo, setWorkersFromSolo] = useState(0);
  const [workersFromJogja, setWorkersFromJogja] = useState(0);
  const [workersFromJakarte, setWorkersFromJakarte] = useState(0);
  const [error1, setError1] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [orderCount, setOrderCount] = useState(0);
  const [inporogresorders,setinporogresorders]=useState(0);
  const [acceptedorders,setacceptedorders]=useState(0);
  const [rejectedorders,setrejectedorders]=useState(0);
const [inProgressPercentage, setInProgressPercentage] = useState(0);
const [acceptedPercentage, setAcceptedPercentage] = useState(0);
const [rejectedPercentage, setRejectedPercentage] = useState(0);

  const [reperi,setreperi]=useState(0);
  const [install,setinstall]=useState(0);
  const [reanovate,setreanovate]=useState(0);
  console.log(reperi,install,reanovate)

  const [viewmore,setviewmore]=useState(false)
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstanceRef1 = useRef(null);
  const chartInstanceRef2 = useRef(null);
  const chartRef3 = useRef(null);
  const chartInstanceRef3 = useRef(null);
  


  useEffect(() => {
    const total = usersCount + workersCount;
  
    if (total > 0) {
      const usersPercentage = (usersCount / total) * 100;
      const workersPercentage = (workersCount / total) * 100;
      setUsersPercentage(usersPercentage);
      setWorkersPercentage(workersPercentage);
    } else {
      setUsersPercentage(0);
      setWorkersPercentage(0);
    }
  }, [usersCount, workersCount]);
  
  useEffect(() => {
    const totalOrdersCount = inporogresorders + acceptedorders + rejectedorders;
  
    if (totalOrdersCount > 0) {
      const inporogresPercentage = (inporogresorders / totalOrdersCount) * 100;
      const acceptedPercentage = (acceptedorders / totalOrdersCount) * 100;
      const rejectedPercentage = (rejectedorders / totalOrdersCount) * 100;
  
      setInProgressPercentage(inporogresPercentage);
      setAcceptedPercentage(acceptedPercentage);
      setRejectedPercentage(rejectedPercentage);
    } else {
        setInProgressPercentage(0);
      setAcceptedPercentage(0);
      setRejectedPercentage(0);
    }
  }, [inporogresorders, acceptedorders, rejectedorders]);
  

  const getallusers = async () => {
    try {
      const response = await fetch('/api/getallusers', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      const users = jsonData.filter(user => user.userype === 'user');
      const workers = jsonData.filter(user => user.userype === 'worker');
      const workersFromSolo = jsonData.filter(user => user.address === 'solo' && user.userype === 'worker');
      const workersFromJogja = jsonData.filter(user => user.address === 'jogja' && user.userype === 'worker');
      const workersFromJakarte = jsonData.filter(user => user.address === 'jakarte' && user.userype === 'worker');
      const usersFromSolo = jsonData.filter(user => user.address === 'solo' && user.userype === 'user');
      const usersFromJogja = jsonData.filter(user => user.address === 'jogja' && user.userype === 'user');
      const usersFromJakarte = jsonData.filter(user => user.address === 'jakarte' && user.userype === 'user');
      const repir = jsonData.filter(user => user.exp === 'Repair');
      const install = jsonData.filter(user => user.exp === 'Install');
      const reanovate = jsonData.filter(user => user.exp === 'Renovate');
      setreanovate(reanovate.length)
      setreperi(repir.length)
      setinstall(install.length)
      setUsersCount(users.length);
      setWorkersCount(workers.length);
      setUsersFromJakarte(usersFromJakarte.length);
      setUsersFromJogja(usersFromJogja.length);
      setUsersFromSolo(usersFromSolo.length);
      setWorkersFromJakarte(workersFromJakarte.length);
      setWorkersFromSolo(workersFromSolo.length);
      setWorkersFromJogja(workersFromJogja.length);
    } catch (error) {
      setError1(error.message);
    }
  };


  const getallorders = async () => {
    try {
      const response = await fetch('/api/getallorders', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const jsonData = await response.json();
      const orderCount = jsonData.length;
      setOrderCount(orderCount);
      console.log()
      const accepted = jsonData.filter(order => order.state === 0);
      const rejected = jsonData.filter(order => order.state === 1);
      const inprogress = jsonData.filter(order => order.orderstate ==='inprogress');
      setacceptedorders(accepted.length)
      setrejectedorders(rejected.length)
      setinporogresorders(inprogress.length)
      console.log(inporogresorders)
    } catch (error) {
      setError1(error.message);
    }
  };

  const createPieChart1 = () => {
    if (chartRef1.current) {
        if (chartInstanceRef1.current) {
          chartInstanceRef1.current.destroy();
        }
        const ctx = chartRef1.current.getContext('2d');
        chartInstanceRef1.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Users', 'Workers'],
            datasets: [
              {
                data: [usersCount, workersCount],
                backgroundColor: [`rgba(54, 162, 235, ${workersCount / (usersCount + workersCount)})`, `rgba(255, 99, 132, ${usersCount / (usersCount + workersCount)})`],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem) => {
                    const label = tooltipItem.label;
                    const value = tooltipItem.formattedValue;
                    const percentage = ((tooltipItem.parsed / tooltipItem.dataset.data.reduce((a, b) => a + b)) * 100).toFixed(1);
                    return `${label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
          },
        });
      }
  };

  const createPieChart2 = () => {
    if (chartRef2.current) {
        if (chartInstanceRef2.current) {
          chartInstanceRef2.current.destroy();
        }
        const ctx = chartRef2.current.getContext('2d');
        chartInstanceRef2.current = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['In Progress', 'Accepted', 'Rejected'],
            datasets: [
              {
                data: [inporogresorders, acceptedorders, rejectedorders],
                backgroundColor: ['#FFA500', '#008000', '#FF0000'],
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: 'bottom',
              },
            },
          },
        });
      }
  };

  const createBarChart = () => {
    if (chartRef3.current) {
        if (chartInstanceRef3.current) {
          chartInstanceRef3.current.destroy();
        }
        const ctx = chartRef3.current.getContext('2d');
        chartInstanceRef3.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Repair', 'Install', 'Renovate'],
            datasets: [
              {
                label: 'Counts',
                data: [reperi, install, reanovate],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          },
           });
    }
  };

  useEffect(() => {
    if (!fetched) {
      getallusers();
      getallorders();
      setFetched(true);
    }
  }, []);

  useEffect(() => {
    if (fetched) {
      createPieChart1();
      createPieChart2();
      createBarChart();
    }
  }, [fetched, usersCount, workersCount, inporogresorders, acceptedorders, rejectedorders, reperi, install, reanovate]);


  

  return (
    <>
    { viewmore===true?<>
    <section className={style.sec2}>
    <h1>number of orders in progress</h1>
    <p>here you can see the number of orders in progress && rejected && accepted </p>
    <div className={style.continere1} >
    <canvas className={style.bar} ref={chartRef2} />
    </div>
    <div className={style.content7}>
                <div> <div className={style.accepted}></div>accepted {acceptedPercentage.toFixed()}%</div>
                <div><div className={style.rejected}></div> rejected {rejectedPercentage.toFixed()}%</div>
                <div><div className={style.inprogres}></div> inprogres {inProgressPercentage.toFixed()}%</div>
            </div>
    </section>
    </>:
      <section className={style.sec}>
        {error1 ? (
          <p>Error: {error1}</p>
        ) : (
          <div className={style.continer}>
            <h2>overall setatics</h2>
            <p> heremyou can see a qouick overall statics</p>
            <div className={style.content}>
            <div>
              <h2>Number of Users:</h2>
              <span>{usersCount}</span>
            </div>
            <div>
              <h2>Number of Workers:</h2>
              <span>{workersCount}</span>
            </div>
            <div>
              <h2>Number of Workers from Solo:</h2>
              <span>{workersFromSolo}</span>
            </div>
            <div>
              <h2>Number of Workers from Jakarte:</h2>
              <span>{workersFromJakarte}</span>
            </div>
            <div>
              <h2>Number of Workers from Jogja:</h2>
              <span>{workersFromJogja}</span>
            </div>
            <div>
              <h2>Number of Users from Jogja:</h2>
              <span>{usersFromJogja}</span>
            </div>
            <div>
              <h2>Number of Users from Jakarte:</h2>
              <span>{usersFromJakarte}</span>
            </div>
            <div>
              <h2>Number of Users from Solo:</h2>
              <span>{usersFromSolo}</span>
            </div>
            <div>
              <h2>Number of Orders:</h2>
              <span>{orderCount}</span>
            </div>
          </div>
          </div>
        )}
        <div className={style.contentpie}>
            <div className={style.continere} >
            <div>
                <h1>users & workers</h1>
                <p>here you can see the number of users and workers in the system</p>
            </div>
        <canvas className={style.pie} ref={chartRef1} />
         <div className={style.content7}>
            <div> <div className={style.users}></div> users <span>{usersPercentage.toFixed()}%</span></div>
            <div><div className={style.workers}></div> workers <span>{workersPercentage.toFixed()}%</span></div>
            </div>
        </div>

        <div className={style.continere2}>
        <div>
           <h1>displying the jobs that workers exp </h1>
            <p>here you can see the visiulization of the workers exp </p>
            </div>
            <div>
            <canvas className={style.pie} ref={chartRef3} />
            </div>
        </div>
        </div>
        <div className={style.next} onClick={()=>{
            setviewmore(true)
        }}> <button> view more</button></div>
      </section>
}
    </>
  );
}

export default Maindish;
