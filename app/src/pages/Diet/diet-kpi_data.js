
function generateKPIData(today, yesterday) {

  const today_totals = today.totals;
  const yesterday_totals = yesterday.totals;
  const kpi_data = [
    {
      title: { icon: 'user', label: 'Total Calories Consumed' },
      value: { label: today_totals.calories },
      bottom: { stat: '4%', label: 'From Last Week' }
    },
    {
      title: { icon: 'clock-o', label: 'Carbs' },
      value: { label: '123.50' },
      bottom: { stat: '3%', label: 'From Last Week' }
    },
    {
      title: { icon: 'user', label: 'Fats' },
      value: { className: 'green', label: '2,500' },
      bottom: { stat: '4%', label: 'From Last Week' }
    },
    {
      title: { icon: 'user', label: 'Proteins' },
      value: { label: '4,567' },
      bottom: { className: 'red', stat: '12%', label: 'From Last Week' }
    },
    {
      title: { icon: 'user', label: 'Sugars' },
      value: { label: '2,315' },
      bottom: { stat: '34%', label: 'From Last Week' }
    },
    {
      title: { icon: 'user', label: 'Hydration Level' },
      value: { label: '7,325' },
      bottom: { stat: '34%', label: 'From Last Week' }
    },
  ]
  return kpi_data;
}

export default generateKPIData;