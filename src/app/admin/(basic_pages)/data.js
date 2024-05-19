export const userTypeOptions = {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,

    data: [{
        type: "pie",
        startAngle: 25,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "false",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: [
            { y: 50.00, label: "Blood donor's" },
            { y: 25.00, label: "Patient's" },
            { y: 10.00, label: "Fund Raiser's" },
            { y: 15.00, label: "Fund Donator" },

        ]
    }]
}

export const userGrowthGraph = {
    animationEnabled: true,
    data: [{
        type: "splineArea",
        xValueFormatString: "YYYY",
        yValueFormatString: "#,##0.## bn kW⋅h",
        showInLegend: true,
        dataPoints: [
            { x: new Date(2008, 0), y: 70.735 },
            { x: new Date(2009, 0), y: 74.102 },
            { x: new Date(2010, 0), y: 72.569 },
            { x: new Date(2011, 0), y: 72.743 },
            { x: new Date(2012, 0), y: 72.381 },
            { x: new Date(2013, 0), y: 71.406 },
            { x: new Date(2014, 0), y: 73.163 },
            { x: new Date(2015, 0), y: 74.270 },
            { x: new Date(2016, 0), y: 72.525 },
            { x: new Date(2017, 0), y: 73.121 }
        ]
    }]
}