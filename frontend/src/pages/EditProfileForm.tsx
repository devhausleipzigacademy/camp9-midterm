import Button from '../components/Button';

function EditProfileInputForm() {
  return (
    <form className="flex flex-col gap-36 px-4 h-full content-between justify-between">
      <div className="flex flex-col gap-5 p-4">
        <div>
          <label
            htmlFor="Change first name"
            className="text-white dark:text-dark"
          >
            Name
          </label>
          <input
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
            type="email"
            name="Change email"
            id="Change email"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 dark:text-white"
          />
        </div>
      </div>
      <div className="p-8 mt-auto w-full">
        <Button >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default EditProfileInputForm;
