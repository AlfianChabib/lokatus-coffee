import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

export default function UpdateIsActive({ status }: { status: boolean }) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Set status</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={status ? "true" : "false"}>
          <DropdownMenuRadioItem value={"true"}>Active</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value={"false"}>Non active</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
