import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import useUpdateIsActive from "@/hooks/quotes/useUpdateIsActive";

export default function UpdateIsActive({ id, status }: { id: string; status: boolean }) {
  const { mutate, isPending } = useUpdateIsActive();

  const handleUpdate = (id: string, isActive: boolean) => {
    mutate({ id, isActive });
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Set status</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={status ? "true" : "false"}>
          <DropdownMenuRadioItem
            value={"true"}
            onClick={() => handleUpdate(id, true)}
            disabled={isPending}
          >
            Active
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value={"false"}
            onClick={() => handleUpdate(id, false)}
            disabled={isPending}
          >
            Non active
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
