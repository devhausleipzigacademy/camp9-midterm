import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { useEditProfileMutation, useGetSingleUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

function EditProfileInputForm() {
  const { data, isLoading, isError } = useGetSingleUser();
  const navigate = useNavigate();

  const { mutate } = useEditProfileMutation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  const updatedData = { ...data, firstName, lastName, email };

  function handleSubmit(e: any) {
    e.preventDefault();
    mutate(updatedData);
    alert('Profile updated successfully');

    navigate('/');
  }

  return (
    <form className="flex flex-col gap-36 px-4 h-full content-between justify-between">
      <div className="flex flex-col gap-5 p-4">
        <div>
          <label
            htmlFor="Change first name"
            className="text-white dark:text-dark"
          >
            First name
          </label>
          <input
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            name="Change first name"
            id="Change first name"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 dark:text-white"
          />
        </div>
        <div>
          <label
            htmlFor="Change last name"
            className="text-white dark:text-dark"
          >
            Last name
          </label>
          <input
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            type="text"
            name="Change last name"
            id="Change last name"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="Change email" className="text-white  dark:text-dark">
            Email
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            name="Change email"
            id="Change email"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 dark:text-white"
          />
        </div>
      </div>
      <div className="p-8 mt-auto w-full">
        <Button>Save Changes</Button>
      </div>
    </form>
  );
}

export default EditProfileInputForm;
