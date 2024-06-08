const randomColor = Math.random() * (360 - 0) + 'hsl';
document.body.style.background = `linear-gradient(to bottom, ${randomColor}(), hsl(${randomColor}, 70%, 70%), hsl(${randomColor}, 90%, 90%));`;
