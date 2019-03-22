function MyCalendar() {
    this.calArr = [];
    this.bookedArr = [];
}
// var calArr = [{
//     mLeft: 10,
//     mRight: 40,
//   },
//   {
//     mLeft: 50,
//     mRight: 60,
//   }];
//   var bookedArr = [];
// }

MyCalendar.prototype.book = function(left, right) {
  for(var i = 0 ; i < this.bookedArr.length; i++) {
    if (this.bookedArr[i].mLeft < right && left < this.bookedArr[i].mRight) {
      return false;
    } 
  }
  
  for(var j = 0; j < this.calArr.length; j++) {
    if(this.calArr[j].mLeft < right && left < this.calArr[j].mRight) {
      this.bookedArr.push({
          mLeft: Math.max(left, this.calArr[j].mLeft),
          mRight: Math.min(right, this.calArr[j].mRight)
      })
    }
  }
  
  this.calArr.push({ mLeft: left, mRight: right });
  return true;
};