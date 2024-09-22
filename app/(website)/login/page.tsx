import styles from '@/components/form/styles.module.css';
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import HeroSection from "@/components/hero/hero-section";

export default async function Login({searchParams,}: {searchParams: { message: string };}) {

  const supabase = createClient();

  const {data: { user }} = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/shop");
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <div className={``}>
      <HeroSection img={`/cat-orange`} header={'Login / Sign Up'}>
        <h1 className={`${styles.hero_header}`}>Login / Sign Up</h1>
          <form className={``}>
            <label className={`${styles.options}`}>
              Email

              <input
                className={`p-xsmall`}
                name="email"
                placeholder="you@example.com"
                required
              />
            </label>
           
            <label className={`${styles.options}`} >
              Password
              <input
                  className={`p-xsmall`}
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
              />
            </label>

            <div className={`${styles.actions}`}>
              <SubmitButton
                formAction={signIn} className={``}
                pendingText="Signing In...">
                Login
              </SubmitButton>

              <SubmitButton
                formAction={signUp} className={`btn-outlined`}
                pendingText="Signing Up...">
                Sign Up
              </SubmitButton>
            </div>

            {searchParams?.message && (
              <p className={``}>
                {searchParams.message}
              </p>
            )} 
        </form>

      </HeroSection>

      
    </div>
  );
}
