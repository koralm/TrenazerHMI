var tv = 500;
// instantiate our graph!
var graph = new Rickshaw.Graph( {
    element: document.getElementById("graph_exercise"),
    width: window.innerWidth *0.2,
    height: window.innerHeight * 0.2,
    renderer: 'line',
    series: new Rickshaw.Series.FixedDuration([{ name: 'one' }], undefined, {
        timeInterval: tv,
        maxDataPoints: 500
        ,
        timeBase: new Date().getTime()
    })
} );

graph.render();
// add some data every so often

var i = 0;
var iv = setInterval( function() {
    var data = { one: 12 + Math.floor(Math.random()*100)};
    //var randInt = Math.floor(Math.random()*100);
    //data.two = liczba;
    //data.three = liczba;
    graph.series.addData(data);
    graph.render();
}, tv );