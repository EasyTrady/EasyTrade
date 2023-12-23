import { useDispatch, useSelector } from 'react-redux'

function usePermission() {
    let permissionYour = useSelector((state) => state.permissionYour.value)

    const isPermitted = (callback, permissions = []) => {
        const canAccess =
          Boolean(permissions.length) &&
          permissions.some((permission) => permissionYour.map((ele)=>ele?.codename).includes(permission));
    
        return canAccess ? callback : null;
      };
    
      return {isPermitted};
    
}
export default usePermission