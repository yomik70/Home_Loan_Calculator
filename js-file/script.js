//console.log(document.querySelector('#btn'));

document.querySelector('#btn').onclick = function(){


    var amount = document.querySelectorAll('[name="textdata"]')[0].value;
    var roi = document.querySelectorAll('[name="textdata"]')[1].value;
    var duration = document.querySelectorAll('[name="textdata"]')[2].value;


   // console.log(amount,typeof amount);
   // console.log(roi,typeof roi);
   // console.log(duration,typeof duration);

   var P =  Number(amount);
   var R = Number(roi);
   var N = Number(duration);

   // console.log(P,R,N);

   // P*R*(1+R)^N / [(1+R)^N-1]  -----> Formula for EMI calculation

   // P = Principal loan amount
   // N = loan duration
   // R = mounthly interest rate

   // annual interest rate/12/100 ------> ROI (rate of interest)

   var Principal_ammount = P;

   var remaining_principal_amount = Principal_ammount;

   var tenure = N;

   var total_interest =0;


   var rate_of_interest = R;

   var tenure_months = tenure * 12;


   var str = ``;


   var emi = 0
   var totalIntrest = 0;

  for (var i = 1; i<= N; i++) {

        var Intrest_paid = 0;
        var principal_Paid = 0;
        var EMI_Paid = 0;

        var opening_balance = Math.round(remaining_principal_amount);

        for (var j = 1; j<=12;j++) {

          emi = ((Principal_ammount * (rate_of_interest/12/100)*Math.pow((1+(rate_of_interest/12/100)),tenure_months))/(Math.pow((1+(rate_of_interest/12/100)),tenure_months)-1)); // EMI = monthly EMI

          EMI_Paid = EMI_Paid + emi;  //Total EMI Paid in Year 

          var monthly_intrest = ((rate_of_interest/12)*(remaining_principal_amount/100)); // Monthly Intrest Paid

          Intrest_paid = Intrest_paid + monthly_intrest;  //Total interest paid in Year

          var monthly_principal_paid = emi - monthly_intrest; //monthly principal paid 

          principal_Paid = principal_Paid + monthly_principal_paid; //total principal paid in Year

          remaining_principal_amount = remaining_principal_amount - monthly_principal_paid; //remaining principal Amount after Every month Principal paid

          


            
        }

        str = str + `

            <tr>
              <td>${i}</td>
              <td>${opening_balance}</td>
              <td>${Math.round(EMI_Paid)}</td>
              <td>${Math.round(Intrest_paid)}</td>
              <td>${Math.round(principal_Paid)}</td>
              <td>${Math.round(remaining_principal_amount)}</td>
            </tr>
          
            `

            
         total_interest = total_interest+(Math.round(Intrest_paid));

  }








console.log(str);
document.getElementById('result').innerHTML = str;





// Build the chart
Highcharts.chart('container', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'chart',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            borderRadius: 5,
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                
            }
        }
    },
    series: [{
        name: 'Share',
        data: [
            { name: 'Loan Amount', y: Principal_ammount},
            { name: 'Interest', y: total_interest }
        ]
    }]
});



}