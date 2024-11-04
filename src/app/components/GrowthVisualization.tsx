'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Chart, ChartConfiguration } from 'chart.js';

export function GrowthVisualization() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const chartConfig: ChartConfiguration = {
      type: 'line',
      data: {
        labels: ['2024 Q1', 'Q2', 'Q3', 'Q4', '2025 Q1'],
        datasets: [
          {
            label: 'ธุรกิจที่เข้าร่วม',
            data: [2000, 4000, 6000, 8000, 10000],
            borderColor: '#22C55E',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#22C55E'
          },
          {
            label: 'มูลค่าการส่งออก (ล้านบาท)',
            data: [100, 300, 600, 1000, 1500],
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#6366F1',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 12,
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            titleColor: '#FFFFFF',
            bodyColor: '#E5E7EB',
            usePointStyle: true,
          }
        },
        scales: {
          x: {
            type: 'category', // กำหนดชนิดของแกน x
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 0
            },
            ticks: {
              maxRotation: 0, // ตอนนี้ควรจะสามารถใช้งานได้ภายใต้ 'category'
              padding: 10,
            }
          },
          y: {
            type: 'linear', // กำหนดชนิดของแกน y
            position: 'left',
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 0
            },
            ticks: {
              callback: (value) => `${value.toLocaleString()} ราย`,
              padding: 10,
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            grid: {
              display: false,
            },
            ticks: {
              callback: (value) => `${value.toLocaleString()}M฿`,
              padding: 10,
            }
          }
        }
      }
    };

    const chart = new Chart(ctx, chartConfig);

    return () => chart.destroy();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gray-900/50 backdrop-blur-sm rounded-xl p-6"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">เป้าหมายธุรกิจ</p>
          <p className="text-2xl font-bold text-green-400">10,000</p>
          <p className="text-gray-400 text-xs">ราย</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-400 text-sm">มูลค่าการส่งออก</p>
          <p className="text-2xl font-bold text-indigo-400">1,500M</p>
          <p className="text-gray-400 text-xs">บาท</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] lg:h-[400px]">
        <canvas ref={chartRef} />
      </div>
    </motion.div>
  );
}
