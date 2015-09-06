var tv = 10;
// instantiate our graph!
var graph = new Rickshaw.Graph( {
    element: document.getElementById("graph_exercise"),
    width: 900,
    height: 500,
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
    var data = { one: liczba };
    //var randInt = Math.floor(Math.random()*100);
    //data.two = liczba;
    //data.three = liczba;
    graph.series.addData(data);
    graph.render();
}, tv );