import { useState } from 'react';
import Button from '../components/Button';
import { useGetSingleUser } from '../hooks/useGetSingleUser';

function EditProfileInputForm() {
  const { data, isLoading, isError } = useGetSingleUser(
    '048338d5-5cb9-4e5d-8129-aaf8d5d33395'
  );

  const user = { ...data };
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-36 p-4 h-full content-between justify-between"
    >
      <div className="flex flex-col gap-5 p-4">
        <div>
          <label
            htmlFor="Change first name"
            className="text-white dark:text-dark text-lg"
          >
            First name
          </label>
          <input
            onChange={e => setFirstName(e.target.value)}
            value={firstName}
            type="text"
            name="Change first name"
            id="Change first name"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="Change last name"
            className="text-white text-lg dark:text-dark"
          >
            Last name
          </label>
          <input
            onChange={e => setLastName(e.target.value)}
            value={lastName}
            type="text"
            name="Change last name"
            id="Change last name"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 text-white"
          />
        </div>
        <div>
          <label
            htmlFor="Change email"
            className="text-white text-lg dark:text-dark"
          >
            Email
          </label>
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            name="Change email"
            id="Change email"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 text-white"
          />
        </div>
      </div>
      <Button size="md">Save Changes</Button>
    </form>
  );
}

export default EditProfileInputForm;
