function rowspanone(arr,arr1){
    var resultarr=[],position=0;
    arr.forEach((item, index) => {
      if (index === 0) {
        resultarr.push(1);
        position = 0;
      } else {
        var controll=[],bools=[];
          for(let i=0;i<arr1.length;i++){
            controll.push(arr[index][arr1[i]]===arr[index - 1][arr1[i]])
          }
        for(let i=0;i<controll.length;i++){
          if(controll[i]==false){
                bools.push(1)
          }
        }
            if (
              bools.length
            ) {
              resultarr.push(1);
              position = index;
            } else {
              resultarr[position] += 1;
              resultarr.push(0);
            }
      }
    });
    return resultarr
}
export default rowspanone