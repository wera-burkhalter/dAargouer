// const path = document.getElementById('path');
//   const img = document.getElementById('boot');
//   const pathLength = path.getTotalLength();

//   function positionImageAtEnd() {
//     const endPoint = path.getPointAtLength(pathLength);
//   }

//   function animateToPoint(mouseEvent) {
//     const rect = path.getBoundingClientRect();
//     const clickX = mouseEvent.clientX - rect.left;
//     const clickY = mouseEvent.clientY - rect.top;

//     let closestPoint = null;
//     let minDistance = Infinity;

//     for (let i = 0; i <= pathLength; i++) {
//       const point = path.getPointAtLength(i);
//       const distance = Math.sqrt((point.x - clickX) ** 2 + (point.y - clickY) ** 2);
//       if (distance < minDistance) {
//         closestPoint = point;
//         minDistance = distance;
//       }
//     }

//     if (closestPoint) {
//       img.style.transform = `translate(${closestPoint.x - 270}px, ${closestPoint.y - 30}px)`;
//     }
//   }

//   window.onload = positionImageAtEnd;
//   document.getElementById('container').addEventListener('click', animateToPoint);


