import OverView from "./OverView"
import ProductManagement from "./product/ProductManagement"
import UserManagement from "./user/UserManagement"

const Dashboard = () => {
    return (
        <>
            <OverView />
            <ProductManagement />
            <UserManagement />
        </>
    )
}
export default Dashboard