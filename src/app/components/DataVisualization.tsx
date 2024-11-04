// components/DataVisualization.tsx
'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { motion } from 'framer-motion';

export function DataVisualization() {
 const lineChartRef = useRef(null);
 const doughnutChartRef = useRef(null);

 useEffect(() => {
   // Line Chart
   const lineCtx = lineChartRef.current.getContext('2d');
   const lineChart = new Chart(lineCtx, {
     type: 'line',
     data: {
       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
       datasets: [
         {
           label: 'Translation Accuracy',
           data: [92, 93, 95, 94, 96, 98],
           borderColor: 'rgb(147, 51, 234)',
           tension: 0.4,
           fill: true,
           backgroundColor: 'rgba(147, 51, 234, 0.1)',
         },
         {
           label: 'Context Understanding',
           data: [88, 90, 91, 93, 95, 97],
           borderColor: 'rgb(219, 39, 119)',
           tension: 0.4,
           fill: true,
           backgroundColor: 'rgba(219, 39, 119, 0.1)',
         }
       ]
     },
     options: {
       responsive: true,
       plugins: {
         legend: {
           labels: {
             color: 'rgb(156, 163, 175)'
           }
         }
       },
       scales: {
         y: {
           beginAtZero: false,
           min: 80,
           max: 100,
           grid: {
             color: 'rgba(75, 85, 99, 0.2)'
           },
           ticks: {
             color: 'rgb(156, 163, 175)'
           }
         },
         x: {
           grid: {
             color: 'rgba(75, 85, 99, 0.2)'
           },
           ticks: {
             color: 'rgb(156, 163, 175)'
           }
         }
       }
     }
   });

   // Doughnut Chart
   const doughnutCtx = doughnutChartRef.current.getContext('2d');
   const doughnutChart = new Chart(doughnutCtx, {
     type: 'doughnut',
     data: {
       labels: ['English', 'Thai', 'Chinese', 'Japanese', 'Korean'],
       datasets: [{
         data: [35, 30, 15, 10, 10],
         backgroundColor: [
           'rgba(147, 51, 234, 0.8)',
           'rgba(219, 39, 119, 0.8)',
           'rgba(59, 130, 246, 0.8)',
           'rgba(16, 185, 129, 0.8)',
           'rgba(245, 158, 11, 0.8)'
         ],
         borderColor: 'rgba(17, 24, 39, 0.8)',
         borderWidth: 2
       }]
     },
     options: {
       responsive: true,
       plugins: {
         legend: {
           position: 'right',
           labels: {
             color: 'rgb(156, 163, 175)'
           }
         },
         title: {
           display: true,
           text: 'Translation Language Distribution (%)',
           color: 'rgb(156, 163, 175)',
           font: {
             size: 14
           }
         }
       }
     }
   });

   return () => {
     lineChart.destroy();
     doughnutChart.destroy();
   };
 }, []);

 return (
   <motion.div 
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ duration: 0.5 }}
     className="relative h-full w-full rounded-xl overflow-hidden bg-gray-900/50 backdrop-blur-sm p-6"
   >
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
       <div className="bg-gray-800/50 rounded-lg p-4">
         <h4 className="text-white text-lg font-semibold mb-4">AI Performance Metrics</h4>
         <div className="relative h-[300px]">
           <canvas ref={lineChartRef} />
         </div>
       </div>
       <div className="bg-gray-800/50 rounded-lg p-4">
         <div className="relative h-[300px]">
           <canvas ref={doughnutChartRef} />
         </div>
       </div>
     </div>

     {/* Key Metrics */}
     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
       <div className="bg-purple-500/20 rounded-lg p-4">
         <h5 className="text-purple-300 text-sm font-medium mb-1">Accuracy Rate</h5>
         <p className="text-white text-2xl font-bold">98.5%</p>
       </div>
       <div className="bg-pink-500/20 rounded-lg p-4">
         <h5 className="text-pink-300 text-sm font-medium mb-1">Daily Users</h5>
         <p className="text-white text-2xl font-bold">10,234</p>
       </div>
       <div className="bg-blue-500/20 rounded-lg p-4">
         <h5 className="text-blue-300 text-sm font-medium mb-1">Messages/Day</h5>
         <p className="text-white text-2xl font-bold">45.2K</p>
       </div>
       <div className="bg-green-500/20 rounded-lg p-4">
         <h5 className="text-green-300 text-sm font-medium mb-1">Response Time</h5>
         <p className="text-white text-2xl font-bold">0.3s</p>
       </div>
     </div>
   </motion.div>
 );
}