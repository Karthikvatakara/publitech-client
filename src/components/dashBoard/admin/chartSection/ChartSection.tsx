import React from 'react'
import PieCharts from './PieCharts'
import GraphChart from './GraphChart'

function ChartSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Revenue Over Time</h3>
        <p className="text-gray-500">Chart placeholder: Implement revenue chart here</p>
        <GraphChart/>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Category Enrollment Distribution</h3>
        <PieCharts />
      </div>
    </div>
  )
}

export default ChartSection
