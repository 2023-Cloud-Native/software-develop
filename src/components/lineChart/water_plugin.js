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
      ctx.fillStyle = '#C2F9BB'; //light green
      ctx.fillRect(x, y, w, h*0.5);
      ctx.restore();
      ctx.fillStyle = '#FFCAA2'; //orange
      ctx.fillRect(x, y+h*0.5, w, h*0.3);
      ctx.restore();
      ctx.fillStyle =  '#FAB0B0'; //red
      ctx.fillRect(x, y+h*0.8, w, h*0.2);
      ctx.restore();
    }
  };