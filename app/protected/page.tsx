import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
// import Header from "@/components/Header";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const ProtectedPage = async ({children}: {children: ReactNode}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
   <>
    { children }
   </>
  );
}

export default ProtectedPage;