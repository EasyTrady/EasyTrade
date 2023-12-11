import { useDrag,useDrop  } from 'react-dnd';
import PropTypes from "prop-types";
import SoftBox from 'components/SoftBox'


function DragerItem({children,ele,key,setDrap}) {
    const [{ isDragging }, drag] = useDrag({
        type: 'box',
        drag(item, monitor) {console.log(monitor.getDifferenceFromInitialOffset())},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      });
      const handleDrag = (item,e) => {
        setDrap(item?.id)
        // console.log('Item dragged:', e.nativeEvent.layerY);
      };
  return (
    <SoftBox refence={drag}onDrag={(e)=>handleDrag(ele,e)} key={key} sx={{ width: "100%", backgroundColor: "#fff", padding: "16px", display: "flex", justifyContent: "space-around", alignItems: "center" }}>
{children}
</SoftBox>
  )
}
export default DragerItem
DragerItem.propTypes = {
    children: PropTypes.node,
    ele: PropTypes.any,
    key:PropTypes.number,
    setDrap:PropTypes.func
};