import _ from "lodash";

const compare = (array=[], complete = false) => {
  const newobject={}
  const array2 =array.map((ele) => ele);
console.log( array2)

 let filterarray= array.filter((ele)=> ele[0] !== ele[1])
 
// array2.map(([item1, item2,nameofobject])=>{
//  return !_.isEqual(item1, item2)?{[nameofobject]:[item1,item2]}:""
// })
console.log( array2,filterarray)
filterarray.forEach((ele)=>newobject[ele[2]]=ele[1])
console.log(newobject)
  return{nochange:array2[complete ? "every" : "some"](([item1, item2,nameofobject]) => {
    return !_.isEqual(item1, item2);
  }),array:newobject};
  
};

export default compare;