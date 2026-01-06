import { useParams } from 'react-router-dom';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditVehicleForm from '../../components/Admin/EditVehicle/EditVehicleForm';

function EditVehicle() {
  const { id } = useParams();

  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditVehicleForm vehicleId={id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditVehicle;
