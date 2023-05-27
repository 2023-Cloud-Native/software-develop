export const plugin = {
    id: 'customCanvasBackgroundColor',
    beforeDraw: (chart, args, options) => {
      const {ctx} = chart;
      ctx.save();
      var x = chart.chartArea.left;
      var w = chart.chartArea.width;
      var y = chart.chartArea.top;
      var h = chart.chartArea.height;
      ctx.globalCompositeOperation = 'destination-atop';
      ctx.fillStyle =  '#FAB0B0'; //red
      ctx.fillRect(x, y+h*0.7, w, h*0.3);
      ctx.restore();
      ctx.fillStyle = '#FFCAA2'; //orange
      ctx.fillRect(x, y+h*0.3, w, h*0.4);
      ctx.restore();
      ctx.fillStyle = 'lightGreen';
      ctx.fillRect(x, y, w, h*0.3);
      ctx.restore();
    }
  };