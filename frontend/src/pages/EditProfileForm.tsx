import Button from '../components/Button';

function EditProfileInputForm() {
  return (
    <form className="flex flex-col gap-36 p-4 h-full content-between justify-between">
      <div className="flex flex-col gap-5 p-4">
        <div>
          <label
            htmlFor="Change first name"
            className="text-white dark:text-dark text-lg"
          >
            Name
          </label>
          <input
            type="text"
            name="Change first name"
            id="Change first name"
            placeholder="Change your name"
            className="w-full rounded-lg bg-dark-light dark:bg-slate-300 h-[48px] flex items-center justify-between p-5 gap-5 dark:text-dark-light"
          />
        </div>
        <div>
          <label
            htmlFor="Change last name"
            className="text-white text-lg dark:text-dark"
          >
            Last Name
          </label>
          <input
            type="text"
            name="Change last name"
            id="Change last name"
            placeholder="Change your last name"
            className="w-full rounded-lg bg-dark-light h-[48px] flex items-center justify-between p-5 gap-5 dark:bg-slate-300 dark:text-dark-light"
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
            type="email"
            name="Change email"
            id="Change email"
            placeholder="Change your Email"
            className="w-full rounded-lg bg-dark-light h-[48px] dark:bg-slate-300 flex items-center justify-between p-5 gap-5 dark:text-dark-light"
          />
        </div>
      </div>
      <Button size="md">Save Changes</Button>
    </form>
  );
}

export default EditProfileInputForm;
