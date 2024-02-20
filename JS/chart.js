
    function generateChart(){ 
    let chart;
    var originalData = selectedArtist
    document.getElementById('showLast7DaysButton').addEventListener('click', function() {
    showDataForLastDays(7);
    document.getElementById('showLast14DaysButton').style.backgroundColor ='#A16A5E'
    document.getElementById('showLast30DaysButton').style.backgroundColor ='#A16A5E'
    document.getElementById('showLast7DaysButton').style.backgroundColor ='#D44C2E'
    });
    document.getElementById('showLast14DaysButton').addEventListener('click', function() {
    showDataForLastDays(14);
    document.getElementById('showLast14DaysButton').style.backgroundColor ='#D44C2E'
    document.getElementById('showLast30DaysButton').style.backgroundColor ='#A16A5E'
    document.getElementById('showLast7DaysButton').style.backgroundColor ='#A16A5E'
    });
    document.getElementById('showLast30DaysButton').addEventListener('click', function() {
    showDataForLastDays(30);
    document.getElementById('showLast14DaysButton').style.backgroundColor ='#A16A5E'
    document.getElementById('showLast30DaysButton').style.backgroundColor ='#D44C2E'
    document.getElementById('showLast7DaysButton').style.backgroundColor ='#A16A5E'
    });
    function showDataForLastDays(days) {
    let data = originalData.slice();
    const today = new Date();
    const daysAgo = new Date(today);
    daysAgo.setDate(today.getDate() - days);
    const labels = Array.from({ length: days }, (_, i) => {
     const dayNumber = i + 1;
     return dayNumber < 10 ? '0' + dayNumber : dayNumber.toString();
    });
    const values = Array(days).fill(0);
    data.forEach(item => {
    if (item.dateSold) {
    const date = item.dateSold.split('T')[0];
    const itemDate = new Date(date);
    if (itemDate >= daysAgo && itemDate <= today) {
    const dayIndex = Math.floor((itemDate - daysAgo) / (24 * 60 * 60 * 1000));
    values[dayIndex] += item.priceSold || 0;
    }
    }
    });
    if (chart) {
    chart.destroy(); 
    }
    const ctx = document.getElementById('horizontalBarChart').getContext('2d');
    chart = new Chart(ctx, {
    type: 'bar', 
    data: {
    labels: labels,
    datasets: [{
    label: 'Amount',
    data: values,
    backgroundColor: ['#A16A5E'],
    hoverBackgroundColor:["#D44C2E"],
    barThickness: 8,                                
    }],
        },
    options:{
      scales:{
        x:{
        beginAtZero: true,
        title: {
        display: true,                      
        },
        grid: {
        display: false, 
        },
        },
        y: {
          title: {
          display: true,                 
          },
          grid: {
          display: false, 
          },
      },
      },
      maintainAspectRatio: false,
      indexAxis: 'y'
      }
    });
    }
    showDataForLastDays(7);
    }