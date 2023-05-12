import HeaderPage from '../components/HeaderPage';
import EditProfileInputForm from './EditProfileForm';

function EditProfile() {
  return (
    <div className="flex flex-col h-screen">
      <HeaderPage children="Edit Profile" />
      <EditProfileInputForm />
    </div>
  );
}

export default EditProfile;
