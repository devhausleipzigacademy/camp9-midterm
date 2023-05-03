import HeaderPage from '../components/HeaderPage';
import EditProfileInputForm from './EditProfileForm';

function EditProfile() {
  return (
    <div>
      <HeaderPage children="Edit Profile" />
      <EditProfileInputForm />
    </div>
  );
}

export default EditProfile;
