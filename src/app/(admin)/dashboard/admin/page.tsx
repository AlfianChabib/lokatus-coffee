import { User2 } from "lucide-react";
import AdminList from "./_components/admin-list";
import CreateAdmin from "./_components/actions/create-admin";

export default function Adminpage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-gray-800">
        <div className="flex items-center justify-center gap-2 py-2">
          <User2 className="size-5" strokeWidth={2} />
          <h2 className="text-lg font-medium leading-none">Admin Management</h2>
        </div>
        <CreateAdmin />
      </div>
      <div className="flex min-h-96 w-full flex-col rounded-lg border border-dashed border-gray-300 p-2">
        <AdminList />
      </div>
    </div>
  );
}
