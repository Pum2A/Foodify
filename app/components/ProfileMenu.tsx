import { useUser } from "../contexts/UserContext";
const ProfileMenu = () => {
  const { user } = useUser();

  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md">
      <p className="font-bold">Hello, {user?.name || "Guest"}!</p>
      <ul className="mt-4 space-y-2">
        <li className="hover:text-blue-400 cursor-pointer">Settings</li>
        <li className="hover:text-blue-400 cursor-pointer">Logout</li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
